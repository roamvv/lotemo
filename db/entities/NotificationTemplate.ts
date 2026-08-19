import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'notification_templates',
})
export class NotificationTemplate {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
} 