import Shared from '../shared';

class AdressEntity {
  private shared;

  public constructor(shared) {
    this.shared = shared;
  }

  public addressCreate() {
    return Shared.addressCreate();
  }

  public addressUnspent(address) {
    const utxo = this.shared.getUnspentTransactionsForAddress(address);

    return { unspentTxOuts: utxo };
  }

  public addressBalance(address) {
    const balance = this.shared.getBalanceForAddress(address);

    return { balance };
  }
}

export default AdressEntity;
