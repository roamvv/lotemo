import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

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
export class AgencyMember {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text" })
	organizationId: string;
	@Column({ type: "bigint", unsigned: true })
	agencyId: number;
	@Column({ type: "text" })
	userId: string;
	@Column({ type: "text" })
	fullName: string;
	@Column({ type: "text" })
	licenseId: string;
	@Column({ type: "enum", enum: agencyMemberRoles })
	role: (typeof agencyMemberRoles)[number];

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
