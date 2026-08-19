import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'messages',
})
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text' })
  conversationId: string
  @Column({ type: 'bigint', nullable: true })
  messageId: number | null
  @Column({ type: 'text' })
  senderId: string
  @Column({ type: 'text' })
  receiverId: string
  @Column({ type: 'text' })
  content: string
  @CreateDateColumn({ type: 'timestamptz' })
  sentAt: Date
  @Column({ type: 'timestamptz', nullable: true })
  readAt: Date | null
}