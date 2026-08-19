import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'ag_verifications',
})
export class AgencyVerification {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}