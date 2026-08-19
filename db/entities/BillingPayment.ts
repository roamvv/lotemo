import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export const paymentStatuses = [
  'PENDING',
  'SUCCEED',
  'FAIL',
  'REFUND',
  'CANCEL',
] as const

export const paymentProviders = [
  'PAYPAL',
  'STRIPE',
  'PAYMONGO',
  'GCASH',
  'MANUAL',
  'OTHER',
] as const

export const paymentPurposes = [
  'CHARGE',
  'PURCHASE',
  'REFUND',
] as const

@Entity({
  name: 'biz_payments',
})
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true }) 
  agencyId: number
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  subscriptionId: number
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  promotionId: number 
  @Column({ type: 'text' })
  currency: string
  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: number
  @Column({ type: 'enum', enum: paymentPurposes })
  purpose: typeof paymentPurposes[number]
  @Column({ type: 'enum', enum: paymentStatuses })
  status: typeof paymentStatuses[number]
  @Column({ type: 'enum', enum: paymentProviders })
  provider: typeof paymentProviders[number]
  @Column({ type: 'text', unique: true, nullable: true })
  providerRef: string | null
  @Column({ type: 'text', nullable: true })
  paymentMethod: string | null
  @Column({ type: 'text', nullable: true })
  failureReason: string | null
  @Column({ type: 'timestamptz', nullable: true })
  paidAt: Date | null
  @Column({ type: 'timestamptz', nullable: true })
  refundedAt: Date | null
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
