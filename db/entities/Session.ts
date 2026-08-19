import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'iam_sessions',
})
export class Session {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text', unique: true })
  token: string
  @Column({ type: 'text' })
  userId: string
  @Column({ type: 'text', nullable: true })
  activeOrganizationId: string | null
  @Column({ type: 'text', nullable: true })
  activeTeamId: string | null
  @Column({ type: 'text', nullable: true })
  impersonatedBy: string | null
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date   
}