import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class alterOrderStatuses1606858223611 implements MigrationInterface {
  name = 'alterOrderStatuses1606858223611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "waitress_id" SET NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "orders"."waitress_id" IS NULL`);
    await queryRunner.query(
      `ALTER TYPE "public"."enum_order_statuses" RENAME TO "enum_order_statuses_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "enum_order_statuses" AS ENUM('ordering', 'waiting', 'preparing', 'ready')`,
    );

    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" TYPE "enum_order_statuses" USING "status"::"text"::"enum_order_statuses"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'ordering'`,
    );
    await queryRunner.query(`DROP TYPE "enum_order_statuses_old"`);
    await queryRunner.query(`COMMENT ON COLUMN "orders"."status" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'ordering'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'progress'`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "orders"."status" IS NULL`);
    await queryRunner.query(`CREATE TYPE "enum_order_statuses_old" AS ENUM()`);
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" TYPE "enum_order_statuses_old" USING "status"::"text"::"enum_order_statuses_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'ordering'`,
    );
    await queryRunner.query(`DROP TYPE "orders_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "enum_order_statuses_old" RENAME TO  "enum_order_statuses"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "orders"."waitress_id" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "waitress_id" DROP NOT NULL`,
    );
  }
}
