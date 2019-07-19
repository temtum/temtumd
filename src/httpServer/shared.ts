import axios from 'axios';

import Blockchain from '../blockchain';
import Transaction from '../blockchain/transaction';
import Wallet from '../wallet/index';
import Helpers from '../util/helpers';

export default class Shared {
  public static sendTransaction(txHex) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.TRANSACTIONS_POOL}/transaction/send`, {
          txHex
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public static addressCreate() {
    return Wallet.generateAddress();
  }

  private blockchain: Blockchain;
  private wallet: Wallet;

  public constructor(blockchain, wallet) {
    this.blockchain = blockchain;
    this.wallet = wallet;
  }

  public async search(query): Promise<object> {
    if (Number(query)) {
      const block = await this.blockchain.getBlockByIndex(query);

      return { block };
    }

    try {
      const block = this.blockchain.getBlockByHash(Buffer.from(query, 'hex'));

      if (block) {
        return { block };
      }
    } catch (err) {
      const tx = this.blockchain.getTransactionById(query);

      if (tx) {
        return { transaction: tx };
      }
    }

    return { message: 'Not Found' };
  }

  public async transactionSend(txHex) {
    const txString = Buffer.from(txHex, 'hex').toString();
    const txObject = Helpers.JSONToObject(txString);
    const transaction = Transaction.fromJS(txObject);

    transaction.isValidTimestamp();
    transaction.isValidTransaction(this.blockchain);

    return await Shared.sendTransaction(txHex);
  }

  public async transactionCreate(from, to, amount, privateKey) {
    const transaction = await this.wallet.createTransaction(
      from,
      to,
      amount,
      privateKey
    );
    const txHex = Buffer.from(JSON.stringify(transaction)).toString('hex');

    return await Shared.sendTransaction(txHex);
  }

  public async getTransactionById(id: string) {
    return await this.blockchain.getTransactionById(id);
  }

  public async viewBlockByHash(hash: string) {
    return await this.blockchain.viewBlockByHash(hash);
  }

  public async getBlockByIndex(index: number) {
    return await this.blockchain.getBlockByIndex(index, true);
  }

  public async getLastBlock() {
    return await this.blockchain.getLastBlock();
  }

  public getBalanceForAddress(address: string) {
    return this.blockchain.getBalanceForAddress(address);
  }

  public getUnspentTransactionsForAddress(address: string) {
    return this.blockchain.getUnspentTransactionsForAddress(address);
  }

  public async getStatistic() {
    return await this.blockchain.getStatistic();
  }
}
