import {MigrationInterface, QueryRunner} from "typeorm";

export class createMenuDishesTable1606322010210 implements MigrationInterface {
    name = 'createMenuDishesTable1606322010210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu-dishes" ("id" SERIAL NOT NULL, "name" character varying(85) NOT NULL, "description" character varying(255) NOT NULL, "category_id" integer, "is_recommended" boolean NOT NULL, "is_active" boolean NOT NULL, "price" double precision NOT NULL, "image_url" character varying(255) NOT NULL, "author_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a1c0137df6b34f79deee94f4a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "menu_categories" ALTER COLUMN "author_id" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "menu_categories"."author_id" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "menu_categories"."author_id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "menu_categories" ALTER COLUMN "author_id" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "menu-dishes"`);
    }

}
