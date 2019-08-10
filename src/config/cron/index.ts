/* tslint:disable no-unused-expression */
import { logger } from '../logger'
import { CronJob } from 'cron'
import EmailCron from './email';

export default class Cron {
  public static init(): void {
    try {
      new EmailCron().scheduleJob('0 * * * * *')
      logger.silly('Email Cronjob Scheduled')
      logger.info('Cron initialized successfully')
    } catch (e) {
      logger.error(e)
      logger.error('FAILED: Cron did not initialize correctly')
    }
  }
}

export abstract class CronTask {
  abstract scheduleJob(cronString: string): CronJob
}
