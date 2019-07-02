import * as redis from 'redis';

import Config from './config';

class Redis {
  private client: redis.createClient;
  private commands;

  public constructor() {
    this.commands = [];
    this.client = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    });
  }

  public pushCommand(command) {
    this.commands.push(command);
  }

  public pushTransactionCommand(tx) {
    this.pushCommand(['lpush', Config.REDIS_TX_CACHE, JSON.stringify(tx)]);
  }

  public pushTransactionTrimCommand() {
    this.pushCommand(['ltrim', Config.REDIS_TX_CACHE, '0', Config.TX_PER_PAGE]);
  }

  public pushBlockCommand(block) {
    this.pushCommand(['lpush', Config.REDIS_BLOCK_CACHE, block]);
  }

  public pushBlockTrimCommand() {
    this.pushCommand([
      'ltrim',
      Config.REDIS_BLOCK_CACHE,
      '0',
      Config.BLOCKS_PER_PAGE
    ]);
  }

  public executeCommands() {
    return new Promise((resolve) => {
      this.client.multi(this.commands).exec(() => {
        this.commands = [];

        resolve();
      });
    });
  }

  public getTransactionCache() {
    return new Promise((resolve, reject) => {
      this.client.lrange(Config.REDIS_TX_CACHE, 0, -1, (err, res) => {
        if (err) {
          reject(err);
        }

        res = res.map((tx) => {
          return JSON.parse(tx);
        });

        resolve(res);
      });
    });
  }

  public getBlockCache() {
    return new Promise((resolve, reject) => {
      this.client.lrange(Config.REDIS_BLOCK_CACHE, 0, -1, (err, res) => {
        if (err) {
          reject(err);
        }

        res = res.map((block) => {
          return JSON.parse(block);
        });

        resolve(res);
      });
    });
  }
}

export default Redis;
