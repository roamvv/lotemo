import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

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
	agencyId: number;
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
	locationId: number;
	@Column({ type: "text" })
	address: string;
	@Column({ type: "jsonb" })
	contacts: OfficeContact[];

	@CreateDateColumn({ type: "timestamptz" })
	createdAt: Date;
	@UpdateDateColumn({ type: "timestamptz" })
	updatedAt: Date;
}
