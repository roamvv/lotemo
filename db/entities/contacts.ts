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
import { Agency } from "./agencies";
import { AgencyMember } from "./agency-members";

export const contactSources = [
	"WEBSITE",
	"WHATSAPP",
	"MESSENGER",
	"VIBER",
	"PHONE",
	"EMAIL",
	"OTHER",
] as const;

export const contactStatuses = [
	"NEW",
	"CONTACT",
	"QUALIFY",
	"CLOSED",
	"LOST",
	"CUSTOM",
] as const;

@Entity({
	name: "ag_contacts",
})
// CRM board view: an agency's contacts grouped by pipeline stage.
@Index(["agencyId", "assignedMemberId"])
export class Contact {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	agencyId: number;
	@ManyToOne(() => Agency, { onDelete: "CASCADE" })
	@JoinColumn({ name: "agencyId" })
	agency: Relation<Agency>;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "text" })
	@Index()
	email: string;
	@Column({ type: "text", nullable: true })
	phone: string | null;
	@Column({ type: "bigint", unsigned: true, nullable: true })
	assignedMemberId: number | null;
	@ManyToOne(() => AgencyMember, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "assignedMemberId" })
	assignedMember: Relation<AgencyMember> | null;
	// FLAGGED FOR REVIEW: added — the route schema expects a `status` filter
	// (contacts.ts query param) but the entity had no column for it. Same gap
	// as AgencyMember.status; check whether `source` (contactSources) is
	// also meant to be a column, since it's exported but unused here too.
	@Column({
		type: "enum",
		enum: contactStatuses,
		default: "NEW",
	})
	@Index()
	status: (typeof contactStatuses)[number];
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
