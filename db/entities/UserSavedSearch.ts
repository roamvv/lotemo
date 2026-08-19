import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user_saved_searches',
})
export class UserSavedSearch {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text', nullable: true })
  userId: string
  @Column({ type: 'text', nullable: true })
  name: string | null
  @Column({ type: 'text', unique: true })
  fingerprint: string
  @Column({ type: 'text' })
  ipAddress: string
  @Column({ type: 'text' })
  userAgent: string
  @Column({ type: 'text' })
  search: string
  @Column({ type: 'boolean' })
  isExplicit: boolean
  @Column({ type: 'boolean' })
  isAuto: boolean
  @Column({ type: 'boolean' })
  isAnonymous: boolean
  @Column({ type: 'jsonb' })
  filters: any
  @Column({ type: 'timestamptz' })
  lastNotifiedAt: Date
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}