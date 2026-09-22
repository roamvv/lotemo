import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({
	name: "iam_org_invitations",
})
export class OrganizationInvitation {
	@PrimaryColumn({ type: "text" })
	id: string;
	@Column({ type: "text" })
	email: string;
	@Column({ type: "text" })
	@Index()
	organizationId: string;
	@Column({ type: "text", nullable: true })
	role: string | null;
	@Column({
		type: "enum",
		enum: ["pending", "accepted", "rejected", "cancelled"],
		default: "pending",
	})
	status: "pending" | "accepted" | "rejected" | "cancelled";
	@Column({ type: "text", nullable: true })
	invitedBy: string;
	@Column({ type: "timestamptz" })
	createdAt: Date;
	@Column({ type: "timestamptz" })
	expiresAt: Date;
	@Column({ type: "text" })
	inviterId: string;

}
