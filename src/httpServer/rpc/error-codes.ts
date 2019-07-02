const parseError = {
  code: -32700,
  message: 'Parse error'
};

const invalidRequest = {
  code: -32600,
  message: 'Invalid Request'
};

const methodNotFound = {
  code: -32601,
  message: 'Method not found'
};

const invalidParams = {
  code: -32602,
  message: 'Invalid params'
};

const internalError = {
  code: -32603,
  message: 'Internal error'
};

const serverError = {
  code: -32000,
  message: 'Server error'
};

export {
  parseError as PARSE_ERROR,
  invalidRequest as INVALID_REQUEST,
  methodNotFound as METHOD_NOT_FOUND,
  invalidParams as INVALID_PARAMS,
  internalError as INTERNAL_ERROR,
  serverError as SERVER_ERROR
};
