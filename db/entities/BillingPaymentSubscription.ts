import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export const subscritionStatuses = [
  'TRIAL',
  'ACTIVE',
  'PAST_DUE',
  'CANCEL',
  'EXPIRE',
] as const

export const subscriptionBillingCycles = [
  'MONTHLY',
  'ANNUAL',
] as const

@Entity({
  name: 'biz_payment_subscriptions',
})
export class PaymentSubscription {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  agencyId: number
  @Column({ type: 'bigint', unsigned: true })
  planId: number
  @Column({ type: 'enum', enum: subscritionStatuses })
  status: typeof subscritionStatuses[number]
  @Column({ type: 'enum', enum: subscriptionBillingCycles })
  billingCycle: typeof subscriptionBillingCycles[number]
  @Column({ type: 'timestamptz', nullable: true })
  currentPeriodStartsAt: Date
  @Column({ type: 'timestamptz', nullable: true })
  currentPeriodEndsAt: Date
  @Column({ type: 'timestamptz', nullable: true })
  cancelledAt: Date  
  @Column({ type: 'timestamptz', nullable: true })
  trialEndsAt: Date
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
  @Column({ type: 'json', nullable: true })
  subscriptionHistory: PaymentSubscription[]
}