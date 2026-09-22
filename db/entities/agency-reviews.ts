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

export const reviewClasses = ["AGENCY", "PROPERTY", "AGENT"] as const;

export const reviewStatuses = ["PUBLISH", "FLAG", "REMOVE"] as const;

export const reviewerTypes = ["CLIENT", "AGENT"] as const;

@Entity({
	name: "ag_reviews",
})
// Public review listing for an agency page is always "PUBLISH status,
// newest first" — composite covers that without a filesort.
@Index(["agencyId", "status", "createdAt"])
export class AgencyReview {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	agencyId: number;
	@ManyToOne(
		() => Agency,
		(agency) => agency.reviews,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "agencyId" })
	agency: Relation<Agency>;
	// Reviews of class PROPERTY point here; kept as an indexed column rather
	// than a relation into the properties module (optional, only set for one
	// of three review classes).
	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	propertyId: number | null;
	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	subjectMemberId: number | null;
	@Column({ type: "boolean" })
	isAnonymous: boolean;
	// iam_users — indexed column, no relation (see agencies.ts note).
	@Column({ type: "text", nullable: true })
	reviewerId: string | null;
	@Column({ type: "enum", enum: reviewerTypes, nullable: true })
	reviewerType: (typeof reviewerTypes)[number] | null;
	@Column({ type: "text" })
	fullName: string;
	@Column({ type: "int" })
	rating: number;
	@Column({ type: "text" })
	comment: string;
	@Column({ type: "enum", enum: reviewClasses })
	@Index()
	class: (typeof reviewClasses)[number];
	@Column({ type: "enum", enum: reviewStatuses })
	status: (typeof reviewStatuses)[number];
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
