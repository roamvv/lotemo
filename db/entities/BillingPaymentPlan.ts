import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const planClasses = [
  'FREE',
  'BASIC',
  'AGENT',
  'PRO',
] as const

export const planTypes = [
  'LISTING_BOOST',
  'BANNER',
  'FEATURED_AGENCY',
  'PROMOTION',
  'SUBSCRIPTION',
] as const

export const planBillingCycles = [
  'LUMP',
  'MONTHLY',
  'ANNUAL',
] as const

@Entity({
  name: 'biz_payment_plans',
})
export class PaymentPlan {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'int' })
  sort: number
  @Column({ type: 'text', unique: true })
  key: string
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text', nullable: true })
  description: string | null
  @Column({ type: 'enum', enum: planClasses })
  class: typeof planClasses[number]
  @Column({ type: 'enum', enum: planTypes })
  type: typeof planTypes[number]
  @Column({ type: 'decimal', precision: 14, scale: 2 })
  price: number
  @Column({ type: 'text' })
  currency: string
  @Column({ type: 'int' })
  durationDays: number
  @Column({ type: 'int', nullable: true })
  leadQuota: number | null
  @Column({ type: 'int', nullable: true })
  listingQuota: number | null
  @Column({ type: 'int', nullable: true })
  collectionQuota: number
  @Column({ type: 'int', nullable: true })
  mediaQuota: number | null
  @Column({ type: 'int', nullable: true })
  memberQuota: number | null
  @Column({ type: 'enum', enum: planBillingCycles })
  billingCycle: typeof planBillingCycles[number]
  @Column({ type: 'boolean' })
  isActive: boolean
}