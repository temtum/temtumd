import * as dotenv from 'dotenv';

dotenv.load();

import { EventEmitter } from 'events';

import Blockchain from './blockchain';
import Config from './config';
import HttpServer from './httpServer';
import Node from './node';
import Wallet from './wallet';
import Queue from './util/queue';
import restoreDb from './restore_db';

restoreDb().then(async () => {
  const httpPort = parseInt(process.env.HTTP_PORT) || Config.HTTP_PORT;

  const queue = new Queue();
  await queue.emptyQueue();
  const emitter = new EventEmitter();
  const blockchain = new Blockchain(emitter, queue);
  const wallet = new Wallet(blockchain);
  const node = new Node(emitter, blockchain, queue);
  const server = new HttpServer(blockchain, wallet, node);

  server.listen(httpPort);
  node.run();
});
