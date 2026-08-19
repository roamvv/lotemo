import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export const propertyTypes = [
  'FARM',
  'LAND',
  'HOUSE',
  'CONDO',
  'APARTMENT',
  'TOWNHOUSE',
  'WAREHOUSE',
  'OFFICE',
  'COMMERCIAL',
  'CONDOTEL'
] as const

export const propertyStatuses = [
  'DRAFT',
  'AVAILABLE',
  'RESERVED',
  'SOLD',
  'RENTED',
] as const

@Entity({
  name: 'ag_properties',
})
export class Property {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text', unique: true })
  propId: string
  @Column({ type: 'bigint', unsigned: true })
  collectionId: number
  @Column({ type: 'int' })
  sort: number
  @Column({ type: 'text', unique: true })
  slug: string
  @Column({ type: 'text' })
  postedById: string
  @Column({ type: 'bigint', unsigned: true })
  agencyId: number
  @Column({ type: 'text' })
  title: string
  @Column({ type: 'text' })
  description: string 
  @Column({ type: 'enum', enum: propertyTypes, default: 'LAND' })
  propertyType: typeof propertyTypes[number]
  @Column({ type: 'enum', enum: propertyStatuses, default: 'AVAILABLE' })
  propertyStatus: typeof propertyStatuses[number]

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  gcsId: string | null
  @Column({ type: 'bigint', unsigned: true })
  locationId: number
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

  @Column({ type: 'int', nullable: true })
  bedroomCount: number | null
  @Column({ type: 'int', nullable: true })
  bathroomCount: number | null
  @Column({ type: 'int', nullable: true })
  parkingSpacesCount: number

  @Column({ type: 'decimal', nullable: true })
  floorAreaSqm: number | null
  @Column({ type: 'decimal', nullable: true })
  lotAreaSqm: number | null

  @Column({ type: 'int', default: 0 })
  viewsCount: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}