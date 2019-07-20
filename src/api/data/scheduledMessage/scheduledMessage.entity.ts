import { Column, Entity } from 'typeorm'
import { AltamirEntity } from '../_helpers/base.entity'

@Entity({ name: 'scheduledMessages' })
export class ScheduledMessage extends AltamirEntity {
  @Column({ nullable: true })
  public body: string

  @Column({type: 'timestamptz', nullable: false})
  public scheduledTime: Date

  @Column({nullable: false})
  public token: string

  @Column({nullable: false})
  public recipientEmail: string

  @Column()
  public recipientName: string

  @Column({type: 'timestamptz', nullable: true})
  public sentTime: Date
}
