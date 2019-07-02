import * as crypto from 'crypto';

import { BlockHeader } from '../interfaces';
import Helpers from '../util/helpers';
import Transaction from './transaction';

/**
 * @class
 */
class Block {
  public static fromJS(json): Block {
    const {
      index,
      previousHash,
      data,
      beaconIndex,
      beaconValue,
      timestamp,
      hash
    } = json;

    return new Block(
      index,
      previousHash,
      data,
      beaconIndex,
      beaconValue,
      timestamp,
      hash
    );
  }

  public static createBlockHeader(block): BlockHeader {
    const blockHeader: BlockHeader = {};

    for (const key in block) {
      if (block.hasOwnProperty(key)) {
        if (key === 'data') {
          blockHeader.txCount = block[key].length;
          continue;
        }

        blockHeader[key] = block[key];
      }
    }

    return blockHeader;
  }

  public index: number;
  public hash: string;
  public previousHash: string;
  public timestamp: number;
  public data: Transaction[] | Buffer;
  public beaconIndex: number;
  public beaconValue: string;

  public constructor(
    index,
    previousHash: string,
    data: Transaction[],
    beaconIndex: number,
    beaconValue: string,
    timestamp?: number,
    hash?: string
  ) {
    this.index = index;
    this.previousHash = previousHash;
    this.data = data;
    this.beaconIndex = beaconIndex;
    this.beaconValue = beaconValue;
    this.timestamp = timestamp ? timestamp : Helpers.getCurrentTimestamp();
    this.hash = hash ? hash : this.calculateHash();
  }

  public calculateHash(): string {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
          this.beaconIndex +
          this.beaconValue
      )
      .digest('hex');
  }
}

export default Block;
