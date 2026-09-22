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
	name: "user_saved_properties",
})
// A user can save a given property only once; also serves "did I already
// save this" checks and "my saved properties" listings.
@Index(["userId", "propertyId"], { unique: true })
export class UserSavedProperty {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	propertyId: number;
	@ManyToOne(() => Property, { onDelete: "CASCADE" })
	@JoinColumn({ name: "propertyId" })
	property: Relation<Property>;
	// iam_users — indexed column, no relation (see agencies.ts note).
	@Column({ type: "text" })
	userId: string;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
