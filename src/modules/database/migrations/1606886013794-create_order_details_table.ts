import { MigrationInterface, QueryRunner } from 'typeorm';

export class createOrderDetailsTable1606886013794
  implements MigrationInterface {
  name = 'createOrderDetailsTable1606886013794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "enum_order_detail_statuses" AS ENUM('waiting', 'ready')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_details" ("id" SERIAL NOT NULL, "order_id" integer NOT NULL, "menu_dish_id" integer NOT NULL, "chef_id" integer NULL, "price" double precision NOT NULL, "status" "enum_order_detail_statuses" NOT NULL DEFAULT 'waiting', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_278a6e0f21c9db1653e6f406801" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_details"`);
    await queryRunner.query(`DROP TYPE "enum_order_detail_statuses"`);
  }
}
