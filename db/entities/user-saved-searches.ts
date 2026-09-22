import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
	name: "user_saved_searches",
})
export class UserSavedSearch {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	// iam_users — indexed column, no relation (see agencies.ts note).
	// Nullable: an anonymous visitor (see isAnonymous) can save a search
	// tracked only by fingerprint.
	@Column({ type: "text", nullable: true })
	@Index()
	userId: string | null;
	@Column({ type: "text", nullable: true })
	name: string | null;
	@Column({ type: "text", unique: true })
	fingerprint: string;
	@Column({ type: "text" })
	ipAddress: string;
	@Column({ type: "text" })
	userAgent: string;
	@Column({ type: "text" })
	search: string;
	@Column({ type: "boolean" })
	isExplicit: boolean;
	@Column({ type: "boolean" })
	isAuto: boolean;
	@Column({ type: "boolean" })
	isAnonymous: boolean;
	@Column({ type: "jsonb" })
	filters: object;
	// Saved-search alert worker scans for due notifications by this column.
	@Column({ type: "timestamptz" })
	@Index()
	lastNotifiedAt: Date;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
}
