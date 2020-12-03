import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixTableMenuDishesName1606963676355 implements MigrationInterface {
  name = 'fixTableMenuDishesName1606963676355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "menu-dishes"`);
    await queryRunner.query(
      `CREATE TABLE "menu_dishes" ("id" SERIAL NOT NULL, "name" character varying(85) NOT NULL, "description" character varying(255) NOT NULL, "category_id" integer NOT NULL, "is_recommended" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "price" double precision NOT NULL, "image_url" character varying(255) NOT NULL, "author_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d607c20da4a70cec3b98edfbeb4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "menu_dishes"`);
  }
}
