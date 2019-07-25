import * as winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const myFormat = printf((info) => {
  return info.stack
    ? `\u001b[31m${info.timestamp}: ${info.level} - ${info.stack}\u001b[39m`
    : `${info.timestamp}: ${info.level} - ${info.message}`;
});

let silent = false;
let logger;

if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  logger = winston.createLogger({
    silent: true,
    format: combine(timestamp(), myFormat)
  });
} else {
  logger = winston.createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({ filename: 'logs/debug.log', level: 'info' })
    ]
  });
}

logger.on('error', (err) => {
  logger.error(err);
});

export default logger;
