import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({
  name: 'organization_invitations',
})
export class OrganizationInvitation {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text' })
  email: string
  @Column({ type: 'text' })
  organizationId: string
  @Column({ type: 'text', nullable: true })
  role: string | null
  @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected', 'cancelled'], default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled'
  @Column({ type: 'text' })
  invitedBy: string
  @Column({ type: 'timestamp with local time zone' })
  createdAt: Date
}