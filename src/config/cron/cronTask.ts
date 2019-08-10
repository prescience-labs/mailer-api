import { CronJob } from 'cron'

export abstract class CronTask {
  abstract scheduleJob(cronString: string): CronJob
}