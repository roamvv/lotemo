import { Entity, PrimaryGeneratedColumn } from 'typeorm'



@Entity({
  name: 'biz_coupons',
})
export class Coupon {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
}