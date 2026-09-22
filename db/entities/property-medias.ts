import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	type Relation,
} from "typeorm";

import { Property } from "./properties";

@Entity({
	name: "ag_prop_medias",
})
// Gallery fetch: all media for a property, ordered by sort; the composite
// covers the query, the trailing sort avoids a separate ORDER BY step.
@Index(["propertyId", "sort"])
export class PropertyMedia {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	mediaCollectionId: number;
	@Column({ type: "text" })
	mediaCollectionSlug: string;
	@Column({ type: "int" })
	sort: number;
	@Column({ type: "bigint", unsigned: true })
	propertyId: number;
	@ManyToOne(
		() => Property,
		(property) => property.media,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "propertyId" })
	property: Relation<Property>;
	@Column({ type: "text" })
	url: string;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "text", nullable: true })
	description: string;
	@Column({ type: "text", nullable: true })
	altText: string;
	@Column({
		type: "enum",
		enum: ["photo", "floor_plan", "virtual_tour_360", "video"],
	})
	mediaType: "photo" | "floor_plan" | "virtual_tour_360" | "video";
	@Column({ type: "boolean", default: true })
	@Index()
	isActive: boolean;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
