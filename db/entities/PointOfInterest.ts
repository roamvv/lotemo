import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export const poiCategories = [
  'SCHOOL',
  'CLINIC',
  'HOSPITAL',
  'ATTRACTION',
  'MALL',
  'CHURCH',
  'TRANSIT',
] as const

@Entity({
  name: 'geo_points_of_interest',
})
export class PointOfInterest {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'enum', enum: poiCategories })
  category: typeof poiCategories[number]
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  gcsId: string
  @Column({ type: 'text', nullable: true })
  sourceProvider: string | null
  @Column({ type: 'text', nullable: true })
  sourceId: string | null
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
