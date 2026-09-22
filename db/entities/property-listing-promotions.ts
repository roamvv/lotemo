import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from "typeorm";

import { Property } from "./properties";

@Entity({
	name: "ag_prop_listing_promotions",
})
// "Is this property currently boosted" and "which promotions are ending
// soon" both filter on the window scoped to a property.
@Index(["propertyId", "startsAt", "endsAt"])
export class PropertyListingPromotion {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	propertyId: number;
	@ManyToOne(
		() => Property,
		(property) => property.promotions,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "propertyId" })
	property: Relation<Property>;
	@Column({ type: "timestamptz" })
	startsAt: Date;
	@Column({ type: "timestamptz" })
	endsAt: Date;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
