
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user_saved_properties',
})
export class UserSavedProperty {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  propertyId: number
  @Column({ type: 'text' })
  userId: string
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}