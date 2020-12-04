import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class updateUserFastorder1606963676358 implements MigrationInterface {
  name = 'updateUserFastorder1606963676358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE users SET role_id = 3 WHERE id != 1;`);
    await queryRunner.query(`UPDATE users SET role_id = 1 WHERE id = 1;`);
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 1`);
  }
}
