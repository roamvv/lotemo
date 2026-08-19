import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'ag_prop_listing_promotions',
})
export class PropertyListingPromotion {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  propertyId: number
  @Column({ type: 'timestamptz' })
  startsAt: Date
  @Column({ type: 'timestamptz' })
  endsAt: Date
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}