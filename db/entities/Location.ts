import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const locationClasses = [
  'COUNTRY',
  'REGION',
  'PROVINCE',
  'CITY',
  'BARANGAY',
] as const

@Entity({
  name: 'locations', 
})
export class Location {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  parentId: number | null
  @Column({ type: 'enum', enum: locationClasses })
  class: typeof locationClasses[number]
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  gcsId: string | null
  @Column({ type: 'boolean', default: true })
  isActive: boolean
}