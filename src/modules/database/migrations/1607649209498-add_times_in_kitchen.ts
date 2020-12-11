import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class addTimesInKitchen1607649209498 implements MigrationInterface {
  name = 'addTimesInKitchen1607649209498';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_details" ADD "cycle_in_kitchen" integer NULL`,
    );
    await queryRunner.query(
      `UPDATE order_details SET "cycle_in_kitchen" = 1 WHERE "cycle_in_kitchen" is null;`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" ALTER COLUMN "cycle_in_kitchen" SET NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "times_in_kitchen" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "times_in_kitchen"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" DROP COLUMN "cycle_in_kitchen"`,
    );
  }
}
