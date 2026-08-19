import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'mod_actions',
})
export class ModerationAction {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}