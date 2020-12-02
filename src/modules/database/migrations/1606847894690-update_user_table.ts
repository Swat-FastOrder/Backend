import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserTable1606847894690 implements MigrationInterface {
  name = 'updateUserTable1606847894690';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar" character varying(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    await queryRunner.query(`ALTER TABLE "tables" DROP COLUMN "is_available"`);
  }
}
