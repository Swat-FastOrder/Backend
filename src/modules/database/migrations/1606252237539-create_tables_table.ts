import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class createTablesTable1606252237539 implements MigrationInterface {
  name = 'createTablesTable1606252237539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tables" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7cf2aca7af9550742f855d4eb69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ALTER COLUMN "author_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu_categories"."author_id" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "menu_categories"."author_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_categories" ALTER COLUMN "author_id" DROP NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "tables"`);
  }
}
