import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'ag_service_areas',
})
export class AgencyServiceArea {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  agencyId: number
  @Column({ type: 'text' })
  areaName: string
  @Column({ type: 'bigint', unsigned: true })
  locationId: number
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  gcsId: string | null
  @Column({ type: 'text' })
  country: string
  @Column({ type: 'text', nullable: true })
  region: string | null
  @Column({ type: 'text' })
  state: string
  @Column({ type: 'text', nullable: true })
  barangay: string | null
  @Column({ type: 'text' })
  city: string
  @Column({ type: 'text' })
  postalCode: string
  @Column({ type: 'text' })
  address: string
  @Column({ type: 'int', default: 10 })
  radiusKm: number
}