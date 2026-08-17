import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'organization_roles',
})
export class OrganizationRole {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text' })
  organizationId: string
  @Column()
  role: string
  @Column()
  permission: string
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp with local time zone', nullable: true })
  updatedAt: Date
}