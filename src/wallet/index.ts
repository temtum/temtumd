import * as crypto from 'crypto';
import * as secp256k1 from 'secp256k1';

import Transaction from '../blockchain/transaction';
import TxIn from '../blockchain/txIn';
import TxOut from '../blockchain/txOut';
import Helpers from '../util/helpers';
import logger from '../util/logger';

class Wallet {
  public static generateAddress() {
    const privateKey: Buffer = crypto.randomBytes(32);
    const address: Buffer = secp256k1.publicKeyCreate(privateKey);

    return {
      privateKey: privateKey.toString('hex'),
      address: address.toString('hex')
    };
  }

  public static async signInputs(id, inputs: TxIn[], privateKey: string) {
    try {
      for (let i = 0, length = inputs.length; i < length; i++) {
        const input: TxIn = inputs[i];

        input.sign(id, privateKey);
        await Helpers.setImmediatePromise();
      }

      return inputs;
    } catch (error) {
      const message = `Error signing inputs ${inputs}: ${error}`;

      logger.error(message);

      throw new Error(message);
    }
  }

  public blockchain;

  public constructor(blockchain) {
    this.blockchain = blockchain;
  }

  public async createTransaction(
    address: string,
    receiverAddress: string,
    amount: number,
    privateKey: string
  ) {
    // Check private/public address conformity
    /*const createdAddress = secp256k1.publicKeyCreate(Buffer.from(privateKey, 'hex'));

    if (createdAddress.toString('hex') !== address) {
      const message = `Wrong pair address: ${address} key: ${privateKey}`;

      logger.error(message);

      throw new Error(message);
    }*/
    const inputs = this.blockchain.getUnspentTransactionsForAddress(address);
    const totalAmountOfUtxo = Helpers.sumArrayObjects(inputs, 'amount');
    const changeAmount = totalAmountOfUtxo - amount;
    const outputs = [];

    // Add target receiver
    outputs.push(new TxOut(receiverAddress, amount));

    if (changeAmount < 0) {
      throw new Error(
        'The sender does not have enough to pay for the transaction.'
      );
    }

    // Add change amount
    if (changeAmount > 0) {
      outputs.push(new TxOut(address, changeAmount));
    }

    try {
      const tx = new Transaction('regular', inputs, outputs);

      await Wallet.signInputs(tx.id, inputs, privateKey);

      return tx;
    } catch (error) {
      throw error;
    }
  }
}

export default Wallet;
