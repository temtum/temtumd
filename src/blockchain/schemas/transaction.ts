import * as Joi from 'joi';

export default Joi.object().keys({
  id: Joi.strict(),
  timestamp: Joi.number(),
  type: Joi.string(),
  txIns: Joi.array(),
  txOuts: Joi.array()
});
