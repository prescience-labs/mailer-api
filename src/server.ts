import * as http from 'http'
import graphql from './api/data'
import app from './app'
import Cron from './config/cron'
import Database from './config/db'
import { logger } from './config/logger'
import settings from './config/settings'

/**
 * @export
 * @class Server
 */
export default class Server {
  private httpServer: any
  private db: Database = new Database()

  /**
   * Initialize the server. This can be called from anywhere, including tests,
   * to scaffold out the full server. callback() is an optional parameter mostly
   * used to pass done() in testing.
   * @public
   * @memberof Server
   */
  public async up(callback?: () => void) {
    logger.silly('Starting app')

    // database must be first
    await this.db.init()

    await Cron.init()

    await graphql.applyMiddleware({ app })
    this.httpServer = await http.createServer(app)
    await graphql.installSubscriptionHandlers(this.httpServer)

    this.httpServer.listen(settings.port, () => {
      logger.info(`Server ready at http://127.0.0.1:${settings.port}${graphql.graphqlPath} 🚀`)
      logger.info(`Subscriptions ready at ws://127.0.0.1:${settings.port}${graphql.subscriptionsPath} 🚀`)

      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  /**
   * Close the server. Pass a callback (mostly used to close the server in
   * tests).
   * @public
   * @memberof Server
   */
  public async down(callback?: () => void) {
    await this.db.close()

    this.httpServer.close(() => {
      logger.info('Server closed')

      if (typeof callback === 'function') {
        callback()
      }
    })
  }
}
