import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'mod_reports',
})
export class ModerationReport {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}

