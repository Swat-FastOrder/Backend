import { MigrationInterface, QueryRunner } from 'typeorm';

export class addStatusToTablesTable1606411860805 implements MigrationInterface {
  name = 'addStatusToTablesTable1606411860805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tables" ADD "status" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tables" DROP COLUMN "status"`);
  }
}
