import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'property_listing_promotions',
})
export class PropertyListingPromotion {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  propertyId: number
  @Column({ type: 'timestamp with local time zone' })
  startsAt: Date
  @Column({ type: 'timestamp with local time zone' })
  endsAt: Date
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date
}