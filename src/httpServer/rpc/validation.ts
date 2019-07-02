export default {
  search: (req) => {
    if (!req.body.params.query) {
      throw new Error('Invalid query');
    }
  },
  'transaction-send': (req) => {
    if (
      !req.body.params.txHex ||
      typeof req.body.params.txHex !== 'string' ||
      !RegExp(/[0-9A-Fa-f]{6}/).test(req.body.params.txHex)
    ) {
      throw new Error('Invalid transaction hex');
    }
  },
  'trasnaction-create': (req) => {
    if (
      !req.body.params.from ||
      typeof req.body.params.from !== 'string' ||
      req.body.params.from.length !== 66
    ) {
      throw new Error('Invalid sender address');
    }

    if (
      !req.body.params.to ||
      typeof req.body.params.to !== 'string' ||
      req.body.params.to.length !== 66
    ) {
      throw new Error('Invalid recipient address');
    }

    if (
      !req.body.params.privateKey ||
      typeof req.body.params.privateKey !== 'string' ||
      req.body.params.privateKey.length !== 64
    ) {
      throw new Error('Invalid private key');
    }

    if (
      !req.body.params.amount ||
      typeof req.body.params.amount !== 'number' ||
      req.body.params.amount < 1
    ) {
      throw new Error('Invalid amount');
    }
  }
};
