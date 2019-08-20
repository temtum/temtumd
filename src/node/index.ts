import axios from 'axios';
import * as STAN from 'node-nats-streaming';

import Config from '../config';
import Helpers from '../util/helpers';
import logger from '../util/logger';

class Node {
  public readonly blockchain;
  public readonly queue;
  public readonly emitter;

  public natsBlock;
  public ready: 0 | 1 = 0;
  public blockSubscription: any;
  public firstNatsBlockConnection = false;

  public constructor(emitter, blockchain, queue) {
    this.emitter = emitter;
    this.blockchain = blockchain;
    this.queue = queue;
  }

  public initEventHandlers() {
    this.queue.on(
      'queue_drained',
      async (): Promise<void> => {
        if (!this.ready) {
          await this.sync();
        }
      }
    );

    this.queue.on(
      'queue_ready',
      async (): Promise<void> => {
        await this.sync();
      }
    );

    this.emitter.on('node_ready', (): void => {
      this.updateNodeState();
    });
  }

  public setReadyStatus(status: 0 | 1): void {
    if (this.ready === status) {
      return;
    }

    this.ready = status;
    this.emitter.emit('node_ready', this.ready);
  }

  public connectToBlockServer(servers): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const autoReconnectInterval = 20000;
      const clientID = process.env.HOST.replace(/\./g, '-');

      if (this.natsBlock) {
        this.natsBlock.removeAllListeners();
      }

      this.natsBlock = STAN.connect(Config.NATS_CLUSTER_ID, clientID, {
        servers,
        user: process.env.NATS_USER,
        pass: process.env.NATS_PASS,
        reconnect: true,
        maxReconnectAttempts: -1,
        waitOnFirstConnect: true,
        reconnectTimeWait: 1000,
        stanPingInterval: 10000
      });

      this.natsBlock.on('connect', (client) => {
        logger.info(`Connected to STAN. Client id: ${client.clientID}`);

        if (!this.firstNatsBlockConnection) {
          this.firstNatsBlockConnection = true;
        } else {
          this.setReadyStatus(1);
        }

        resolve(true);
      });

      this.natsBlock.on('reconnecting', () => {
        logger.info('Attempting to reconnect to STAN.');
      });

      this.natsBlock.on('error', (error) => {
        logger.error(error);
      });

      this.natsBlock.on(
        'close',
        async (): Promise<void> => {
          logger.info('Connection to STAN is closed.');

          this.blockSubscription = null;
          this.setReadyStatus(0);

          setTimeout(async (): Promise<void> => {
            await this.connectToBlockServer(servers);
          }, autoReconnectInterval);

          reject(false);
        }
      );
    });
  }

  public async connectToMessageService(servers) {
    servers = servers.split(',').map((item) => {
      return item.trim();
    });
    try {
      await this.connectToBlockServer(servers);
    } catch (error) {}
  }

  public updateNodeState() {
    if (this.isNodeReady()) {
      this.initBlockSubscription();
    } else if (this.blockSubscription) {
      this.blockSubscription.unsubscribe();
      this.blockSubscription = null;
    }
  }

  public initBlockSubscription() {
    if (this.blockSubscription) {
      return;
    }

    this.blockSubscription = this.natsBlock.subscribe('BLOCK_ADDED');

    this.blockSubscription.on('message', async (data) => {
      const msg = Helpers.JSONToObject(data.getData());

      try {
        await this.handleReceivedChain(msg.data);
      } catch (error) {
        logger.error(error);
      }
    });
  }

  public async init() {
    await this.connectToMessageService(process.env.NATS_SERVERS);
  }

  public async sync() {
    try {
      const lastBlockResponse = await axios.get(
        `${process.env.SYNC_ADDRESS}/block/last`
      );
      const lastPeerBlock = lastBlockResponse.data;

      if (lastPeerBlock) {
        let currentBlock = await this.blockchain.getLastBlock();

        if (!currentBlock || lastPeerBlock.index > currentBlock.index) {
          await this.requestBlocks(currentBlock ? currentBlock.index : -1);

          return;
        }

        if (
          lastPeerBlock.index === currentBlock.index &&
          lastPeerBlock.hash !== currentBlock.hash
        ) {
          await this.blockchain.deleteBlockByIndex(currentBlock.index);

          const newCurrentBlock = await this.blockchain.getLastBlock();

          await this.requestBlocks(newCurrentBlock.index);

          return;
        }

        if (lastPeerBlock.index < currentBlock.index) {
          const blockToCheck = await this.blockchain.getBlockByIndex(
            lastPeerBlock.index
          );

          if (!blockToCheck || lastPeerBlock.hash !== blockToCheck.hash) {
            while (currentBlock.index >= lastPeerBlock.index) {
              await this.blockchain.deleteBlockByIndex(currentBlock.index);
              currentBlock = await this.blockchain.getLastBlock();
            }

            await this.requestBlocks(currentBlock.index);

            return;
          }
        }

        this.setReadyStatus(1);
      }

      return;
    } catch (err) {
      logger.error(err);
      await Helpers.wait(3000);
      await this.sync();
    }
  }

  public async requestBlocks(start) {
    const syncResponse = await axios.post(`${process.env.SYNC_ADDRESS}/sync`, {
      start
    });

    await this.handleBlocks(syncResponse.data.blocks);
  }

  public run() {
    this.init().then(async () => {
      this.initEventHandlers();
      await this.initConnection();
    });
  }

  public async initConnection() {
    await this.sync();
  }

  public isNodeReady() {
    return this.ready;
  }

  public async handleBlocks(receivedBlocks) {
    if (!receivedBlocks.length) {
      return true;
    }

    const currentBlock = await this.blockchain.getLastBlock();
    const startChainBlock = receivedBlocks[receivedBlocks.length - 1];

    if (!currentBlock) {
      await this.blockchain.updateChain(receivedBlocks);

      return true;
    }

    if (startChainBlock.index <= currentBlock.index) {
      logger.info(
        'Received chain is not longer than current chain. Do nothing'
      );

      return true;
    }

    if (currentBlock.index + 1 === startChainBlock.index) {
      if (currentBlock.hash === startChainBlock.previousHash) {
        logger.info(
          `Blockchain possibly behind. We got: ${currentBlock.index}, Peer got: ${startChainBlock.index}`
        );

        await this.blockchain.updateChain(receivedBlocks);

        return true;
      }

      await this.blockchain.deleteBlockByIndex(currentBlock.index);
    }

    return false;
  }

  public async handleReceivedChain(receivedBlocks) {
    try {
      const status = await this.handleBlocks(receivedBlocks);

      if (status) {
        return;
      }

      this.setReadyStatus(0);
      await this.sync();
    } catch (error) {
      throw error;
    }
  }
}

export default Node;
