import * as Joi from 'joi';

export default Joi.object().keys({
  id: Joi.string()
    .regex(/^([0-9A-Fa-f]{64})+$/)
    .required(),
  timestamp: Joi.date()
    .timestamp('unix')
    .required(),
  type: Joi.string()
    .regex(/^(regular|coinbase)$/)
    .required(),
  txIns: Joi.array().required(),
  txOuts: Joi.array().required()
});
