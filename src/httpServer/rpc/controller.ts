/*eslint @typescript-eslint/camelcase: ["error", {properties: "never"}]*/

import Shared from '../shared';

export default class RpcController {
  private shared: Shared;

  public constructor(shared) {
    this.shared = shared;
  }

  public getMethods() {
    return {
      create_address: () => Shared.addressCreate(),
      send_transaction: (req) => {
        const { txHex } = req.body.params;

        return Shared.transactionSend(txHex);
      },
      create_transaction: async (req) => {
        const { from, to, amount, privateKey } = req.body.params;

        return await this.shared.transactionCreate(
          from,
          to,
          amount,
          privateKey
        );
      },
      get_transaction: async (req) => {
        const { id } = req.body.params;

        return await this.shared.getTransactionById(id);
      },
      get_block: async (req) => {
        const { index, hash } = req.body.params;

        if (hash) {
          return await this.shared.viewBlockByHash(hash);
        }

        if (index) {
          return await this.shared.getBlockByIndex(index);
        }
      },
      get_block_last: async () => {
        return await this.shared.getLastBlock();
      },
      get_balance: (req) => {
        const { address } = req.body.params;

        return this.shared.getBalanceForAddress(address);
      },
      get_unspents: (req) => {
        const { address } = req.body.params;

        return this.shared.getUnspentTransactionsForAddress(address);
      },
      get_statistic: async () => {
        return this.shared.getStatistic();
      }
    };
  }
}
