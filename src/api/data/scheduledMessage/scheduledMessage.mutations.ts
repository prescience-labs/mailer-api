import { gql, ApolloError } from 'apollo-server-express'
import { logger } from '../../../config/logger'
import { pubsub } from '../subscriptions'
import { ScheduledMessage } from './scheduledMessage.entity'
import { subscriptions } from './scheduledMessage.subscriptions'
import * as uuid from 'uuid'
import * as moment from 'moment'

// Test purposes
import sendMail, { IMailerHTML } from '../../../config/mailer'
import { templates } from '../../../config/mailer/templateParser'

const Mutation = gql`
  extend type Mutation {
    createScheduledMessage(messageData: ScheduledMessageInput!): ScheduledMessage
    reviewRequest(emailData: ReviewRequestData): Boolean
  }
`

export const mutationTypes = () => [Mutation]

export const mutationResolvers = {
  Mutation: {
    async createScheduledMessage(obj, { messageData }, context, info) {
      try {
        const newDate = moment(messageData.scheduledTime).toDate()
        messageData.scheduledTime = newDate
      } catch (e) {
        logger.error(e)
        throw new ApolloError('scheduledTime date was not valid')
      }
      if (moment(messageData.scheduledTime).isBefore(moment(new Date()))) {
        const errorMessage = 'Time is in the past. You must schedule a message for a future time'
        logger.error(errorMessage)
        throw new ApolloError(errorMessage)
      }
      const scheduledMessage = await ScheduledMessage.create(messageData)

      scheduledMessage.token = uuid.v4()
      await scheduledMessage.save()
      pubsub.publish(subscriptions.SCHEDULEDMESSAGE_ADDED, scheduledMessage)
      return scheduledMessage
    },
    async reviewRequest(obj, { emailData }, context, info) {
       const data: IMailerHTML<any> = {
        to: emailData.emailTo,
        subject: 'Review Request!',
        template: templates.reviewRequest,
        params: {
          link: emailData.link,
        },
      }
      sendMail(data, (err, body) => {
        if (err) {
          throw err
        } else {
          console.log('Email successfully sent')
        }
      })
      return true
    },
  },
}
