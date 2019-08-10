import { logger } from 'src/config/logger';
import { ScheduledMessage } from 'src/api/data/scheduledMessage/scheduledMessage.entity';
import { Between } from 'typeorm';
import { addMinutes } from 'date-fns';
import sendMail, { IMailerHTML } from 'src/config/mailer';
import { IReviewInvite } from 'src/config/mailer/templates/reviewInvite/reviewInvite';
import { templates } from 'src/config/mailer/templateParser';
import { CronJob } from 'cron'
import { CronTask } from '..';

export default class EmailCron extends CronTask {
  sendEmailTask = async () => {
    logger.debug('Sending emails')
    const currDate = new Date()
    const messages = await ScheduledMessage.find({ where: { scheduledTime: Between(currDate, addMinutes(currDate, 1)), sentTime: null } })
    messages.map(message => {
      message.sentTime = new Date()
      const data: IMailerHTML<IReviewInvite> = {
        to: message.recipientEmail,
        subject: 'Leave us a review!',
        template: templates.reviewInvite,
        params: {
          actionUrl: 'https://altamir.io',
          helpUrl: 'https://altamir.io/blog',
          name: message.recipientName,
          productName: 'red scarf',
          senderName: 'Spencer',
          senderOrganization: 'Data Intel',
          supportEmail: 'support@dataintel.ai'
        }
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
  scheduleJob(cronString: string = "0 * * * * *"): void {
    return new CronJob(
      cronString,
      this.sendEmailTask,
      null,
      true,
    )
  }
}