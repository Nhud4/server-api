const winston = require('winston')
const { formatToTimeZone } = require('date-fns-timezone')

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      exitOnError: false,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
      transports: [
        new winston.transports.Console()
      ]
    })
  }

  log(context, message, scope) {
    const obj = {
      context,
      scope,
      message: message,
      idtime: formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm:ss', { timeZone: 'Asia/Jakarta' })
    }
    return this.logger.info(obj)
  }

  info(context, message, scope, meta = undefined) {
    const obj = {
      level: 'info',
      context,
      scope,
      message: message,
      meta,
      idtime: formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm:ss', { timeZone: 'Asia/Jakarta' })
    }
    return this.logger.info(obj)
  }

  error(context, message, scope, meta = undefined) {
    const obj = {
      level: 'error',
      context,
      scope,
      message: message,
      meta,
      idtime: formatToTimeZone(new Date(), 'YYYY-MM-DD HH:mm:ss', { timeZone: 'Asia/Jakarta' })
    }
    return this.logger.error(obj)
  }
}

module.exports = Logger