import { Entity, PrimaryGeneratedColumn } from 'typeorm';



@Entity({
  name: 'notifications',
})
export class Notification {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}
