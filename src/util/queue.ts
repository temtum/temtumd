import * as Bull from 'bull';
import { EventEmitter } from 'events';

import Config from '../config';
import logger from './logger';

export default class Queue extends EventEmitter {
  private queue: Bull.Queue;
  private redis;

  public constructor() {
    super();

    this.init();
    this.eventHandler();
  }

  private init(): void {
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

  private eventHandler(): void {
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

  public async emptyQueue(): Promise<void> {
    try {
      await this.queue.clean(0, 'completed');
      await this.queue.clean(0, 'active');
      await this.queue.clean(0, 'delayed');
      await this.queue.clean(0, 'failed');
      await this.queue.clean(0, 'wait');
      await this.queue.empty();
    } catch (err) {
      logger.error(err);
    }
  }

  public async add(val): Promise<void> {
    if (this.redis.status === 'ready') {
      await this.queue.add(val);
    }
  }

  public process(callback): void {
    this.queue.process(callback);
  }
}
