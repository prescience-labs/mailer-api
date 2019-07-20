/* tslint:disable no-unused-expression newline-per-chained-call */
import { queryResolvers, queryTypes } from './scheduledMessage.queries'

describe('scheduledMessage queries', () => {
  it('should export queryTypes', () => {
    expect(typeof queryTypes).toBe('function')
    // expect(typeof queryTypes()).toBe('array')
  })

  it('should export queryResolvers', () => {
    expect(typeof queryResolvers).toBe('object')
    expect(queryResolvers).toHaveProperty('Query')
  })
})
