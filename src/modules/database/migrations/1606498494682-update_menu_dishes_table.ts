import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class updateMenuDishesTable1606498494682 implements MigrationInterface {
  name = 'updateMenuDishesTable1606498494682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "category_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."category_id" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."is_recommended" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "is_recommended" SET DEFAULT false`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."is_active" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "is_active" SET DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "author_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."author_id" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."author_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "author_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "is_active" DROP DEFAULT`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."is_active" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "is_recommended" DROP DEFAULT`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."is_recommended" IS NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "menu-dishes"."category_id" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu-dishes" ALTER COLUMN "category_id" DROP NOT NULL`,
    );
  }
}
