import { gql } from 'apollo-server-express'
import { logger } from '../../../config/logger'
import { ScheduledMessage } from './scheduledMessage.entity'

const Query = gql`
  extend type Query {
    scheduledMessage(id: ID!): ScheduledMessage
    scheduledMessages(take: Int, skip: Int): [ScheduledMessage]
  }
`

export const queryTypes = () => [Query]

export const queryResolvers = {
  Query: {
    async scheduledMessage(obj, { id }, context, info) {
      return await ScheduledMessage.findOne({ id })
    },

    async scheduledMessages(obj, { take, skip }, context, info) {
      take = take || 10 // default query limit to 10
      if (take > 50) {
        take = 50
      } // limit query to 50 max
      skip = skip || 0 // default to none skipped

      return await ScheduledMessage.createQueryBuilder('scheduledMessage')
        .take(take)
        .skip(skip)
        .getMany()
    },
  },
}
