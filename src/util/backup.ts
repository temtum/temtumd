import * as Rsync from 'rsync';
import * as path from 'path';

import Config from '../config/main';
import Helpers from './helpers';
import logger from './logger';

class Backup {
  public static backup(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const rootDir = process.cwd();

      Rsync.build({
        flags: 'avu',
        source: [
          path.join(rootDir, 'node/blockchain'),
          path.join(rootDir, 'node/utxo')
        ],
        destination: path.join(rootDir, 'backup')
      }).execute((err) => {
        if (err) {
          return reject(err);
        }

        logger.info('Databases backup has finished successfully.');
        return resolve(true);
      });
    });
  }

  public static async restore(): Promise<boolean> {
    const syncStatus = await Helpers.readFile(Config.RESTORE_DB_FILE);

    if (syncStatus === '1') {
      return new Promise(async (resolve, reject) => {
        const rootDir = process.cwd();

        Rsync.build({
          flags: 'av',
          source: path.join(rootDir, 'backup/*'),
          destination: path.join(rootDir, 'node')
        }).execute(
          async (err): Promise<void> => {
            if (err) {
              return reject(err);
            }

            try {
              await Helpers.saveFile(Config.RESTORE_DB_FILE, 0);
              logger.info(
                'Databases backup restore has finished successfully.'
              );
            } catch (e) {
              return reject(e);
            }

            return resolve(true);
          }
        );
      });
    }

    return true;
  }
}

export default Backup;
