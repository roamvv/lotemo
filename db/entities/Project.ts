import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export const projectTypes = [
  'CONDOMINIUM',
  'SUBDIVISION',
  'TOWNHOUSE',
  'MIXED_USE',
  'COMMERCIAL_PARK',
] as const

export const projectStatuses = [
  'PRE_SELLING',
  'RFO',
  'MIXED',
] as const

@Entity({
  name: 'ag_projects',
})
export class Project {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text', unique: true })
  slug: string
  @Column({ type: 'bigint', unsigned: true, nullable: true })
  developerAgencyId: number | null
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text', nullable: true })
  description: string | null
  @Column({ type: 'enum', enum: projectTypes })
  projectType: typeof projectTypes[number]
  @Column({ type: 'enum', enum: projectStatuses, default: 'MIXED' })
  status: typeof projectStatuses[number]

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
  @Column({ type: 'text', nullable: true })
  postalCode: string | null
  @Column({ type: 'text' })
  address: string

  @Column({ type: 'text', nullable: true })
  coverUrl: string | null
  @Column({ type: 'int', nullable: true })
  totalUnitsCount: number | null
  @Column({ type: 'int', default: 0 })
  viewsCount: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}
