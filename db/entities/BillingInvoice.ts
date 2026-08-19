import { Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'biz_invoices',
})
export class Invoice {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}