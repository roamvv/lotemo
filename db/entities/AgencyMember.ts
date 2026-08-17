import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'agency_members',
})
export class AgencyMember {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text' })
  organizationId: string
  @Column({ type: 'text' })
  agencyId: string
  @Column({ type: 'text' })
  userId: string
}