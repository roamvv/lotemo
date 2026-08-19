import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'notification_preferences',
})
export class NotificationPreference {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}