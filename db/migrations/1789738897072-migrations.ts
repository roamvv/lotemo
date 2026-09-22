import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1789738897072 implements MigrationInterface {
    name = 'Migrations1789738897072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."ag_offices_type_enum" RENAME TO "ag_offices_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."ag_offices_type_enum" AS ENUM('HEADQUARTERS', 'BRANCH')`);
        await queryRunner.query(`ALTER TABLE "ag_offices" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ag_offices" ALTER COLUMN "type" TYPE "public"."ag_offices_type_enum" USING "type"::"text"::"public"."ag_offices_type_enum"`);
        await queryRunner.query(`ALTER TABLE "ag_offices" ALTER COLUMN "type" SET DEFAULT 'BRANCH'`);
        await queryRunner.query(`DROP TYPE "public"."ag_offices_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."ag_offices_type_enum_old" AS ENUM('HEAD', 'BRANCH')`);
        await queryRunner.query(`ALTER TABLE "ag_offices" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ag_offices" ALTER COLUMN "type" TYPE "public"."ag_offices_type_enum_old" USING "type"::"text"::"public"."ag_offices_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "ag_offices" ALTER COLUMN "type" SET DEFAULT 'BRANCH'`);
        await queryRunner.query(`DROP TYPE "public"."ag_offices_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."ag_offices_type_enum_old" RENAME TO "ag_offices_type_enum"`);
    }

}
