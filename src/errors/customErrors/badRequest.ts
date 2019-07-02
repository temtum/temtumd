import BaseError from '../baseError';

class BadRequest extends BaseError {
  public constructor(message, options = {}) {
    super(message, 400, options);
  }
}

export default BadRequest;
