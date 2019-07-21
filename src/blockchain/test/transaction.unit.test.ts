import Blockchain from '../index';
import Transaction from '../transaction';
import CustomErrors from '../../errors/customErrors';

import { utxo, transactions } from '../__mocks__/data';

jest.mock('../index', () => {
  return {
    default: jest.fn().mockImplementation(() => {})
  };
});

const emitter = jest.fn().mockImplementation(() => {});
const queue = jest.fn().mockImplementation(() => {});

describe('Transaction', () => {
  it('should be valid tx schema', (done) => {
    const transaction = Transaction.fromJS(transactions.valid);

    expect(() => {
      transaction.isValidSchema();
    }).not.toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid tx schema: wrong type', (done) => {
    const transaction = Transaction.fromJS(transactions.schema.badType);

    expect(() => {
      transaction.isValidSchema();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid tx schema: wrong id', (done) => {
    const transaction = Transaction.fromJS(transactions.schema.badId);

    expect(() => {
      transaction.isValidSchema();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid tx schema: wrong timestamp', (done) => {
    const transaction = Transaction.fromJS(transactions.schema.badTimestamp);

    expect(() => {
      transaction.isValidSchema();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be valid timestamp', (done) => {
    const txData: any = transactions.create;

    txData.timestamp = Math.floor(Date.now() / 1000);

    const transaction = Transaction.fromJS(txData);

    expect(() => {
      transaction.isValidTimestamp();
    }).not.toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid timestamp', (done) => {
    const txData: any = transactions.create;

    txData.timestamp = Math.floor((Date.now() - 10800000) / 1000);

    const transaction = Transaction.fromJS(txData);

    expect(() => {
      transaction.isValidTimestamp();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be valid hash', (done) => {
    const transaction = Transaction.fromJS(transactions.valid);

    expect(() => {
      transaction.isValidHash();
    }).not.toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid hash', (done) => {
    const transaction = Transaction.fromJS(transactions.notValid.id);

    expect(() => {
      transaction.isValidHash();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should match the sum of the inputs and outputs', (done) => {
    const transaction = Transaction.fromJS(transactions.valid);

    expect(() => {
      transaction.isInputsMoreThanOutputs();
    }).not.toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should not match the sum of the inputs and outputs', (done) => {
    const transaction = Transaction.fromJS(transactions.notValid.sum);

    expect(() => {
      transaction.isInputsMoreThanOutputs();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be valid inputs', (done) => {
    Blockchain.prototype.hasUtxoExist = jest.fn().mockImplementation((data) => {
      return (
        data.amount === utxo.normal.amount &&
        data.txOutId === utxo.normal.txOutId
      );
    });

    const transaction = Transaction.fromJS(transactions.valid);
    const blockchain = new Blockchain(emitter, queue);

    expect(() => {
      transaction.hasValidTxInputs(blockchain);
    }).not.toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid inputs: wrong utxo', (done) => {
    Blockchain.prototype.hasUtxoExist = jest.fn().mockImplementation((data) => {
      return (
        data.amount === utxo.normal.amount &&
        data.txOutId === utxo.normal.txOutId
      );
    });

    const transaction = Transaction.fromJS(transactions.notValid.utxo);
    const blockchain = new Blockchain(emitter, queue);

    expect(() => {
      transaction.hasValidTxInputs(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid inputs: empty inputs', (done) => {
    const transaction = Transaction.fromJS(transactions.notValid.utxoLen);
    const blockchain = new Blockchain(emitter, queue);

    expect(() => {
      transaction.hasValidTxInputs(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid inputs: float amount', (done) => {
    Blockchain.prototype.hasUtxoExist = jest.fn().mockImplementation((data) => {
      return (
        data.amount === utxo.floatAmount.amount &&
        data.txOutId === utxo.floatAmount.txOutId
      );
    });

    const transaction = Transaction.fromJS(transactions.notValid.floatAmount);
    const blockchain = new Blockchain(emitter, queue);

    expect(() => {
      transaction.hasValidTxInputs(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid inputs: wrong signature', (done) => {
    Blockchain.prototype.hasUtxoExist = jest.fn().mockImplementation((data) => {
      return (
        data.amount === utxo.normal.amount &&
        data.txOutId === utxo.normal.txOutId
      );
    });

    const transaction = Transaction.fromJS(transactions.notValid.signature);
    const blockchain = new Blockchain(emitter, queue);

    expect(() => {
      transaction.hasValidTxInputs(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be valid outputs', (done) => {
    const transaction = Transaction.fromJS(transactions.valid);

    expect(() => {
      transaction.hasValidTxOutputs();
    }).not.toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid outputs: negative amount', (done) => {
    const transaction = Transaction.fromJS(transactions.notValid.negative);

    expect(() => {
      transaction.hasValidTxOutputs();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be not valid outputs: empty outputs', (done) => {
    const transaction = Transaction.fromJS(transactions.notValid.outputsLen);

    expect(() => {
      transaction.hasValidTxOutputs();
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should be valid transaction', (done) => {
    Blockchain.prototype.hasUtxoExist = jest.fn().mockImplementation((data) => {
      return (
        data.amount === utxo.normal.amount &&
        data.txOutId === utxo.normal.txOutId
      );
    });

    const blockchain = new Blockchain(emitter, queue);
    const transaction = Transaction.fromJS(transactions.valid);

    expect(transaction.isValidTransaction(blockchain)).toBeTruthy();

    done();
  });

  it('should be not valid transaction', (done) => {
    Blockchain.prototype.hasUtxoExist = jest.fn().mockImplementation((data) => {
      return (
        data.amount === utxo.normal.amount &&
        data.txOutId === utxo.normal.txOutId
      );
    });

    const blockchain = new Blockchain(emitter, queue);
    const transaction = Transaction.fromJS(transactions.notValid.negative);

    expect(() => {
      transaction.isValidTransaction(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    done();
  });

  it('should not send money to yourself', (done) => {
    Blockchain.prototype.hasUtxoExist = jest.fn().mockImplementation((data) => {
      return (
        data.amount === utxo.normal.amount &&
        data.txOutId === utxo.normal.txOutId
      );
    });

    const blockchain = new Blockchain(emitter, queue);
    const tx1 = Transaction.fromJS(transactions.notValid.myself[0]);

    expect(() => {
      tx1.isValidTransaction(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    const tx2 = Transaction.fromJS(transactions.notValid.myself[1]);

    expect(() => {
      tx2.isValidTransaction(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    const tx3 = Transaction.fromJS(transactions.notValid.myself[2]);

    expect(() => {
      tx3.isValidTransaction(blockchain);
    }).toThrow(CustomErrors.BadRequest);

    done();
  });
});
