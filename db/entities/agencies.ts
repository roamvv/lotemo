import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from "typeorm";

import { AgencyMember } from "./agency-members";
import { Office } from "./agency-offices";
import { AgencyReview } from "./agency-reviews";
import { AgencyServiceArea } from "./agency-service-areas";

export type AgencySocialLink = {
	memberId: number;
	social: "FACEBOOK" | "INSTAGRAM" | "LINKEDIN" | "OTHER";
	url: string;
	addedAt: Date;
};

@Entity({
	name: "agencies",
})
export class Agency {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text", unique: true })
	slug: string;
	// Owned by iam_users (better-auth). Left as a plain indexed column rather
	// than a relation — auth tables are managed by the auth library, not this
	// module.
	@Column({ type: "text" })
	@Index()
	ownerId: string;
	// biz_payment_plans lives in the payments module; kept as an indexed FK
	// column rather than a relation to avoid coupling the agencies module to
	// billing internals.
	@Column({ type: "bigint", unsigned: true })
	@Index()
	planId: number;
	@Column({ type: "text" })
	@Index()
	organizationId: string;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "text", nullable: true })
	profileUrl: string | null;
	@Column({ type: "text", nullable: true })
	coverUrl: string | null;
	@Column({
		type: "enum",
		enum: ["UNVERIFY", "PARTIAL", "FULL_VERIFY"],
		default: "UNVERIFY",
	})
	verification: "UNVERIFY" | "PARTIAL" | "FULL_VERIFY";
	@Column({ type: "boolean", default: false })
	@Index()
	isDeveloper: boolean;
	@Column({ type: "text", nullable: true })
	bio: string | null;
	@Column({ type: "text", nullable: true })
	websiteUrl: string | null;
	@Column({ type: "jsonb", nullable: true })
	socialLinks: AgencySocialLink[] | null;
	@Column({ type: "int", default: 0 })
	viewsCount: number;
	@Column({ type: "int", default: 0 })
	activeListingCount: number;
	@Column({ type: "int", default: 0 })
	totalClosedTransactionCount: number;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;

	@OneToMany(
		() => AgencyMember,
		(member) => member.agency,
	)
	members: Relation<AgencyMember>[];
	@OneToMany(
		() => Office,
		(office) => office.agency,
	)
	offices: Relation<Office>[];
	@OneToMany(
		() => AgencyServiceArea,
		(area) => area.agency,
	)
	serviceAreas: Relation<AgencyServiceArea>[];
	@OneToMany(
		() => AgencyReview,
		(review) => review.agency,
	)
	reviews: Relation<AgencyReview>[];
}
