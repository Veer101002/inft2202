import winston from 'winston';
//https://www.npmjs.com/package/winston
export const logger = winston.createLogger({
  level: 'info', // only messages with a severity level of 'info' and higher (e.g., 'warn' and 'error') will be logged.
  format: winston.format.json(),
  defaultMeta: { 
    service: 'animal-service' 
  },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    // format: winston.format.simple(),
    // format: winston.format.prettyPrint(),
    format: winston.format.printf(log => log.message)
  }));
}