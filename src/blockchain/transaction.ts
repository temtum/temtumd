import * as crypto from 'crypto';

import Config from '../config';
import Helpers from '../util/helpers';
import transactionSchema from './schemas/transaction';
import TxIn from './txIn';
import TxOut from './txOut';

/**
 * @class
 */
class Transaction {
  public static fromJS(json): Transaction {
    const inputs: TxIn[] = json.txIns.map((input) => TxIn.fromJS(input));
    const outputs: TxOut[] = json.txOuts.map((output) => TxOut.fromJS(output));

    return new Transaction(json.type, inputs, outputs, json.timestamp, json.id);
  }

  public id?: string;
  public timestamp: number;
  public readonly type: 'regular' | 'coinbase';
  public readonly txIns: TxIn[];
  public readonly txOuts: TxOut[];

  public constructor(
    type: 'regular' | 'coinbase',
    txIns: TxIn[],
    txOuts: TxOut[],
    timestamp?: number,
    id?: string
  ) {
    this.type = type;
    this.txIns = txIns;
    this.txOuts = txOuts;
    this.timestamp = timestamp ? timestamp : Helpers.getCurrentTimestamp();
    this.id = id ? id : this.hash;
  }

  public get hash(): string {
    const inputs = JSON.stringify(this.txIns, (key, value): any => {
      if (key === 'signature') {
        return undefined;
      }

      return value;
    });
    const outputs = JSON.stringify(this.txOuts);

    return crypto
      .createHash('sha256')
      .update(this.type + this.timestamp + inputs + outputs)
      .digest('hex');
  }

  public get inputTotal(): number {
    return this.txIns.reduce((total, input) => total + input.amount, 0);
  }

  public get outputTotal(): number {
    return this.txOuts.reduce((total, output) => total + output.amount, 0);
  }

  public isValidCoinbase() {
    if (
      this.txIns.length === 1 &&
      this.txOuts.length === 1 &&
      this.txOuts[0].address === '' &&
      this.txOuts[0].amount === Config.MINING_REWARD
    ) {
      return true;
    }

    const message = `Invalid coinbase transaction.`;

    throw new Error(message);
  }

  public isValidTransaction(currentBlock): boolean {
    try {
      this.isValidSchema();
      this.isValidHash();

      if (this.type === 'coinbase') {
        if (currentBlock) {
          this.isValidCoinbase();
        }

        return true;
      }

      this.isInputsMoreThanOutputs();
      this.verifyInputSignatures();

      return true;
    } catch (err) {
      throw err;
    }
  }

  public isValidSchema() {
    if (!transactionSchema.validate(this)) {
      const message = `Invalid Transaction structure.`;

      throw new Error(message);
    }
  }

  public isValidHash() {
    if (this.id !== this.hash) {
      const message = `Invalid transaction id.`;

      throw new Error(message);
    }
  }

  public isInputsMoreThanOutputs() {
    const inputTotal = this.inputTotal;
    const outputTotal = this.outputTotal;

    if (inputTotal < outputTotal) {
      const message = `Insufficient balance: inputs ${inputTotal} < outputs ${outputTotal}`;

      throw new Error(message);
    }
  }

  public verifyInputSignatures() {
    try {
      this.txIns.forEach((input) => {
        return input.verifySignature(this.id);
      });
    } catch (error) {
      throw error;
    }
  }
}

export default Transaction;
