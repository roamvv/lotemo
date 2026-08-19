import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export const contactSources = [
  'WEBSITE',
  'WHATSAPP',
  'MESSENGER',
  'VIBER',
  'PHONE',
  'EMAIL',
  'OTHER',
] as const

export const contactStatuses = [
  'NEW',
  'CONTACT',
  'QUALIFY',
  'CLOSED',
  'LOST',
  'CUSTOM',
] as const

@Entity({
  name: 'ag_contacts',
})
export class Contact {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  agencyId: number
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text' })
  email: string
  @Column({ type: 'text', nullable: true })
  phone: string | null
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  assignedMemberId: number | null
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}