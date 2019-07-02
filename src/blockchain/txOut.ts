/**
 * @class
 */
class TxOut {
  public static fromJS(json): TxOut {
    const { address, amount } = json;

    return new TxOut(address, amount);
  }

  public address: string;
  public amount: number;

  public constructor(address: string, amount: number) {
    this.address = address;
    this.amount = amount;
  }
}

export default TxOut;
