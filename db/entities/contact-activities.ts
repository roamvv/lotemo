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

import { Contact } from "./contacts";

export const contactActivityTypes = [
	"CALL",
	"EMAIL",
	"SHOWING",
	"OFFER",
	"NOTE",
	"STATUS_CHANGE",
] as const;

// FLAGGED FOR REVIEW: contactActivityTypes is exported but no column uses
// it (unlike AgencyMember/Contact, I found no route reference confirming
// the intended column name, so I didn't guess one). Worth checking service
// layer.
@Entity({
	name: "ag_contact_activities",
})
// Contact timeline: all activity for a contact, most recent first.
@Index(["contactId", "occurredAt"])
export class ContactActivity {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text" })
	activityId: string;
	@Column({ type: "bigint", unsigned: true })
	contactId: number;
	@ManyToOne(() => Contact, { onDelete: "CASCADE" })
	@JoinColumn({ name: "contactId" })
	contact: Relation<Contact>;
	@Column({ type: "timestamptz" })
	occurredAt: Date;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
