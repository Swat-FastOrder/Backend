import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class createMenuCategoriesTable1605857035429
  implements MigrationInterface {
  name = 'createMenuCategoriesTable1605857035429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "menu_categories" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "author_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_124ae987900336f983881cb04e6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "menu_categories"`);
  }
}
