import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	type Relation,
} from "typeorm";

import { Agency } from "./agencies";
import { Location } from "./locations";

@Entity({
	name: "ag_service_areas",
})
export class AgencyServiceArea {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	agencyId: number;
	@ManyToOne(
		() => Agency,
		(agency) => agency.serviceAreas,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "agencyId" })
	agency: Relation<Agency>;
	@Column({ type: "text" })
	areaName: string;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	locationId: number;
	@ManyToOne(() => Location, { onDelete: "RESTRICT" })
	@JoinColumn({ name: "locationId" })
	location: Relation<Location>;
	@Column({
		type: "geometry",
		spatialFeatureType: "Point",
		srid: 4326,
		nullable: true,
	})
	gcsId: string | null;
	@Column({ type: "text" })
	country: string;
	@Column({ type: "text", nullable: true })
	region: string | null;
	@Column({ type: "text" })
	state: string;
	@Column({ type: "text", nullable: true })
	barangay: string | null;
	@Column({ type: "text" })
	city: string;
	@Column({ type: "text" })
	postalCode: string;
	@Column({ type: "text" })
	address: string;
	@Column({ type: "int", default: 10 })
	radiusKm: number;
}
