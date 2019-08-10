import * as nodemailer from 'nodemailer'
import { logger } from '../logger'
import settings from '../settings'
import parse, { templates } from './templateParser'

/**
 * You can either pass in a `text` parameter or you can pass in a `template` and
 * `link`, but you cannot pass in both.
 * https://stackoverflow.com/a/37688375/5623385
 */
interface IMailer {
  to: string
  from?: string
  subject: string
}
export interface IMailerText extends IMailer {
  text: string
}
export interface IMailerHTML<T> extends IMailer {
  template: keyof typeof templates
  params: T
}
type MailerArgs<T> = IMailerText | IMailerHTML<T>

const transporterConfig = {
  pool: false,
  host: settings.mailHost,
  port: settings.mailPort,
  secure: settings.mailSecure,
  auth: {
    user: settings.mailUser,
    pass: settings.mailPass,
  },
  debug: true,
}

const transporter = nodemailer.createTransport(transporterConfig)

/**
 *
 */
export default <T>(opts: MailerArgs<T>, done: CallableFunction = () => {}) => {
  const data: any = opts
  logger.silly('Email config:')
  logger.silly(transporterConfig)
  logger.silly('Email details:')
  logger.silly(data)

  // set from email as default from email if not already set
  data.from = data.from || settings.mailFrom

  if (data.template) {
    // this email is an html email
    logger.debug('Sending an HTML email')
    data.html = parse<T>(data.template, data.params)
  } else {
    // this email is a plain text email
    logger.debug('Sending a plain text email')
  }

  transporter.sendMail(data, (err, info, response) => {
    if (err) {
      logger.error(err)
      return done(err, false)
    }

    logger.debug('Sent an email')
    logger.debug(info)

    return done(null, response)
  })
}
