import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';




@Entity({
  name: 'ag_prop_collection_items',
})
export class PropertyCollectionItem {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number
  @Column({ type: 'bigint', unsigned: true })
  collectionId: number
  @Column({ type: 'int' })
  sort: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date
}


