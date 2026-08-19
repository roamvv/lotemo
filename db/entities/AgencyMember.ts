import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export const agencyMemberRoles = [
  'NO_ROLE',
  'ADMIN',
  'AGENT',
  'MANAGER',
] as const

export const agencyMemberStatuses = [
  'ACTIVE',
  'SUSPEND',
  'INVITE',
] as const

@Entity({
  name: 'ag_members',
})
export class AgencyMember {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text' })
  organizationId: string
  @Column({ type: 'bigint', unsigned: true })
  agencyId: number
  @Column({ type: 'text' })
  userId: string
  @Column({ type: 'text' })
  fullName: string
  @Column({ type: 'text' })
  licenseId: string
  @Column({ type: 'enum', enum: agencyMemberRoles })
  role: typeof agencyMemberRoles[number]

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}