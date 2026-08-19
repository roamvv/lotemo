import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'ag_prop_medias',
})
export class PropertyMedia {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  mediaCollectionId: number
  @Column({ type: 'text' })
  mediaCollectionSlug: string
  @Column({ type: 'int' })
  sort: number
  @Column({ type: 'bigint', unsigned: true })
  propertyId: number
  @Column({ type: 'text' })
  url: string
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text', nullable: true })
  description: string
  @Column({ type: 'text', nullable: true })
  altText: string
  @Column({ type: 'enum', enum: ['photo', 'floor_plan', 'virtual_tour_360', 'video'] })
  mediaType: 'photo' | 'floor_plan' | 'virtual_tour_360' | 'video'
  @Column({ type: 'boolean', default: true })
  isActive: boolean
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}