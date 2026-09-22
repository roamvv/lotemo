import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({
	name: "iam_org_members",
})
// "Is this user in this org" membership check + org member lists.
@Index(["organizationId", "userId"], { unique: true })
export class OrganizationMember {
	@PrimaryColumn({ type: "text" })
	id: string;
	@Column({ type: "text" })
	userId: string;
	@Column({ type: "text" })
	organizationId: string;
	@Column({ type: "text" })
	role: string;
	@Column({ type: "timestamptz" })
	createdAt: Date;
}
