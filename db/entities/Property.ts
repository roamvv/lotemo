import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'properties',
})
export class Property {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text', unique: true })
  propId: string
  @Column({ type: 'text', unique: true })
  slug: string
  @Column({ type: 'text' })
  postedById: string
  @Column({ type: 'bigint' })
  agencyId: number
  @Column({ type: 'text' })
  title: string
  @Column({ type: 'text' })
  description: string
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date
}