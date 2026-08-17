import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({
  name: 'organizations',
})
export class Organization {
  @PrimaryColumn({ type: 'text' })
  id: string
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text', unique: true })
  slug: string
  @Column({ type: 'text', nullable: true })
  logo: string | null
  @Column({ type: 'text', nullable: true })
  metadata: string | null
  @Column({ type: 'timestamp with local time zone' })
  createdAt: Date
}