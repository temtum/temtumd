import { exec } from 'child_process';
import * as _ from 'lodash';
import axios from 'axios';
import * as fs from 'fs';

import runCommand from './commands/run_cert_commads';

const DB_ARCHIVE_NAME = 'db-downloaded.tar';

const restoreDb = () => {
  return new Promise((resolve) => {
    if (fs.existsSync(process.env.RESTORE_DB_FILE)) {
      const shouldRestoreDb: string = fs.readFileSync(
        process.env.RESTORE_DB_FILE,
        'utf8'
      );

      if (shouldRestoreDb === 'true') {
        return axios
          .get(`${process.env.SYNC_ADDRESS}/db-backup`, {
            responseType: 'stream'
          })
          .then(async (response) => {
            const file = fs.createWriteStream(DB_ARCHIVE_NAME);
            response.data.pipe(file);

            file.on('finish', async () => {
              file.close();

              await runCommand('rm -rf node');
              await runCommand(`tar -xvf ${DB_ARCHIVE_NAME}`);
              fs.writeFileSync(process.env.RESTORE_DB_FILE, 'false');

              resolve();
            });
          });
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
};

export default restoreDb;
