import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	type Relation,
} from "typeorm";

import { Project } from "./projects";

@Entity({
	name: "ag_project_unit_types",
})
export class ProjectUnitType {
	@PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
	id: number;
	@Column({ type: "bigint", unsigned: true })
	@Index()
	projectId: number;
	@ManyToOne(
		() => Project,
		(project) => project.unitTypes,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "projectId" })
	project: Relation<Project>;
	@Column({ type: "text" })
	name: string;
	@Column({ type: "int", nullable: true })
	bedroomCount: number | null;
	@Column({ type: "int", nullable: true })
	bathroomCount: number | null;
	@Column({ type: "decimal", nullable: true })
	minFloorAreaSqm: number | null;
	@Column({ type: "decimal", nullable: true })
	maxFloorAreaSqm: number | null;
}
