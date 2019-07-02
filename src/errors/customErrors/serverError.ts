import BaseError from '../baseError';

class ServerError extends BaseError {
  public constructor(message, options = {}) {
    super(message, 500, options);
  }
}

export default ServerError;
