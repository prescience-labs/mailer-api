/* tslint:disable no-unused-expression */
import { CronJob } from 'cron'
import { logger } from './logger'

export default class Cron {
  public static init(): void {
    logger.info('Cron initialized')
    Cron.testCron()
  }

  private static testCron(): void {
    const TEST_CRON_INTERVAL = '0 * * * * *' // every minute

    new CronJob(
      TEST_CRON_INTERVAL,
      (): void => {
        logger.info('Hello, I am Cron! Please see /src/config/cron.ts')
      },
      null,
      true,
    )
  }
}
