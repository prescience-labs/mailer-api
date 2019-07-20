import * as http from 'http'
import graphql from './api/data'
import app from './app'
import Cron from './config/cron'
import Database from './config/db'
import { logger } from './config/logger'
import settings from './config/settings'

export default class Server {
  private httpServer: any
  private db: Database = new Database()
  private dbInitializedSeparately: boolean = false

  /**
   * Initialize the server. This can be called from anywhere, including tests,
   * to scaffold out the full server. callback() is an optional parameter mostly
   * used to pass done() in testing.
   */
  public async up(
    dbInitializedSeparately: boolean = false,
    callback?: () => void,
  ) {
    logger.silly('Starting app')

    // database must be first
    this.dbInitializedSeparately = dbInitializedSeparately
    if (!this.dbInitializedSeparately) {
      // this block exists to help with testing
      await this.db.init()
    }

    await Cron.init()

    await graphql.applyMiddleware({ app })
    this.httpServer = await http.createServer(app)
    await graphql.installSubscriptionHandlers(this.httpServer)

    this.httpServer.listen(settings.port, () => {
      logger.info(
        `Server ready at http://127.0.0.1:${settings.port}${graphql.graphqlPath} 🚀`,
      )
      logger.info(
        `Subscriptions ready at ws://127.0.0.1:${settings.port}${graphql.subscriptionsPath} 🚀`,
      )

      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  /**
   * Close the server. Pass a callback (mostly used to close the server in
   * tests).
   */
  public async down(callback?: () => void) {
    if (!this.dbInitializedSeparately) {
      await this.db.close()
    }

    this.httpServer.close(() => {
      logger.info('Server closed')

      if (typeof callback === 'function') {
        callback()
      }
    })
  }
}
