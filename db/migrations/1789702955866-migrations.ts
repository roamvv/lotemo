import type { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1789702955866 implements MigrationInterface {
	name = "Migrations1789702955866";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."geo_points_of_interest_category_enum" AS ENUM('SCHOOL', 'CLINIC', 'HOSPITAL', 'ATTRACTION', 'MALL', 'CHURCH', 'TRANSIT')`,
		);
		await queryRunner.query(
			`CREATE TABLE "geo_points_of_interest" ("id" BIGSERIAL NOT NULL, "name" text NOT NULL, "category" "public"."geo_points_of_interest_category_enum" NOT NULL, "gcs_id" geometry(Point,4326) NOT NULL, "source_provider" text, "source_id" text, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_02fac250d007a96a5248726907e" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_projects_project_type_enum" AS ENUM('CONDOMINIUM', 'SUBDIVISION', 'TOWNHOUSE', 'MIXED_USE', 'COMMERCIAL_PARK')`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_projects_status_enum" AS ENUM('PRE_SELLING', 'RFO', 'MIXED')`,
		);
		await queryRunner.query(
			`CREATE TABLE "ag_projects" ("id" BIGSERIAL NOT NULL, "slug" text NOT NULL, "developer_agency_id" bigint, "name" text NOT NULL, "description" text, "project_type" "public"."ag_projects_project_type_enum" NOT NULL, "status" "public"."ag_projects_status_enum" NOT NULL DEFAULT 'MIXED', "gcs_id" geometry(Point,4326), "location_id" bigint NOT NULL, "country" text NOT NULL, "region" text, "state" text NOT NULL, "barangay" text, "city" text NOT NULL, "postal_code" text, "address" text NOT NULL, "cover_url" text, "total_units_count" integer, "views_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_1ea984868374dac3c9449a8f116" UNIQUE ("slug"), CONSTRAINT "PK_b4a31c82aaa56d6ce8a435b3147" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_offices_type_enum" AS ENUM('HEADQUARTERS', 'BRANCH')`,
		);
		await queryRunner.query(
			`CREATE TABLE "ag_offices" ("id" BIGSERIAL NOT NULL, "agency_id" bigint NOT NULL, "slug" text NOT NULL, "name" text NOT NULL, "type" "public"."ag_offices_type_enum" NOT NULL DEFAULT 'BRANCH', "cover_url" text, "gcs_id" geometry(Point,4326), "location_id" bigint NOT NULL, "address" text NOT NULL, "contacts" jsonb NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_518475d79e2bd2601001ab80ec3" UNIQUE ("slug"), CONSTRAINT "PK_110ce8b167054dfefbbaea88155" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "ag_project_unit_types" ("id" BIGSERIAL NOT NULL, "project_id" bigint NOT NULL, "name" text NOT NULL, "bedroom_count" integer, "bathroom_count" integer, "min_floor_area_sqm" numeric, "max_floor_area_sqm" numeric, CONSTRAINT "PK_ac75199bc5dbbd0a7ea074e9c67" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "ag_prop_collection_items" ("id" BIGSERIAL NOT NULL, "collection_id" bigint NOT NULL, "sort" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_1309215ac2c21ac32a396a1529d" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" DROP COLUMN "offer_type"`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."ag_properties_offer_type_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" DROP COLUMN "property_category"`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."ag_properties_property_category_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" DROP COLUMN "is_preselling"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_reviews" ADD "subject_member_id" bigint`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_reviews_reviewer_type_enum" AS ENUM('CLIENT', 'AGENT')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_reviews" ADD "reviewer_type" "public"."ag_reviews_reviewer_type_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ADD "project_id" bigint`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ADD "property_subtype" text`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_properties_furnishing_enum" AS ENUM('UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ADD "furnishing" "public"."ag_properties_furnishing_enum"`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_properties_verification_status_enum" AS ENUM('UNVERIFIED', 'PARTIAL', 'FULLY_VERIFIED')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ADD "verification_status" "public"."ag_properties_verification_status_enum" NOT NULL DEFAULT 'UNVERIFIED'`,
		);
		await queryRunner.query(`ALTER TABLE "ag_members" ADD "avatar_url" text`);
		await queryRunner.query(`ALTER TABLE "ag_members" ADD "bio" text`);
		await queryRunner.query(
			`ALTER TABLE "ag_members" ADD "whatsapp_number" text`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_members" ADD "last_active_at" TIMESTAMP WITH TIME ZONE`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_members" ADD "active_listing_count" integer NOT NULL DEFAULT '0'`,
		);
		await queryRunner.query(
			`ALTER TYPE "public"."ag_reviews_class_enum" ADD VALUE 'AGENT'`,
		);
		await queryRunner.query(
			`ALTER TYPE "public"."ag_properties_property_type_enum" RENAME TO "ag_properties_property_type_enum_old"`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_properties_property_type_enum" AS ENUM('FARM', 'LAND', 'HOUSE', 'CONDO', 'APARTMENT', 'TOWNHOUSE', 'WAREHOUSE', 'OFFICE', 'COMMERCIAL', 'CONDOTEL')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ALTER COLUMN "property_type" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ALTER COLUMN "property_type" TYPE "public"."ag_properties_property_type_enum" USING "property_type"::"text"::"public"."ag_properties_property_type_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ALTER COLUMN "property_type" SET DEFAULT 'LAND'`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."ag_properties_property_type_enum_old"`,
		);
		await queryRunner.query(
			`ALTER TYPE "public"."ag_offices_type_enum" RENAME TO "ag_offices_type_enum_old"`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_offices_type_enum" AS ENUM('HEAD', 'BRANCH')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_offices" ALTER COLUMN "type" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_offices" ALTER COLUMN "type" TYPE "public"."ag_offices_type_enum" USING "type"::"text"::"public"."ag_offices_type_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_offices" ALTER COLUMN "type" SET DEFAULT 'BRANCH'`,
		);
		await queryRunner.query(`DROP TYPE "public"."ag_offices_type_enum_old"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "public"."ag_offices_type_enum_old" AS ENUM('HEADQUARTERS', 'BRANCH')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_offices" ALTER COLUMN "type" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_offices" ALTER COLUMN "type" TYPE "public"."ag_offices_type_enum_old" USING "type"::"text"::"public"."ag_offices_type_enum_old"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_offices" ALTER COLUMN "type" SET DEFAULT 'BRANCH'`,
		);
		await queryRunner.query(`DROP TYPE "public"."ag_offices_type_enum"`);
		await queryRunner.query(
			`ALTER TYPE "public"."ag_offices_type_enum_old" RENAME TO "ag_offices_type_enum"`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_properties_property_type_enum_old" AS ENUM('FARM', 'BEACH', 'RESIDENTIAL_LAND', 'COMMERCIAL_LAND', 'HOUSE', 'CONDO', 'APARTMENT', 'TOWNHOUSE', 'VILLA', 'BUILDING', 'WAREHOUSE', 'OFFICE', 'RETAIL', 'SERVICED', 'COMMERCIAL', 'CONDOTEL')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ALTER COLUMN "property_type" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ALTER COLUMN "property_type" TYPE "public"."ag_properties_property_type_enum_old" USING "property_type"::"text"::"public"."ag_properties_property_type_enum_old"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ALTER COLUMN "property_type" SET DEFAULT 'RESIDENTIAL_LAND'`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."ag_properties_property_type_enum"`,
		);
		await queryRunner.query(
			`ALTER TYPE "public"."ag_properties_property_type_enum_old" RENAME TO "ag_properties_property_type_enum"`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_reviews_class_enum_old" AS ENUM('AGENCY', 'PROPERTY')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_reviews" ALTER COLUMN "class" TYPE "public"."ag_reviews_class_enum_old" USING "class"::"text"::"public"."ag_reviews_class_enum_old"`,
		);
		await queryRunner.query(`DROP TYPE "public"."ag_reviews_class_enum"`);
		await queryRunner.query(
			`ALTER TYPE "public"."ag_reviews_class_enum_old" RENAME TO "ag_reviews_class_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_members" DROP COLUMN "active_listing_count"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_members" DROP COLUMN "last_active_at"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_members" DROP COLUMN "whatsapp_number"`,
		);
		await queryRunner.query(`ALTER TABLE "ag_members" DROP COLUMN "bio"`);
		await queryRunner.query(
			`ALTER TABLE "ag_members" DROP COLUMN "avatar_url"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" DROP COLUMN "verification_status"`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."ag_properties_verification_status_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" DROP COLUMN "furnishing"`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."ag_properties_furnishing_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" DROP COLUMN "property_subtype"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" DROP COLUMN "project_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_reviews" DROP COLUMN "reviewer_type"`,
		);
		await queryRunner.query(
			`DROP TYPE "public"."ag_reviews_reviewer_type_enum"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_reviews" DROP COLUMN "subject_member_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ADD "is_preselling" boolean NOT NULL`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_properties_property_category_enum" AS ENUM('APARTMENT', 'COMMERCIAL', 'CONDO', 'HOUSE_AND_LOT', 'LOT')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ADD "property_category" "public"."ag_properties_property_category_enum" NOT NULL DEFAULT 'LOT'`,
		);
		await queryRunner.query(
			`CREATE TYPE "public"."ag_properties_offer_type_enum" AS ENUM('SALE', 'RENT')`,
		);
		await queryRunner.query(
			`ALTER TABLE "ag_properties" ADD "offer_type" "public"."ag_properties_offer_type_enum" NOT NULL DEFAULT 'SALE'`,
		);
		await queryRunner.query(`DROP TABLE "ag_prop_collection_items"`);
		await queryRunner.query(`DROP TABLE "ag_project_unit_types"`);
		await queryRunner.query(`DROP TABLE "ag_offices"`);
		await queryRunner.query(`DROP TYPE "public"."ag_offices_type_enum"`);
		await queryRunner.query(`DROP TABLE "ag_projects"`);
		await queryRunner.query(`DROP TYPE "public"."ag_projects_status_enum"`);
		await queryRunner.query(
			`DROP TYPE "public"."ag_projects_project_type_enum"`,
		);
		await queryRunner.query(`DROP TABLE "geo_points_of_interest"`);
		await queryRunner.query(
			`DROP TYPE "public"."geo_points_of_interest_category_enum"`,
		);
	}
}
