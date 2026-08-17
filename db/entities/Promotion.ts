import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'promotions',
})
export class Promotion {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text' })
  shortDescription: string
  @CreateDateColumn({ type: 'timestamp with local time zone' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamp with local time zone' })
  updatedAt: Date
}