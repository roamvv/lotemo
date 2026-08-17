import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'property_images',
})
export class PropertyImage {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'int' })
  sort: number
  @Column({ type: 'bigint', unsigned: true })
  propertyId: number
  @Column({ type: 'text' })
  url: string
  @Column({ type: 'enum', enum: ['photo', 'floor_plan', 'virtual_tour_360', 'video'] })
  mediaType: 'photo' | 'floor_plan' | 'virtual_tour_360' | 'video'
}