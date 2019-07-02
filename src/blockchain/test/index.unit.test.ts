import Block from '../block';
import Transaction from '../transaction';

import {
  blockDefault,
  transactionDefault,
  transactionInvalid
} from '../__mocks__/index.data';

describe('Transactions in blockchain', () => {
  it('should return block', (done) => {
    expect(Block.fromJS(blockDefault)).toBeInstanceOf(Block);

    done();
  });

  it('should verify new transaction', (done) => {
    const transaction: Transaction = Transaction.fromJS(transactionDefault);

    expect(transaction).toBeInstanceOf(Transaction);
    expect(transaction.isValidTransaction()).toBeTruthy();

    done();
  });

  it("should't verify new transaction", (done) => {
    const transaction: Transaction = Transaction.fromJS(transactionInvalid);

    expect(transaction).toBeInstanceOf(Transaction);
    expect(() => {
      transaction.isValidTransaction();
    }).toThrow();

    done();
  });
});
