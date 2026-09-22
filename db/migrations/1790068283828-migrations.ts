import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1790068283828 implements MigrationInterface {
    name = 'Migrations1790068283828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "iam_org_invitations" ALTER COLUMN "invited_by" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "iam_org_invitations" ALTER COLUMN "invited_by" SET NOT NULL`);
    }

}
