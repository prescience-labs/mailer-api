import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableSentTime1563646092111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ALTER COLUMN "sentTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scheduledMessages" ALTER COLUMN "sentTime" SET NOT NULL`);
    }

}
