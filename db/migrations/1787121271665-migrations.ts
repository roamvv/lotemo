import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1787121271665 implements MigrationInterface {
    name = 'Migrations1787121271665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ag_verifications" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_50a9962a8c027cd3c2c47ea7029" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod_audit_logs" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_6e897ccbd71d7867aac86eed58f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod_reports" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_20e675c68568a51d1b4d07c9129" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "biz_invoices" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_e5dbf94681dce0674d9e50294a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ag_contact_activities" ("id" BIGSERIAL NOT NULL, "activity_id" text NOT NULL, "contact_id" bigint NOT NULL, "occurred_at" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8b41bbdb867f285f5cc76276e2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mod_actions" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_b1202f6b822249b6fdb595a01db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_preferences" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_e94e2b543f2f218ee68e4f4fad2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "biz_coupons" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_bcd3f43900f3e87623853ae0771" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "biz_payment_refunds" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_3af471cbf1c1c3a8a8658b114c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_templates" ("id" BIGSERIAL NOT NULL, CONSTRAINT "PK_76f0fc48b8d057d2ae7f3a2848a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ag_contacts" ("id" BIGSERIAL NOT NULL, "agency_id" bigint NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "phone" text, "assigned_member_id" bigint, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_416cff3c3a0e2dadfb089e74848" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ag_contact_inquiries" ("id" BIGSERIAL NOT NULL, "contact_id" bigint NOT NULL, "property_id" bigint NOT NULL, "conversation_id" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_9ca321944ad7a447dd6676e9184" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ag_service_areas" ADD "agency_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ag_properties" ADD "bedroom_count" integer`);
        await queryRunner.query(`ALTER TABLE "ag_properties" ADD "bathroom_count" integer`);
        await queryRunner.query(`ALTER TABLE "ag_properties" ADD "parking_spaces_count" integer`);
        await queryRunner.query(`ALTER TABLE "ag_properties" ADD "floor_area_sqm" numeric`);
        await queryRunner.query(`ALTER TABLE "ag_properties" ADD "lot_area_sqm" numeric`);
        await queryRunner.query(`ALTER TABLE "ag_members" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ag_members" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "ag_property_prices_id_seq" OWNED BY "ag_property_prices"."id"`);
        await queryRunner.query(`ALTER TABLE "ag_property_prices" ALTER COLUMN "id" SET DEFAULT nextval('"ag_property_prices_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "ag_property_prices" ALTER COLUMN "prev_price_id" DROP NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "biz_payments_id_seq" OWNED BY "biz_payments"."id"`);
        await queryRunner.query(`ALTER TABLE "biz_payments" ALTER COLUMN "id" SET DEFAULT nextval('"biz_payments_id_seq"')`);
        await queryRunner.query(`ALTER TYPE "public"."ag_properties_property_status_enum" ADD VALUE 'DRAFT'`);
        await queryRunner.query(`ALTER TYPE "public"."ag_members_role_enum" RENAME TO "ag_members_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ag_members_role_enum" AS ENUM('NO_ROLE', 'ADMIN', 'AGENT', 'MANAGER')`);
        await queryRunner.query(`ALTER TABLE "ag_members" ALTER COLUMN "role" TYPE "public"."ag_members_role_enum" USING "role"::"text"::"public"."ag_members_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ag_members_role_enum_old"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "ag_prop_feature_lists_id_seq" OWNED BY "ag_prop_feature_lists"."id"`);
        await queryRunner.query(`ALTER TABLE "ag_prop_feature_lists" ALTER COLUMN "id" SET DEFAULT nextval('"ag_prop_feature_lists_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ag_prop_feature_lists" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "ag_prop_feature_lists_id_seq"`);
        await queryRunner.query(`CREATE TYPE "public"."ag_members_role_enum_old" AS ENUM('USER', 'ADMIN', 'AGENT', 'MANAGER')`);
        await queryRunner.query(`ALTER TABLE "ag_members" ALTER COLUMN "role" TYPE "public"."ag_members_role_enum_old" USING "role"::"text"::"public"."ag_members_role_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."ag_members_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."ag_members_role_enum_old" RENAME TO "ag_members_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."ag_properties_property_status_enum_old" AS ENUM('AVAILABLE', 'RESERVED', 'SOLD', 'RENTED')`);
        await queryRunner.query(`ALTER TABLE "ag_properties" ALTER COLUMN "property_status" TYPE "public"."ag_properties_property_status_enum_old" USING "property_status"::"text"::"public"."ag_properties_property_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."ag_properties_property_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."ag_properties_property_status_enum_old" RENAME TO "ag_properties_property_status_enum"`);
        await queryRunner.query(`ALTER TABLE "biz_payments" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "biz_payments_id_seq"`);
        await queryRunner.query(`ALTER TABLE "ag_property_prices" ALTER COLUMN "prev_price_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ag_property_prices" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "ag_property_prices_id_seq"`);
        await queryRunner.query(`ALTER TABLE "ag_members" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "ag_members" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "ag_properties" DROP COLUMN "lot_area_sqm"`);
        await queryRunner.query(`ALTER TABLE "ag_properties" DROP COLUMN "floor_area_sqm"`);
        await queryRunner.query(`ALTER TABLE "ag_properties" DROP COLUMN "parking_spaces_count"`);
        await queryRunner.query(`ALTER TABLE "ag_properties" DROP COLUMN "bathroom_count"`);
        await queryRunner.query(`ALTER TABLE "ag_properties" DROP COLUMN "bedroom_count"`);
        await queryRunner.query(`ALTER TABLE "ag_service_areas" DROP COLUMN "agency_id"`);
        await queryRunner.query(`DROP TABLE "ag_contact_inquiries"`);
        await queryRunner.query(`DROP TABLE "ag_contacts"`);
        await queryRunner.query(`DROP TABLE "notification_templates"`);
        await queryRunner.query(`DROP TABLE "biz_payment_refunds"`);
        await queryRunner.query(`DROP TABLE "biz_coupons"`);
        await queryRunner.query(`DROP TABLE "notification_preferences"`);
        await queryRunner.query(`DROP TABLE "mod_actions"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "ag_contact_activities"`);
        await queryRunner.query(`DROP TABLE "biz_invoices"`);
        await queryRunner.query(`DROP TABLE "mod_reports"`);
        await queryRunner.query(`DROP TABLE "mod_audit_logs"`);
        await queryRunner.query(`DROP TABLE "ag_verifications"`);
    }

}
