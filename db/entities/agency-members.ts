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

export const agencyMemberRoles = [
	"NO_ROLE",
	"ADMIN",
	"AGENT",
	"MANAGER",
] as const;

export const agencyMemberStatuses = ["ACTIVE", "SUSPEND", "INVITE"] as const;

@Entity({
	name: "ag_members",
})
// "Is this user a member of this agency" is the most common lookup (auth
// checks, invite flows) — one member row per user per agency.
@Index(["agencyId", "userId"], { unique: true })
export class AgencyMember {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text" })
	@Index()
	organizationId: string;
	@Column({ type: "bigint", unsigned: true })
	agencyId: number;
	@ManyToOne(
		() => Agency,
		(agency) => agency.members,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "agencyId" })
	agency: Relation<Agency>;
	// iam_users is managed by the auth library — indexed column, no relation.
	@Column({ type: "text" })
	@Index()
	userId: string;
	@Column({ type: "text" })
	fullName: string;
	@Column({ type: "text" })
	@Index()
	licenseId: string;
	@Column({ type: "enum", enum: agencyMemberRoles })
	role: (typeof agencyMemberRoles)[number];
	@Column({
		type: "enum",
		enum: agencyMemberStatuses,
		default: "INVITE",
	})
	@Index()
	status: (typeof agencyMemberStatuses)[number];

	@Column({ type: "text", nullable: true })
	avatarUrl: string | null;
	@Column({ type: "text", nullable: true })
	bio: string | null;
	@Column({ type: "text", nullable: true })
	whatsappNumber: string | null;
	@Column({ type: "timestamptz", nullable: true })
	lastActiveAt: Date | null;
	@Column({ type: "int", default: 0 })
	activeListingCount: number;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
