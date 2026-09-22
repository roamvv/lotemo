import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	type Relation,
} from "typeorm";

export const locationClasses = [
	"COUNTRY",
	"REGION",
	"PROVINCE",
	"CITY",
	"BARANGAY",
] as const;

@Entity({
	name: "locations",
})
@Index(["parentId", "class"])
@Index(["name", "isActive"])
export class Location {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;

	@Column({ type: "bigint", unsigned: true, nullable: true })
	@Index()
	parentId: number | null;
	@ManyToOne(
		() => Location,
		(location) => location.children,
		{
			nullable: true,
			onDelete: "RESTRICT",
		},
	)
	@JoinColumn({ name: "parentId" })
	parent: Relation<Location> | null;
	@OneToMany(
		() => Location,
		(location) => location.parent,
	)
	children: Relation<Location>[];

	@Column({ type: "enum", enum: locationClasses })
	class: (typeof locationClasses)[number];
	@Column({ type: "text" })
	name: string;
	// Point geometry (lng/lat). GiST index (`USING GIST (gcsId)`) is added in
	// the migration — TypeORM's spatial index flag targets MySQL, not Postgres.
	@Column({
		type: "geometry",
		spatialFeatureType: "Point",
		srid: 4326,
		nullable: true,
	})
	gcsId: string | null;
	@Column({ type: "boolean", default: true })
	@Index()
	isActive: boolean;
}
