import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'iam_verifications',
})
export class Verification {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column()
  identifier: string
  @Column()
  value: string
  @Column({ type: 'timestamptz' })
  expiresAt: Date
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}