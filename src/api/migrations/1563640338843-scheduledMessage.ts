import {MigrationInterface, QueryRunner} from "typeorm";

export class scheduledMessage1563640338843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" DROP COLUMN "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ADD "title" character varying NOT NULL`);
    }

}
