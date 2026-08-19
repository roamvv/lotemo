import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'ag_contact_inquiries',
})
export class Inquiry {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  contactId: number
  @Column({ type: 'bigint', unsigned: true })
  propertyId: number
  @Column({ type: 'text' })
  conversationId: string
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}