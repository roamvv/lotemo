import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from "typeorm";

import { AgencyMember } from "./agency-members";
import { PropertyCollectionItem } from "./property-collection-items";

@Entity({
	name: "ag_prop_collections",
})
export class PropertyCollection {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	memberId: number;
	@ManyToOne(() => AgencyMember, { onDelete: "CASCADE" })
	@JoinColumn({ name: "memberId" })
	member: Relation<AgencyMember>;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "text" })
	description: string;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;

	@OneToMany(
		() => PropertyCollectionItem,
		(item) => item.collection,
	)
	items: Relation<PropertyCollectionItem>[];
}
