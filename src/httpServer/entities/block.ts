import CustomErrors from '../../errors/customErrors';

class BlockEntity {
  private blockchain;
  private shared;

  public constructor(blockchain, shared) {
    this.blockchain = blockchain;
    this.shared = shared;
  }

  public async blocksList(page = 0) {
    return await this.blockchain.getBlockList(page);
  }

  public async blockByHash(block) {
    if (/([a-zA-Z0-9]{64})/.test(block)) {
      return await this.shared.viewBlockByHash(block);
    }

    if (/(\d+)/.test(block)) {
      return await this.shared.getBlockByIndex(block);
    }

    throw new CustomErrors.BadRequest('Invalid hash or index');
  }

  public async blockLast() {
    return await this.shared.getLastBlock();
  }

  public async blockLastIndex() {
    const index = await this.blockchain.getLastBlockIndex();

    return { index };
  }
}

export default BlockEntity;
