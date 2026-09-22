import {
	Column,
	Entity,
	Index,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export const poiCategories = [
	"SCHOOL",
	"CLINIC",
	"HOSPITAL",
	"ATTRACTION",
	"MALL",
	"CHURCH",
	"TRANSIT",
] as const;

@Entity({
	name: "geo_points_of_interest",
})
@Index(["sourceProvider", "sourceId"], { unique: true, where: `"source_id" IS NOT NULL` })
export class PointOfInterest {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "enum", enum: poiCategories })
	@Index()
	category: (typeof poiCategories)[number];
	// "Nearby POIs" queries (bounding-box / ST_DWithin against a property or
	// location point) — GiST index added in the migration.
	@Column({ type: "geometry", spatialFeatureType: "Point", srid: 4326 })
	gcsId: string;
	@Column({ type: "text", nullable: true })
	sourceProvider: string | null;
	@Column({ type: "text", nullable: true })
	sourceId: string | null;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
