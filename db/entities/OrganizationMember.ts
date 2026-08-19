import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({
  name: 'iam_org_members',
})
export class OrganizationMember {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text' })
  userId: string
  @Column({ type: 'text' })
  organizationId: string
  @Column({ type: 'text' })
  role: string
  @Column({ type: 'timestamptz' })
  createdAt: Date
}