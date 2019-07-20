import { gql } from 'apollo-server-express'
import { logger } from '../../../config/logger'
import { pubsub } from '../subscriptions'

export const subscriptions = {
  SCHEDULEDMESSAGE_ADDED: 'SCHEDULEDMESSAGE_ADDED',
}

const Subscription = gql`
  extend type Subscription {
    scheduledMessageAdded: ScheduledMessage
  }
`

export const subscriptionTypes = () => [Subscription]

export const subscriptionResolvers = {
  Subscription: {
    scheduledMessageAdded: {
      resolve: (scheduledMessage) => {
        return scheduledMessage
      },
      subscribe: () => pubsub.asyncIterator([subscriptions.SCHEDULEDMESSAGE_ADDED]),
    },
  },
}
