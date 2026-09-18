import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'ag_project_unit_types',
})
export class ProjectUnitType {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  projectId: number
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'int', nullable: true })
  bedroomCount: number | null
  @Column({ type: 'int', nullable: true })
  bathroomCount: number | null
  @Column({ type: 'decimal', nullable: true })
  minFloorAreaSqm: number | null
  @Column({ type: 'decimal', nullable: true })
  maxFloorAreaSqm: number | null
}
