import * as Bull from 'bull';
import { EventEmitter } from 'events';

import logger from './logger';
import Config from '../config';

export default class Queue extends EventEmitter {
  private queue;
  private redis;

  public constructor() {
    super();

    this.init();
    this.eventHandler();
  }

  public init(): void {
    this.queue = new Bull(Config.REDIS_BLOCK_QUEUE, {
      redis: {
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        retryStrategy: () => 10000
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true
      }
    });

    this.redis = this.queue.clients[0];
  }

  public eventHandler(): void {
    this.redis.on(
      'ready',
      async (): Promise<void> => {
        this.emit('queue_ready');
      }
    );

    this.queue.on(
      'error',
      async (err): Promise<void> => {
        logger.error(err);

        if (!this.redis.commandQueue.isEmpty()) {
          this.redis.commandQueue.clear();
        }
      }
    );

    this.queue.on('drained', (): void => {
      this.emit('queue_drained');
    });
  }

  public async isReady(): Promise<boolean> {
    return await this.queue.isReady();
  }

  public add(val): void {
    if (this.redis.status === 'ready') {
      this.queue.add(val);
    }
  }

  public process(callback): void {
    this.queue.process(callback);
  }
}
