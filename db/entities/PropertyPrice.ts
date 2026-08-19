import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'ag_property_prices',
})
export class PropertyPrice {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  agencyId: number
  @Column({ type: 'text' })
  postedById: string
  @Column({ type: 'bigint', unsigned: true })
  propertyId: number
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  prevPriceId: number | null
  @Column({ type: 'text', default: 'USD' })
  currency: string
  @Column({ type: 'boolean', default: false })
  isNegotiable: boolean
  @Column({ type: 'decimal', precision: 14, scale: 2 })
  totalAmount: number
  @Column({ type: 'enum', enum: ['TOTAL', 'PER_SQM', 'RENT'], default: 'TOTAL' })
  pricingType: 'TOTAL' | 'PER_SQM' | 'RENT'
  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  pricePerSqm: number | null
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}