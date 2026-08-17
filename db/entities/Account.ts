import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'accounts',
})
export class Account {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text' })
  userId: string
  @Column({ type: 'text' })
  accountId: string
  @Column({ type: 'text' })
  providerId: string
  @Column({ type: 'text', nullable: true })
  accessToken: string | null
  @Column({ type: 'text', nullable: true })
  refreshToken: string | null
  @Column({ type: 'timestamp with local time zone', nullable: true })
  accessTokenExpiresAt: Date | null
  @Column({ type: 'timestamp with local time zone', nullable: true })
  refreshTokenExpiresAt: Date | null
  @Column({ type: 'text', nullable: true })
  scope: string | null
  @Column({ type: 'text', nullable: true })
  idToken: string | null
  @Column({ type: 'text', nullable: true })
  password: string | null
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date
}