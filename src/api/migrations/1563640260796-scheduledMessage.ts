import {MigrationInterface, QueryRunner} from "typeorm";

export class scheduledMessage1563640260796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_7351ce59892762654ba0e8f0fbe"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_430c948a5502a90638619820c87"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_4d5f057bd753ecf3de2bc80b3a8"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_efad956533703b2e3ba0aaaf972"`);
        await queryRunner.query(`DROP INDEX "IDX_14241fb016a330600a7e0efae9"`);
        await queryRunner.query(`CREATE TABLE "scheduledMessages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "title" character varying NOT NULL, "body" character varying, "sendTime" TIMESTAMP WITH TIME ZONE NOT NULL, "token" character varying NOT NULL, "recipientEmail" character varying NOT NULL, "recipientName" character varying NOT NULL, CONSTRAINT "PK_96a56e50f392501a1b9d5e01c00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e" ON "roles_permissions_permissions" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6" ON "roles_permissions_permissions" ("permissionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_df951a64f09865171d2d7a502b" ON "users_roles_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2f0366aa9349789527e0c36d9" ON "users_roles_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_dc2b9d46195bb3ed28abbf7c9e3" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_fd4d5d4c7f7ff16c57549b72c6f" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_df951a64f09865171d2d7a502b1" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_b2f0366aa9349789527e0c36d97" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_b2f0366aa9349789527e0c36d97"`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" DROP CONSTRAINT "FK_df951a64f09865171d2d7a502b1"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_fd4d5d4c7f7ff16c57549b72c6f"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" DROP CONSTRAINT "FK_dc2b9d46195bb3ed28abbf7c9e3"`);
        await queryRunner.query(`DROP INDEX "IDX_b2f0366aa9349789527e0c36d9"`);
        await queryRunner.query(`DROP INDEX "IDX_df951a64f09865171d2d7a502b"`);
        await queryRunner.query(`DROP INDEX "IDX_fd4d5d4c7f7ff16c57549b72c6"`);
        await queryRunner.query(`DROP INDEX "IDX_dc2b9d46195bb3ed28abbf7c9e"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "scheduledMessages"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_14241fb016a330600a7e0efae9" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_efad956533703b2e3ba0aaaf972" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_roles_roles" ADD CONSTRAINT "FK_4d5f057bd753ecf3de2bc80b3a8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_430c948a5502a90638619820c87" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions_permissions" ADD CONSTRAINT "FK_7351ce59892762654ba0e8f0fbe" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
