/* tslint:disable no-var-requires */
import chalk from 'chalk'
import * as util from 'util'
import * as winston from 'winston'
import { Loggly } from 'winston-loggly-bulk'
import settings from '../settings'
import { SentryTransport } from './sentry'

export const logger = winston.createLogger({
  level: settings.logLevel || 'warn',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json(),
  ),
  exitOnError: false,
})

logger.add(
  new winston.transports.Console({
    handleExceptions: true,
    silent: settings.env === 'test' ? true : false,
    format: winston.format.combine(
      winston.format.printf((data) => {
        let message: string = `${chalk.blue(`[${settings.name}]`)}`

        let level = ` ${data.level.toUpperCase()} `
        switch (level.toLowerCase().trim()) {
          case 'error':
            level = chalk.bgHex('FF4136').bold(level)
            break
          case 'warn':
            level = chalk.bgHex('FF851B').bold(level)
            break
          case 'info':
            level = chalk.bgHex('0074D9').bold(level)
            break
          case 'verbose':
            level = chalk.bgHex('FFDC00').bold(level)
            break
          case 'debug':
            level = chalk.bgHex('3D9970').bold(level)
            break
          case 'silly':
            level = chalk.bgHex('B10DC9').bold(level)
            break
          default:
            level = chalk.bgWhite.bold(level)
            break
        }
        message = `${message} ${level}`

        if (typeof data.message === 'object') {
          message = `${message} \n${util.inspect(
            data.message,
            false,
            null,
            true,
          )}`
        } else {
          message = `${message} ${data.message}`
        }

        return message
      }),
    ),
  }),
)

if (settings.sentry.dsn) {
  logger.info('Adding Sentry logger')
  logger.add(
    new SentryTransport({
      level: settings.sentry.logLevel || 'warn',
    }),
  )
}

if (settings.loggly.token && settings.loggly.subdomain) {
  logger.info('Adding Loggly logger')
  logger.add(
    new Loggly({
      level: settings.loggly.logLevel || 'warn',
      token: settings.loggly.token,
      subdomain: settings.loggly.subdomain,
      tags: ['Winston-NodeJS'],
      json: true,
    }),
  )
}

class Stream {
  public write(text: string) {
    /**
     * Frequently, Morgan (and other loggers) will include linebreaks in their
     * text (as all loggers should). When wrapping with this logger, we want to
     * remove those linebreaks since we are already including our own.
     * https://stackoverflow.com/a/10805198/5623385
     */
    logger.info(text.replace(/(\r\n|\n|\r)/gm, ''))
  }
}
export const stream = new Stream()
