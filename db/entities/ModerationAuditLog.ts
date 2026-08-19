import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'mod_audit_logs',
})
export class ModerationAuditLog {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}