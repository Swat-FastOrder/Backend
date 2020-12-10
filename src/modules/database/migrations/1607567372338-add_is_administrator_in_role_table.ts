import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class addIsAdministratorInRoleTable1607567372338
  implements MigrationInterface {
  name = 'addIsAdministratorInRoleTable1607567372338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "is_administrator" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `UPDATE "roles" SET is_administrator = true where "name"='admin'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP COLUMN "is_administrator"`,
    );
  }
}
