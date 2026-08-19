import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'biz_payment_refunds',
})
export class Refund {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}