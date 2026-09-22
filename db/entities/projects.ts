import {
	Column,
	CreateDateColumn,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	type Relation,
	UpdateDateColumn,
} from "typeorm";

import { Agency } from "./agencies";
import { Location } from "./locations";
import { ProjectUnitType } from "./project-unit-types";

export const projectTypes = [
	"CONDOMINIUM",
	"SUBDIVISION",
	"TOWNHOUSE",
	"MIXED_USE",
	"COMMERCIAL_PARK",
] as const;

export const projectStatuses = ["PRE_SELLING", "RFO", "MIXED"] as const;

@Entity({
	name: "ag_projects",
})
// Project directory / search: filter by type + status, scoped to a city.
@Index(["city", "projectType", "status"])
export class Project {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text", unique: true })
	slug: string;
	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	developerAgencyId: number | null;
	@ManyToOne(() => Agency, { nullable: true, onDelete: "SET NULL" })
	@JoinColumn({ name: "developerAgencyId" })
	developerAgency: Relation<Agency> | null;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "text", nullable: true })
	description: string | null;
	@Column({ type: "enum", enum: projectTypes })
	projectType: (typeof projectTypes)[number];
	@Column({ type: "enum", enum: projectStatuses, default: "MIXED" })
	status: (typeof projectStatuses)[number];

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
	country: string;
	@Column({ type: "text", nullable: true })
	region: string | null;
	@Column({ type: "text" })
	state: string;
	@Column({ type: "text", nullable: true })
	barangay: string | null;
	@Column({ type: "text" })
	@Index()
	city: string;
	@Column({ type: "text", nullable: true })
	postalCode: string | null;
	@Column({ type: "text" })
	address: string;

	@Column({ type: "text", nullable: true })
	coverUrl: string | null;
	@Column({ type: "int", nullable: true })
	totalUnitsCount: number | null;
	@Column({ type: "int", default: 0 })
	viewsCount: number;

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;

	@OneToMany(
		() => ProjectUnitType,
		(unitType) => unitType.project,
	)
	unitTypes: Relation<ProjectUnitType>[];
}
