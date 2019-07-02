import BaseError from '../baseError';

class NotFound extends BaseError {
  public constructor(message, options = {}) {
    super(message, 404, options);
  }
}

export default NotFound;
