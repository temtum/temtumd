import * as querystring from 'querystring';
import * as WebSocket from 'ws';

import Blockchain from '../blockchain';
import { BlockHeader } from '../interfaces';

class NodeStatus {
  private static verifyClient(info, cb) {
    const params = querystring.parse(info.req.url.replace(/^.*\?/, ''));

    if (!params.token) {
      return cb(false, 401, 'Unauthorized');
    }

    if (params.token === process.env.ADMIN_CLIENT_WEBSOCKET_SECRET) {
      cb(true);
    } else {
      cb(false, 401, 'Unauthorized');
    }
  }

  private blockchain: Blockchain;
  private connections = {};

  private readonly emitter;

  public constructor(emitter, blockchain: Blockchain) {
    this.emitter = emitter;
    this.blockchain = blockchain;

    this.initSocketConnection();
    this.initEmitterHandler();
  }

  private initEmitterHandler() {
    this.emitter.on('new_last_index', (index) => {
      this.sendMessage({
        type: 'lastBlock',
        lastBlock: index
      });
    });

    this.emitter.on('set_peer_status', (data) => {
      this.sendMessage({
        type: 'peerStatus',
        peer: data.peer,
        status: data.status
      });
    });
  }

  private initSocketConnection() {
    const wss = new WebSocket.Server({
      port: Number.parseInt(process.env.ADMIN_CLIENT_WEBSOCKET_PORT),
      verifyClient: NodeStatus.verifyClient
    });

    wss.on('connection', async (ws) => {
      const connectionTime = Date.now();
      const lastBlock: BlockHeader = await this.blockchain.getLastBlock();
      this.connections[connectionTime] = ws;

      this.sendMessage({
        type: 'lastBlock',
        lastBlock: lastBlock.index
      });

      ws.on('close', () => {
        delete this.connections[connectionTime];
      });
    });
  }

  private sendMessage(message: any) {
    for (const connectionTime in this.connections) {
      if (this.connections.hasOwnProperty(connectionTime)) {
        this.connections[connectionTime].send(JSON.stringify(message));
      }
    }
  }
}

export default NodeStatus;
