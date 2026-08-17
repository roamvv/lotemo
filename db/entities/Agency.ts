import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'agencies',
})
export class Agency {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'text' })
  ownerId: string
  @Column({ type: 'text' })
  organizationId: string
  @Column({ type: 'text' })
  name: string
}