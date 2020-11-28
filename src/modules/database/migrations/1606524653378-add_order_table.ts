import {MigrationInterface, QueryRunner} from "typeorm";

export class addOrderTable1606524653378 implements MigrationInterface {
    name = 'addOrderTable1606524653378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "enum_order_statuses" AS ENUM('progress', 'finished')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "waitress_id" integer, "table_id" integer NOT NULL, "total_diners" integer NOT NULL DEFAULT '1', "total_dishes" integer NOT NULL DEFAULT '0', "total_price" double precision NOT NULL DEFAULT '0', "status" "enum_order_statuses" NOT NULL DEFAULT 'progress', "author_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tables" ADD "is_available" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tables" DROP COLUMN "is_available"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "enum_order_statuses"`);
    }

}
