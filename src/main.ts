import * as dotenv from 'dotenv';
import * as Queue from 'bull';
import { EventEmitter } from 'events';

import Blockchain from './blockchain';
import Config from './config';
import HttpServer from './httpServer';
import Node from './node';
import Wallet from './wallet';

dotenv.load();

const httpPort = parseInt(process.env.HTTP_PORT) || Config.HTTP_PORT;
const queue = new Queue(Config.REDIS_BLOCK_QUEUE, {
  redis: {
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST
  },
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true
  }
});
const emitter = new EventEmitter();
const blockchain = new Blockchain(emitter, queue);
const wallet = new Wallet(blockchain);
const node = new Node(emitter, blockchain, queue);
const server = new HttpServer(blockchain, wallet, node);

server.listen(httpPort);
node.run();
