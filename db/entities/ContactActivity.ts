import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const contactActivityTypes = [
  'CALL',
  'EMAIL',
  'SHOWING',
  'OFFER',
  'NOTE',
  'STATUS_CHANGE',
] as const

@Entity({
  name: 'ag_contact_activities',
})
export class ContactActivity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text' })
  activityId: string
  @Column({ type: 'bigint', unsigned: true })
  contactId: number
  @Column({ type: 'timestamptz' })
  occurredAt: Date
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}