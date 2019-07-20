/* tslint:disable no-unused-expression newline-per-chained-call */
import index from './index'

describe('scheduledMessage/index', () => {
  it('should export an object with `types` and `resolvers`', (done: () => void) => {
    expect(index).toHaveProperty('types')
    expect(index).toHaveProperty('resolvers')
    done()
  })

  it('should have a Query property on the resolvers', (done: () => void) => {
    expect(index.resolvers).toHaveProperty('Query')
    done()
  })

  it('should have a Mutation property on the resolvers', (done: () => void) => {
    expect(index.resolvers).toHaveProperty('Mutation')
    done()
  })

  it('should have a Subscription property on the resolvers', (done: () => void) => {
    expect(index.resolvers).toHaveProperty('Subscription')
    done()
  })
})
