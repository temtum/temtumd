import * as Joi from 'joi';

export default Joi.object().keys({
  index: Joi.number(),
  hash: Joi.string()
    .hex()
    .length(64),
  previousHash: Joi.string()
    .hex()
    .allow('')
    .length(64),
  timestamp: Joi.number(),
  data: Joi.array()
});
