class BaseError extends Error {
  public status: number;
  public options;

  public constructor(message, status, options) {
    super();
    this.message = message || 'Something went wrong. Please try again';
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
    this.options = options;
  }
}

export default BaseError;
