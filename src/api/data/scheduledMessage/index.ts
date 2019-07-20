import { mutationResolvers, mutationTypes } from './scheduledMessage.mutations'
import { queryResolvers, queryTypes } from './scheduledMessage.queries'
import { subscriptionResolvers, subscriptionTypes } from './scheduledMessage.subscriptions'
import { typeResolvers, types } from './scheduledMessage.type'

export default {
  types: () => [
    types,
    queryTypes,
    mutationTypes,
    subscriptionTypes,
  ],
  resolvers: Object.assign(
    queryResolvers,
    mutationResolvers,
    subscriptionResolvers,
    typeResolvers,
  ),
}
