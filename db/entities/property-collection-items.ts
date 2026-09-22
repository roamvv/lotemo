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
import { PropertyCollection } from "./property-collections";

@Entity({
	name: "ag_prop_collection_items",
})
// One property can appear in a given collection only once.
@Index(["collectionId", "propertyId"], { unique: true })
export class PropertyCollectionItem {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	collectionId: number;
	@ManyToOne(
		() => PropertyCollection,
		(collection) => collection.items,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "collectionId" })
	collection: Relation<PropertyCollection>;
	// FLAGGED FOR REVIEW: this column did not exist in the original scaffold
	// — the entity had collectionId + sort only, with nothing to actually
	// join to a property. Added it so this table can serve as the
	// collection<->property join. See chat notes on the overlap with
	// Property.collectionId.
	@Column({ type: "bigint", unsigned: true })
	@Index()
	propertyId: number;
	@ManyToOne(() => Property, { onDelete: "CASCADE" })
	@JoinColumn({ name: "propertyId" })
	property: Relation<Property>;
	@Column({ type: "int" })
	sort: number;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
