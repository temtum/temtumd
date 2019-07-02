import { genesis, transactionDefault } from './index.data';

class Blockchain {
  public readonly genesis;

  public constructor() {
    this.genesis = genesis;
  }

  public getLastBlock(): object {
    return this.genesis;
  }

  public getTransactionPool(): object[] {
    return [transactionDefault];
  }

  public cutTransactionPool(): object[] {
    return [transactionDefault];
  }

  public findInputInBlockchain(): boolean {
    return true;
  }

  public getUnspentOutput(): boolean {
    return true;
  }
}

export default Blockchain;
