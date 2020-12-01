import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class removeAuthorIdFromOrder1606858513704
  implements MigrationInterface {
  name = 'removeAuthorIdFromOrder1606858513704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "author_id"`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "author_id" integer NOT NULL`,
    );
  }
}
