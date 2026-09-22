import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1790068214745 implements MigrationInterface {
    name = 'Migrations1790068214745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "iam_org_invitations" ADD "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "iam_org_invitations" ADD "inviter_id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "iam_sessions" ADD "expires_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "iam_sessions" ADD "ip_address" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "iam_sessions" ADD "user_agent" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "iam_sessions" DROP COLUMN "user_agent"`);
        await queryRunner.query(`ALTER TABLE "iam_sessions" DROP COLUMN "ip_address"`);
        await queryRunner.query(`ALTER TABLE "iam_sessions" DROP COLUMN "expires_at"`);
        await queryRunner.query(`ALTER TABLE "iam_org_invitations" DROP COLUMN "inviter_id"`);
        await queryRunner.query(`ALTER TABLE "iam_org_invitations" DROP COLUMN "expires_at"`);
    }

}
