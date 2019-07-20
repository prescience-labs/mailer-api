import { gql } from 'apollo-server-express'

const ScheduledMessage = gql`
  type ScheduledMessage {
    id: ID!
    body: String!
    scheduledTime: String!
    token: String
    recipientEmail: String!
    recipientName: String
  }
  input ScheduledMessageInput {
    body: String!
    scheduledTime: String!
    recipientEmail: String!
    recipientName: String
  }
`

export const types = () => [ScheduledMessage]

export const typeResolvers = {}
