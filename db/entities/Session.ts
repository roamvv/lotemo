import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

@Entity({
  name: 'sessions',
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
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date   
}