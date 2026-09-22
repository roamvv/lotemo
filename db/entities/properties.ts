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

import { Agency } from "./agencies";
import { Location } from "./locations";
import { Project } from "./projects";
import { PropertyCollection } from "./property-collections";
import { PropertyFeatureList } from "./property-feature-lists";
import { PropertyListingPromotion } from "./property-listing-promotions";
import { PropertyMedia } from "./property-medias";
import { PropertyPrice } from "./property-prices";

export const propertyTypes = [
	"FARM",
	"LAND",
	"HOUSE",
	"CONDO",
	"APARTMENT",
	"TOWNHOUSE",
	"WAREHOUSE",
	"OFFICE",
	"COMMERCIAL",
	"CONDOTEL",
] as const;

export const propertyStatuses = [
	"DRAFT",
	"AVAILABLE",
	"RESERVED",
	"SOLD",
	"RENTED",
] as const;

export const propertyFurnishings = [
	"UNFURNISHED",
	"SEMI_FURNISHED",
	"FULLY_FURNISHED",
] as const;

export const propertyVerificationStatuses = [
	"UNVERIFIED",
	"PARTIAL",
	"FULLY_VERIFIED",
] as const;

@Entity({
	name: "ag_properties",
})
// The core listing-search filter bar: status + type, scoped to a city,
// newest first. Covers the "AVAILABLE houses in Legazpi" style query without
// a sort/filesort step.
@Index(["city", "propertyType", "propertyStatus", "createdAt"])
// Bedroom/bathroom range filters, applied after the index above narrows the
// row set.
@Index(["propertyStatus", "bedroomCount", "bathroomCount"])
export class Property {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text", unique: true })
	propId: string;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	collectionId: number;
	@ManyToOne(() => PropertyCollection, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "collectionId" })
	collection: Relation<PropertyCollection>;
	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	projectId: number | null;
	@ManyToOne(() => Project, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "projectId" })
	project: Relation<Project> | null;
	@Column({ type: "int" })
	sort: number;
	@Column({ type: "text", unique: true })
	slug: string;
	// iam_users — indexed column, no relation (see agencies.ts note).
	@Column({ type: "text" })
	@Index()
	postedById: string;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	agencyId: number;
	@ManyToOne(() => Agency, { onDelete: "CASCADE" })
	@JoinColumn({ name: "agencyId" })
	agency: Relation<Agency>;
	@Column({ type: "text" })
	title: string;
	@Column({ type: "text" })
	description: string;
	@Column({ type: "enum", enum: propertyTypes, default: "LAND" })
	propertyType: (typeof propertyTypes)[number];
	@Column({ type: "enum", enum: propertyStatuses, default: "AVAILABLE" })
	propertyStatus: (typeof propertyStatuses)[number];
	@Column({ type: "text", nullable: true })
	propertySubtype: string | null;
	@Column({ type: "enum", enum: propertyFurnishings, nullable: true })
	furnishing: (typeof propertyFurnishings)[number] | null;
	@Column({
		type: "enum",
		enum: propertyVerificationStatuses,
		default: "UNVERIFIED",
	})
	verificationStatus: (typeof propertyVerificationStatuses)[number];

	// Point geometry (lng/lat) for map bounds / "near me" search. GiST index
	// added in the migration.
	@Column({
		type: "geometry",
		spatialFeatureType: "Point",
		srid: 4326,
		nullable: true,
	})
	gcsId: string | null;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	locationId: number;
	@ManyToOne(() => Location, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "locationId" })
	location: Relation<Location>;
	@Column({ type: "text" })
	country: string;
	@Column({ type: "text", nullable: true })
	region: string | null;
	@Column({ type: "text" })
	state: string;
	@Column({ type: "text", nullable: true })
	barangay: string | null;
	@Column({ type: "text" })
	city: string;
	@Column({ type: "text" })
	postalCode: string;
	@Column({ type: "text" })
	address: string;

	@Column({ type: "int", nullable: true })
	bedroomCount: number | null;
	@Column({ type: "int", nullable: true })
	bathroomCount: number | null;
	// FIXED: was declared nullable in the TS type but the column decorator
	// was missing `nullable: true`, which would have made every insert
	// without a value fail at the DB level.
	@Column({ type: "int", nullable: true })
	parkingSpacesCount: number | null;

	@Column({ type: "decimal", nullable: true })
	floorAreaSqm: number | null;
	@Column({ type: "decimal", nullable: true })
	lotAreaSqm: number | null;

	@Column({ type: "int", default: 0 })
	viewsCount: number;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;

	@OneToMany(
		() => PropertyPrice,
		(price) => price.property,
	)
	prices: Relation<PropertyPrice>[];
	@OneToMany(
		() => PropertyMedia,
		(media) => media.property,
	)
	media: Relation<PropertyMedia>[];
	@OneToMany(
		() => PropertyFeatureList,
		(feature) => feature.property,
	)
	features: Relation<PropertyFeatureList>[];
	@OneToMany(
		() => PropertyListingPromotion,
		(promo) => promo.property,
	)
	promotions: Relation<PropertyListingPromotion>[];
}
