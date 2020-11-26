import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIsAvailableFieldToTablesTable1606421769794
  implements MigrationInterface {
  name = 'addIsAvailableFieldToTablesTable1606421769794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tables" RENAME COLUMN "isAvailable" TO "is_available"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tables" RENAME COLUMN "is_available" TO "isAvailable"`,
    );
  }
}
