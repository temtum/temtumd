import * as crypto from 'crypto';
import * as secp256k1 from 'secp256k1';

import logger from '../util/logger';

/**
 * @class
 */
class TxIn {
  public static fromJS(json): TxIn {
    const { txOutIndex, txOutId, amount, address, signature } = json;

    return new TxIn(txOutIndex, txOutId, amount, address, signature);
  }

  public readonly txOutIndex: number;
  public readonly txOutId?: string;
  public readonly amount?: number;
  public readonly address?: string;
  public signature?: string;

  public constructor(
    txOutIndex: number,
    txOutId?: string,
    amount?: number,
    address?: string,
    signature?: string
  ) {
    this.txOutIndex = txOutIndex;

    if (txOutId) {
      this.txOutId = txOutId;
    }

    if (amount) {
      this.amount = amount;
    }

    if (address) {
      this.address = address;
    }

    if (signature) {
      this.signature = signature;
    }
  }

  public getKey(id) {
    const params = [
      id,
      this.txOutIndex,
      this.txOutId,
      this.amount,
      this.address
    ];

    return crypto
      .createHash('sha256')
      .update(params.join(''))
      .digest('hex');
  }

  public verifySignature(id) {
    const key = this.getKey(id);
    const verified = secp256k1.verify(
      Buffer.from(key, 'hex'),
      Buffer.from(this.signature, 'hex'),
      Buffer.from(this.address, 'hex')
    );

    if (!verified) {
      const message = `Input ${JSON.stringify(this)} has wrong signature.`;

      logger.error(message);

      throw new Error(message);
    }
  }

  public sign(id, privateKey) {
    const key = this.getKey(id);
    const message: any = secp256k1.sign(
      Buffer.from(key, 'hex'),
      Buffer.from(privateKey, 'hex')
    );
    const signature: Buffer = message.signature;

    this.signature = signature.toString('hex');
  }

  public equals(input: TxIn): boolean {
    return (
      this.txOutIndex === input.txOutIndex &&
      this.txOutId === input.txOutId &&
      this.amount === input.amount &&
      this.address === input.address
    );
  }
}

export default TxIn;
