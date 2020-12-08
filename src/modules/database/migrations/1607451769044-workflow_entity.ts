import { MigrationInterface, QueryRunner } from 'typeorm';

export class workflowEntity1607451769044 implements MigrationInterface {
  name = 'workflowEntity1607451769044';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.order_details ALTER COLUMN status DROP NOT NULL;`,
    );
    await queryRunner.query(
      `UPDATE order_details SET status = null WHERE status = 'waiting';`,
    );

    await queryRunner.query(
      `ALTER TYPE "public"."enum_order_detail_statuses" RENAME TO "enum_order_detail_statuses_old";`,
    );
    await queryRunner.query(
      `CREATE TYPE "enum_order_detail_statuses" AS ENUM('ordered', 'ready-to-prepare', 'preparing', 'ready-to-serve', 'served');`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" ALTER COLUMN "status" DROP DEFAULT;`,
    );

    await queryRunner.query(
      `ALTER TABLE "order_details" ALTER COLUMN "status" TYPE "enum_order_detail_statuses" USING "status"::"text"::"enum_order_detail_statuses";`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" ALTER COLUMN "status" SET DEFAULT 'ordered'`,
    );
    await queryRunner.query(`DROP TYPE "enum_order_detail_statuses_old"`);
    await queryRunner.query(
      `COMMENT ON COLUMN "order_details"."status" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_details" ALTER COLUMN "status" SET DEFAULT 'ordered'`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_detail_workflow" ("status_start" "enum_order_detail_statuses" NOT NULL, "status_end" "enum_order_detail_statuses" NOT NULL, CONSTRAINT "PK_30ca8e9d35c7d48244dc04142ac" PRIMARY KEY ("status_start", "status_end"))`,
    );
    await queryRunner.query(
      `UPDATE order_details SET status = 'ordered' WHERE status is null;`,
    );
    await queryRunner.query(
      `ALTER TABLE public.order_details ALTER COLUMN status SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 1`);
  }
}
