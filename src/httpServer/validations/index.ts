import CustomErrors from '../../errors/customErrors';

export default {
  sendTransaction: (req, res, next) => {
    if (
      !req.body.txHex ||
      typeof req.body.txHex !== 'string' ||
      !RegExp(/[0-9A-Fa-f]{6}/).test(req.body.txHex)
    ) {
      next(new CustomErrors.BadRequest('Invalid transaction hex'));
    }

    next();
  },
  createTransaction: (req, res, next) => {
    if (
      !req.body.from ||
      typeof req.body.from !== 'string' ||
      req.body.from.length !== 66
    ) {
      next(new CustomErrors.BadRequest('Invalid sender address'));
    }

    if (
      !req.body.to ||
      typeof req.body.to !== 'string' ||
      req.body.to.length !== 66
    ) {
      next(new CustomErrors.BadRequest('Invalid recipient address'));
    }

    if (
      !req.body.privateKey ||
      typeof req.body.privateKey !== 'string' ||
      req.body.privateKey.length !== 64
    ) {
      next(new CustomErrors.BadRequest('Invalid private key'));
    }

    if (
      !req.body.amount ||
      typeof req.body.amount !== 'number' ||
      req.body.amount < 1
    ) {
      next(new CustomErrors.BadRequest('Invalid amount'));
    }

    next();
  }
};
