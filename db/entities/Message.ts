import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'messages',
})
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text', unique: true })
  conversationId: string
  @Column({ type: 'bigint', nullable: true })
  messageId: number | null
  @Column({ type: 'text' })
  senderId: string
  @Column({ type: 'text' })
  receiverId: string
  @Column({ type: 'text' })
  content: string
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  sentAt: Date
  @Column({ type: 'timestamp with local time zone' })
  readAt: Date
}