/* tslint:disable no-unused-expression */
import { CronJob } from 'cron'
import { logger } from './logger'
import { ScheduledMessage } from 'src/api/data/scheduledMessage/scheduledMessage.entity';
import { Between } from 'typeorm';
import { addMinutes, format } from 'date-fns';
import sendMail from './mailer'

/**
 * @export
 * @class Cron
 */
export default class Cron {
  /**
   * @static
   * @memberof Cron
   */
  public static init(): void {
    logger.info('Cron initialized')
    Cron.sendEmails()
  }

  /**
   * @private
   * @static
   * @memberof Cron
   */
  private static sendEmails(): void {
    const SEND_EMAIL_INTERVAL = '0 * * * * *' // every minute
    const sendEmailTask = async () => {
      logger.debug('Sending emails')
      const currDate = new Date()
      const messages = await ScheduledMessage.find({ where: { scheduledTime: Between(currDate, addMinutes(currDate, 1)) } })
      messages.map(message => {
        message.sentTime = new Date()
        const data = {
          to: message.recipientEmail,
          subject: 'Leave us a review!',
          text: `Leave us a review!`,
        }
        sendMail(data, (err, body) => {
          if (err) {
            throw err
          }
          else {
            logger.debug('Email successfully sent')
          }
        })
      })
    }
    sendEmailTask()
    new CronJob(
      SEND_EMAIL_INTERVAL,
      sendEmailTask,
      null,
      true,
    )
  }
}
