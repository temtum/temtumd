import * as winston from 'winston';

const { combine, timestamp, printf } = winston.format;

const myFormat = printf((info) => {
  return info.stack
    ? `\u001b[31m${info.timestamp}: ${info.level} - ${info.stack}\u001b[39m`
    : `${info.timestamp}: ${info.level} - ${info.message}`;
});

let silent = false;

if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  silent = true;
}

const logger = winston.createLogger({
  silent,
  format: combine(timestamp(), myFormat)
});

if (process.env.NODE_ENV && !silent) {
  logger.add(new winston.transports.Console({ level: 'info' }));
  logger.add(
    new winston.transports.File({
      filename: 'logs/debug.log',
      level: 'info'
    })
  );

  logger.on('error', (err) => {
    logger.error(err);
  });
}

export default logger;
