import {MigrationInterface, QueryRunner} from "typeorm";

export class addSentColumn1563643591013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ADD "sent" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" DROP COLUMN "sent"`);
    }

}
