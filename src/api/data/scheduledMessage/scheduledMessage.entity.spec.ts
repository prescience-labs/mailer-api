/* tslint:disable no-unused-expression newline-per-chained-call */
import { Connection, createConnection } from 'typeorm'
import validator from 'validator'
import settings from '../../../config/settings'
import { ScheduledMessage } from './scheduledMessage.entity'

describe('scheduledMessage entity', () => {
  let connection: Connection
  const testEntity = {
    title: 'Test title for ScheduledMessage',
    body: 'Test body for ScheduledMessage',
  }

  beforeEach(async () => {
    connection = await createConnection({
      type: 'postgres',
      url: settings.dbTestUrl,
      entities: ['src/**/*.entity.ts'],
      logging: false,
      dropSchema: true, // isolate each test case
      synchronize: true,
    })
  })

  afterEach(async () => {
    await connection.close()
  })

  it('should have an id field of type number', async () => {
    const scheduledMessage: ScheduledMessage = await ScheduledMessage.create(testEntity).save()
    expect(scheduledMessage).toHaveProperty('id')
    expect(typeof scheduledMessage.id).toBe('number')
  })

  it('should have a createdAt field of type date', async () => {
    const scheduledMessage: ScheduledMessage = await ScheduledMessage.create(testEntity).save()
    expect(scheduledMessage).toHaveProperty('createdAt')
    expect(typeof scheduledMessage.createdAt.getMonth).toBe('function')
  })

  it('should have an updatedAt field of type date', async () => {
    const scheduledMessage: ScheduledMessage = await ScheduledMessage.create(testEntity).save()
    expect(scheduledMessage).toHaveProperty('createdAt')
    expect(typeof scheduledMessage.createdAt.getMonth).toBe('function')
  })
})
