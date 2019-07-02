import * as EventEmitter from 'events';

import Mempool from '../../mempool';
import {
  blockDefault,
  blockDefaultShort,
  blockInvalid,
  blockToAdd,
  genesis,
  genesisShort,
  transactionDefault,
  transactionInvalid
} from '../__mocks__/index.data';

import DB from '../../platform/db';
import Block from '../block';
import Blockchain from '../index';

const db = new DB('test');
const emitter = new EventEmitter();
const mempool = new Mempool(emitter);
const blockchain = new Blockchain(emitter, mempool);

beforeAll(async () => {
  await blockchain.init();
});

describe('Blockchain instance', () => {
  it('should return blockchain instance', async (done) => {
    expect(blockchain).toBeInstanceOf(Blockchain);

    done();
  });
});

describe('Get block list from blockchain', () => {
  // getBlockList when offset is 0 and only genesis exists
  it('should return only genesis block in the list on 1 page', async (done) => {
    const blockList = await blockchain.getBlockList();

    expect(blockList).toBeInstanceOf(Object);
    expect(blockList).toEqual({
      blocks: [genesisShort],
      pages: 1
    });

    done();
  });

  // getBlockList when offset is not 0 and only genesis exists
  it('should return empty list(only 1 page exists)', async (done) => {
    const blockList = await blockchain.getBlockList(2);

    expect(blockList).toBeInstanceOf(Object);
    expect(blockList).toEqual({
      blocks: [],
      pages: 1
    });

    done();
  });

  // getBlockList when offset is 0 and genesis and one block exist
  it('should return 2 blocks and page 1', async (done) => {
    Blockchain.isValidBlock(Block.fromJS(blockDefault), Block.fromJS(genesis));
    await blockchain.addBlockToChain(Block.fromJS(blockDefault));

    const blockList = await blockchain.getBlockList();

    expect(blockList).toBeInstanceOf(Object);
    expect(blockList).toEqual({
      blocks: [blockDefaultShort, genesisShort],
      pages: 1
    });

    done();
  });
});

describe('Get block and check it', () => {
  // checkBlock invalid
  it('should return exception invalid block', (done) => {
    expect(() => {
      Blockchain.isValidBlock(
        Block.fromJS(blockInvalid),
        Block.fromJS(blockDefault)
      );
    }).toThrow();

    done();
  });

  // getBlockByIndex
  it('should return block by index', async (done) => {
    const block = await blockchain.getBlockByIndex(1, true);

    expect(block).toBeInstanceOf(Object);
    expect(block).toEqual(blockDefault);

    done();
  });

  // getBlockByHash when hash is string
  it('should return block by hash with string argument', async (done) => {
    const block = await blockchain.getBlockByHash(
      Buffer.from(blockDefault.hash, 'hex'),
      true
    );

    expect(block).toBeInstanceOf(Object);
    expect(block).toEqual(blockDefault);

    done();
  });

  // getBlockByHash when hash is Buffer
  it('should return block by hash with Buffer argument', async (done) => {
    const block = await blockchain.getBlockByHash(
      Buffer.from(blockDefault.hash, 'hex'),
      true
    );

    expect(block).toBeInstanceOf(Object);
    expect(block).toEqual(blockDefault);

    done();
  });

  // getBlockHashByIndex
  it('should return block hash by block index', (done) => {
    const blockHash = blockchain.getBlockHashByIndex(1);

    expect(blockHash).toBeInstanceOf(Buffer);
    expect(blockHash).toEqual(Buffer.from(blockDefault.hash, 'hex'));

    done();
  });

  // getLastBlock
  it('should return last block', async (done) => {
    const block = await blockchain.getLastBlock();

    expect(block).toBeInstanceOf(Object);
    expect(block.index).toEqual(1);

    done();
  });
});

describe('Transactions and blocks addition to the blockchain', () => {
  // isTransactionInBlockchain
  it('should return true if transaction in blockchain', (done) => {
    expect(
      blockchain.isTransactionInBlockchain(transactionDefault.id)
    ).toBeTruthy();

    done();
  });

  // isTransactionInBlockchain
  it('should return false if transaction in blockchain', (done) => {
    expect(
      blockchain.isTransactionInBlockchain(transactionInvalid.id)
    ).toBeFalsy();

    done();
  });

  // getTransactionFromBlockById
  it('should return transaction', async (done) => {
    expect(
      await blockchain.getTransactionFromBlockById(genesis.data[0].id)
    ).toBeInstanceOf(Object);
    expect(
      await blockchain.getTransactionFromBlockById(transactionDefault.id)
    ).toEqual(transactionDefault);

    done();
  });

  // getTransactionFromBlockById
  it('should return false if transaction not found in block', async (done) => {
    expect(
      await blockchain.getTransactionFromBlockById(transactionInvalid.id)
    ).toBeFalsy();

    done();
  });

  // getUnspentOutputsByAddress
  /*it('should return utxo', (done) => {
    expect(
      blockchain.getUnspentOutputsByAddress(transactionDefault.txOuts[0].address)
    ).toEqual(utxoDefault);

    done();
  });*/

  // getUnspentOutputsByAddress
  it('should return empty array', (done) => {
    expect(
      blockchain.getUnspentOutputsByAddress(
        transactionInvalid.txOuts[0].address
      )
    ).toEqual([]);

    done();
  });

  // getBalanceForAddress
  it('should return balance', (done) => {
    expect(
      blockchain.getBalanceForAddress(transactionDefault.txOuts[0].address)
    ).toEqual(1);

    done();
  });

  // getBalanceForAddress
  it('should return false', (done) => {
    expect(
      blockchain.getBalanceForAddress(transactionInvalid.txOuts[0].address)
    ).toBeFalsy();

    done();
  });
});
