import {MigrationInterface, QueryRunner} from "typeorm";

export class sendTimeModifications1563645640430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" DROP COLUMN "sendTime"`);
        await queryRunner.query(`ALTER TABLE "scheduledMessages" DROP COLUMN "sent"`);
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ADD "scheduledTime" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ADD "sentTime" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" DROP COLUMN "sentTime"`);
        await queryRunner.query(`ALTER TABLE "scheduledMessages" DROP COLUMN "scheduledTime"`);
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ADD "sent" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ADD "sendTime" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
