import * as crypto from 'crypto';

import Config from '../config/main';
import Helpers from '../util/helpers';
import transactionSchema from './schemas/transaction';
import TxIn from './txIn';
import TxOut from './txOut';
import CustomErrors from '../errors/customErrors';
import Blockchain from './index';
import logger from '../util/logger';

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

  public isValidTransaction(
    blockchain: Blockchain,
    allowCoinbase = false
  ): boolean {
    this.isValidSchema();
    this.isValidHash();

    if (this.type === 'coinbase') {
      if (!allowCoinbase) {
        throw new CustomErrors.BadRequest('Invalid transaction type.');
      }

      const hasGenesis = blockchain.checkGenesis();

      if (hasGenesis) {
        this.isValidCoinbase();
      }

      return true;
    }

    this.hasValidTxInputs(blockchain);
    this.hasValidTxOutputs();
    this.isInputsMoreThanOutputs();

    return true;
  }

  public hasValidTxInputs(blockchain: Blockchain): void {
    const len = this.txIns.length;

    if (!len) {
      throw new CustomErrors.BadRequest('Wrong inputs.');
    }

    for (let i = 0; i < len; i++) {
      const input = this.txIns[i];

      if (!blockchain.hasUtxoExist(input)) {
        throw new CustomErrors.BadRequest('Input does not exist.');
      }

      if (!Number.isInteger(input.amount) || input.amount < 1) {
        throw new CustomErrors.BadRequest('Wrong input amount.');
      }

      try {
        input.verifySignature(this.id);
      } catch (err) {
        logger.error(err);

        throw new CustomErrors.BadRequest('Input has wrong signature.');
      }
    }
  }

  public hasValidTxOutputs(): void {
    const len = this.txOuts.length;

    if (!len) {
      throw new CustomErrors.BadRequest('Wrong outputs.');
    }

    if (len > Config.TX_OUTPUT_LIMIT) {
      throw new CustomErrors.BadRequest('Outputs limit exceeded.');
    }

    const senderAddress = this.txIns[0].address;
    let equalCnt = 0;

    for (let i = 0; i < len; i++) {
      const output = this.txOuts[i];

      if (!/^([0-9A-Fa-f]{66})+$/.test(output.address)) {
        throw new CustomErrors.BadRequest('Wrong address string.');
      }

      if (!Number.isInteger(output.amount) || output.amount < 0) {
        throw new CustomErrors.BadRequest('Wrong output amount.');
      }

      if (output.address === senderAddress) {
        equalCnt++;
      }
    }

    if (equalCnt > 1 || (len === 1 && equalCnt)) {
      throw new CustomErrors.BadRequest(
        'The sender address cannot match the recipient address.'
      );
    }
  }

  public isValidTimestamp(): void {
    const timestamp = this.timestamp * 1000;

    if (
      !(
        timestamp > Date.now() - Config.TX_MAX_VALIDITY_TIME &&
        timestamp <= Date.now()
      )
    ) {
      throw new CustomErrors.BadRequest('Invalid timestamp.');
    }
  }

  public isValidSchema() {
    if (transactionSchema.validate(this).error) {
      const message = `Invalid Transaction structure.`;

      throw new CustomErrors.BadRequest(message);
    }
  }

  public isValidHash() {
    if (this.id !== this.hash) {
      const message = `Invalid transaction id.`;

      throw new CustomErrors.BadRequest(message);
    }
  }

  public isInputsMoreThanOutputs() {
    const inputTotal = this.inputTotal;
    const outputTotal = this.outputTotal;

    if (inputTotal !== outputTotal) {
      throw new CustomErrors.BadRequest(
        'Does not match the sum of the inputs and outputs.'
      );
    }
  }
}

export default Transaction;
