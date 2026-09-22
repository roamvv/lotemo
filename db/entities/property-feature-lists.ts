import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from "typeorm";

import { Property } from "./properties";

export const propertyFeatureTypes = [
	"BEDS_COUNT",
	"BATHS_COUNT",
	"PARKING_LOTS_COUNT",
	"FLOORS_COUNT",
	"BEDROOMS_FEATURES",
	"BATHROOMS_FEATURES",
	"PARKING_FEATURES",
	"HEATING",
	"COOLING",
	"APPLIANCES",
	"PROPERTY_FEATURES",
	"LOT_FEATURES",
	"FARM_FEATURES",
	"CONSTRUCTION_TYPE_STYLE",
	"CONSTRUCTION_MATERIALS",
	"CONSTRUCTION_CONDITION",
	"UTILITIES_FEATURES",
	"GREEN_ENERGY_FEATURES",
	"FINANCIAL_LISTING_DETAILS",
	"AMENITY_FEATURES",
	"OTHER_FEATURES",
] as const;

@Entity({
	name: "ag_prop_feature_lists",
})
// Property detail page loads every feature row for a listing grouped by
// section.
@Index(["propertyId", "featureType"])
export class PropertyFeatureList {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	propertyId: number;
	@ManyToOne(
		() => Property,
		(property) => property.features,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "propertyId" })
	property: Relation<Property>;
	@Column({
		type: "enum",
		enum: propertyFeatureTypes,
		default: "OTHER_FEATURES",
	})
	featureType: (typeof propertyFeatureTypes)[number];
	@Column({ type: "text", nullable: true })
	name: string | null;
	@Column({ type: "text", nullable: true })
	description: string | null;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
