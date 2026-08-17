import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'verifications',
})
export class Verification {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column()
  identifier: string
  @Column()
  value: string
  @Column({ type: 'timestamp with local time zone' })
  expiresAt: Date
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date
}