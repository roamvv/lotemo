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
	name: "ag_property_prices",
})
// "Current price for this property" = the newest row by createdAt — this
// composite index makes that a fast index-only scan instead of a per-row
// filter.
@Index(["propertyId", "createdAt"])
export class PropertyPrice {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	// Denormalized from property.agencyId for reporting without a join;
	// indexed column only, no relation.
	@Column({ type: "bigint", unsigned: true })
	@Index()
	agencyId: number;
	// iam_users — indexed column, no relation (see agencies.ts note).
	@Column({ type: "text" })
	postedById: string;
	@Column({ type: "bigint", unsigned: true })
	propertyId: number;
	@ManyToOne(
		() => Property,
		(property) => property.prices,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "propertyId" })
	property: Relation<Property>;
	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	prevPriceId: number | null;
	@ManyToOne(() => PropertyPrice, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "prevPriceId" })
	prevPrice: Relation<PropertyPrice> | null;
	@Column({ type: "text", default: "USD" })
	currency: string;
	@Column({ type: "boolean", default: false })
	isNegotiable: boolean;
	@Column({ type: "decimal", precision: 14, scale: 2 })
	totalAmount: number;
	@Column({
		type: "enum",
		enum: ["TOTAL", "PER_SQM", "RENT"],
		default: "TOTAL",
	})
	pricingType: "TOTAL" | "PER_SQM" | "RENT";
	@Column({ type: "decimal", precision: 14, scale: 2, nullable: true })
	pricePerSqm: number | null;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
