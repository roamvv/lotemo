import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export const reviewClasses = [
  'AGENCY',
  'PROPERTY',
] as const

export const reviewStatuses = [
  'PUBLISH',
  'FLAG',
  'REMOVE',
] as const

@Entity({
  name: 'ag_reviews',
})
export class AgencyReview {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  agencyId: number
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  propertyId: number
  @Column({ type: 'boolean' })
  isAnonymous: boolean
  @Column({ type: 'text', nullable: true })
  reviewerId: string | null
  @Column({ type: 'text' })
  fullName: string
  @Column({ type: 'int' })
  rating: number
  @Column({ type: 'text' })
  comment: string
  @Column({ type: 'enum', enum: reviewClasses })
  class: typeof reviewClasses[number]
  @Column({ type: 'enum', enum: reviewStatuses })
  status: typeof reviewStatuses[number]
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}