import * as winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const myFormat = printf((info) => {
  return info.stack
    ? `\u001b[31m${info.timestamp}: ${info.level} - ${info.stack}\u001b[39m`
    : `${info.timestamp}: ${info.level} - ${info.message}`;
});

const logger = winston.createLogger({
  silent: process.env.NODE_ENV === 'test',
  format: combine(timestamp(), myFormat),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: 'logs/debug.log', level: 'info' })
  ]
});

export default logger;
