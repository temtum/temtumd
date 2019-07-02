import Blockchain from '../../blockchain';
import CustomErrors from '../../errors/customErrors';
import Node from '../../node';
import Shared from '../shared';

class TransactionEntity {
  private node: Node;
  private shared: Shared;
  private blockchain: Blockchain;

  public constructor(blockchain, node, shared) {
    this.node = node;
    this.shared = shared;
    this.blockchain = blockchain;
  }

  public async transactionCreate(from, to, amount, privateKey) {
    if (!this.node.isNodeReady()) {
      throw new CustomErrors.BadRequest('Failed to create a transaction');
    }

    try {
      return await this.shared.transactionCreate(from, to, amount, privateKey);
    } catch (error) {
      throw new CustomErrors.BadRequest('Failed to create a transaction');
    }
  }

  public async transactionSend(txHex) {
    if (!this.node.isNodeReady()) {
      throw new CustomErrors.BadRequest('Failed to create a transaction');
    }

    try {
      const transaction = await Shared.transactionSend(txHex);

      return { transaction };
    } catch (error) {
      throw new CustomErrors.BadRequest('Failed to create a transaction');
    }
  }

  public async transactionId(id) {
    return await this.shared.getTransactionById(id);
  }

  public async getLastTransactionList() {
    return await this.blockchain.getLastTransactionList();
  }
}

export default TransactionEntity;
