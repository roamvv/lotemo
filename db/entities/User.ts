
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'iam_users',
})
export class User {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text', unique: true })
  email: string
  @Column({ name: 'email_verified', type: 'boolean', default: false })
  emailVerified: boolean
  @Column({ type: 'text', nullable: true })
  image: string | null
  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: 'user' | 'admin' | null
  @Column({ type: 'boolean', default: false })
  banned: boolean | null
  @Column({ type: 'text', nullable: true })
  banReason: string | null
  @Column({ type: 'timestamptz', nullable: true })
  banExpires: Date | null
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}