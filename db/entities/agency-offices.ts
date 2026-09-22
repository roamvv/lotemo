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
import { Location } from "./locations";

export const officeTypes = ["HEAD", "BRANCH"] as const;

export type OfficeContact = {
	name: string;
	phone: string | null;
};

@Entity({
	name: "ag_offices",
})
export class Office {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	agencyId: number;
	@ManyToOne(
		() => Agency,
		(agency) => agency.offices,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "agencyId" })
	agency: Relation<Agency>;
	@Column({ type: "text", unique: true })
	slug: string;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "enum", enum: officeTypes, default: "BRANCH" })
	type: (typeof officeTypes)[number];
	@Column({ type: "text", nullable: true })
	coverUrl: string | null;

	@Column({
		type: "geometry",
		spatialFeatureType: "Point",
		srid: 4326,
		nullable: true,
	})
	gcsId: string | null;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	locationId: number;
	@ManyToOne(() => Location, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "locationId" })
	location: Relation<Location>;
	@Column({ type: "text" })
	address: string;
	@Column({ type: "jsonb" })
	contacts: OfficeContact[];

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
