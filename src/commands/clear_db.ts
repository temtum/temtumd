import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as redis from 'redis';
import * as rimraf from 'rimraf';

import Config from '../config';

dotenv.load();

const args = process.argv.slice(2);
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

args.forEach((key) => {
  const path = `node/${key}`;

  if (fs.existsSync(`${path}/data.mdb`)) {
    rimraf(`${path}/data.mdb`, () => true);
    rimraf(`${path}/lock.mdb`, () => console.log(`${key} removed!`));
  }
});

function clearRedis() {
  let cursor = '0';
  const commands = [];

  function executeCommands() {
    commands.push(['del', Config.REDIS_BLOCK_CACHE]);
    commands.push(['del', Config.REDIS_TX_CACHE]);

    redisClient.multi(commands).exec(async () => {
      console.log('redis cache cleared!');

      await redisClient.quit();
    });
  }

  function scan() {
    redisClient.scan(
      cursor,
      'MATCH',
      'bull:*',
      'COUNT',
      '1000',
      (err, reply) => {
        if (err) {
          throw err;
        }

        cursor = reply[0];

        const keys = reply[1];

        keys.forEach((val) => {
          commands.push(['del', val]);
        });

        if (cursor === '0') {
          return executeCommands();
        }

        return scan();
      }
    );
  }

  scan();
}

try {
  clearRedis();
} catch (err) {
  console.error(err);
}
