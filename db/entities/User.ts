
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'users',
})
export class User {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text' })
  email: string
  @Column({ name: 'email_verified', type: 'boolean' })
  emailVerified: boolean
  @Column({ type: 'text', nullable: true })
  image: string | null
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with local time zone' })
  updatedAt: Date
}