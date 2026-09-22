import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({
	name: "iam_org_roles",
})
export class OrganizationRole {
	@PrimaryColumn({ type: "text" })
	id: string;
	@Column({ type: "text" })
	@Index()
	organizationId: string;
	@Column()
	role: string;
	@Column()
	permission: string;
	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz", nullable: true })
	updatedAt: Date;
}
