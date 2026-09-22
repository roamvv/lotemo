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

import { Contact } from "./contacts";
import { Property } from "./properties";

@Entity({
	name: "ag_contact_inquiries",
})
export class Inquiry {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	contactId: number;
	@ManyToOne(() => Contact, { onDelete: "CASCADE" })
	@JoinColumn({ name: "contactId" })
	contact: Relation<Contact>;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	propertyId: number;
	@ManyToOne(() => Property, { onDelete: "CASCADE" })
	@JoinColumn({ name: "propertyId" })
	property: Relation<Property>;
	@Column({ type: "text" })
	@Index()
	conversationId: string;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
