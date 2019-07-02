import * as fs from 'fs';
import * as lmdb from 'lmdb-lib';
import * as path from 'path';

import Helpers from '../util/helpers';

class DB {
  public DB_ENV: lmdb;
  public DBI: lmdb;
  public READ_TXN: lmdb;
  public WRITE_TXN: lmdb;
  public data: string;
  public options: object;
  public root: string;

  public constructor(data, options = {}) {
    this.DB_ENV = new lmdb.Env();
    this.root = path.dirname(
      path.dirname(path.dirname(fs.realpathSync(__filename)))
    );
    this.data = data;
    this.options = options;
    this.connect();
  }

  public connect() {
    this.openEnv();
    this.openDbi();
  }

  public openEnv() {
    const defaultOpt = {
      path: this.root + '/node/' + this.data,
      mapSize: 0x8000000000,
      maxReaders: 126
    };

    Object.assign(defaultOpt, this.options);

    Helpers.createFolder(defaultOpt.path);

    this.DB_ENV.open(defaultOpt);
  }

  public openDbi() {
    this.DBI = this.DB_ENV.openDbi({
      name: null,
      create: true
    });
  }

  public initTxn(readOnly = true) {
    return this.DB_ENV.beginTxn({ readOnly });
  }

  public batchWrite(data, options, callback) {
    this.DB_ENV.batchWrite(data, options, callback);
  }

  public initWriteTxn() {
    this.WRITE_TXN = this.initTxn(false);
  }

  public initReadTxn() {
    this.READ_TXN = this.initTxn();
  }

  public setTxnIfNotExist(type) {
    if (type === 'write' && !this.WRITE_TXN) {
      this.initWriteTxn();
    }

    if (type === 'read' && !this.READ_TXN) {
      this.initReadTxn();
    }
  }

  public initCursor(txn, keyIsBuffer = true) {
    return new lmdb.Cursor(txn, this.DBI, { keyIsBuffer });
  }

  public getCursor(keyIsBuffer = true) {
    this.setTxnIfNotExist('read');

    return new lmdb.Cursor(this.READ_TXN, this.DBI, { keyIsBuffer });
  }

  public get(txn: lmdb, key: Buffer) {
    return txn.getBinary(this.DBI, key);
  }

  public getBinary(key: Buffer) {
    this.setTxnIfNotExist('read');

    return this.READ_TXN.getBinary(this.DBI, key);
  }

  public getBinaryUnsafe(key: Buffer) {
    this.setTxnIfNotExist('read');

    return this.READ_TXN.getBinaryUnsafe(this.DBI, key);
  }

  public getString(key: string) {
    this.setTxnIfNotExist('read');

    return this.READ_TXN.getString(this.DBI, key);
  }

  public getStringUnsafe(key: string) {
    this.setTxnIfNotExist('read');

    return this.READ_TXN.getStringUnsafe(this.DBI, key);
  }

  public put(txn: lmdb, key: Buffer, value: Buffer = Buffer.from('')) {
    txn.putBinary(this.DBI, key, value);
  }

  public putBinary(key: Buffer, value: Buffer = Buffer.from('')) {
    this.setTxnIfNotExist('write');

    this.WRITE_TXN.putBinary(this.DBI, key, value);
  }

  public putString(key, value) {
    this.setTxnIfNotExist('write');

    this.WRITE_TXN.putString(this.DBI, key, value);
  }

  public getMaxkeysize() {
    return this.DB_ENV.getMaxkeysize();
  }

  public delete(key) {
    this.setTxnIfNotExist('write');

    this.WRITE_TXN.del(this.DBI, key);
  }

  public del(txn, key) {
    txn.del(this.DBI, key);
  }

  public commit() {
    if (this.WRITE_TXN) {
      this.WRITE_TXN.commit();
      this.WRITE_TXN = null;

      if (this.READ_TXN) {
        this.abort();
        this.READ_TXN = null;
      }
    }
  }

  public sync() {
    return new Promise((resolve, reject) => {
      this.DB_ENV.sync((error) => {
        if (error) {
          return reject(error);
        }

        return resolve(true);
      });
    });
  }

  public abort() {
    if (this.READ_TXN) {
      this.READ_TXN.abort();
      this.READ_TXN = null;
    }
  }

  public drop() {
    this.setTxnIfNotExist('write');

    this.DBI.drop({
      txn: this.WRITE_TXN,
      justFreePages: true
    });
  }

  public close() {
    this.DBI.close();
    this.DB_ENV.close();
  }
}

export default DB;
