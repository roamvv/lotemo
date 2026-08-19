import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export type AgencySocialLink = {
  memberId: number
  social: 'FACEBOOK' | 'INSTAGRAM' | 'LINKEDIN' | 'OTHER'
  url: string
  addedAt: Date
}

@Entity({
  name: 'agencies',
})
export class Agency {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text', unique: true })
  slug: string
  @Column({ type: 'text' })
  ownerId: string
  @Column({ type: 'bigint', unsigned: true })
  planId: number
  @Column({ type: 'text' })
  organizationId: string
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'text', nullable: true })
  profileUrl: string | null
  @Column({ type: 'text', nullable: true })
  coverUrl: string | null
  @Column({ type: 'enum', enum: ['UNVERIFY', 'PARTIAL', 'FULL_VERIFY'], default: 'UNVERIFY' })
  verification: 'UNVERIFY' | 'PARTIAL' | 'FULL_VERIFY'
  @Column({ type: 'boolean', default: false })
  isDeveloper: boolean
  @Column({ type: 'text', nullable: true })
  bio: string | null
  @Column({ type: 'text' })
  websiteUrl: string | null
  @Column({ type: 'jsonb', nullable: true })
  socialLinks: AgencySocialLink[] | null 
  @Column({ type: 'int', default: 0 })
  viewsCount: number
  @Column({ type: 'int', default: 0 })
  activeListingCount: number
  @Column({ type: 'int', default: 0 })
  totalClosedTransactionCount: number
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}