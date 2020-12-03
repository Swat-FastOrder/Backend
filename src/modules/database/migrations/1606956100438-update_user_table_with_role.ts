import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserTableWithRole1606956100438
  implements MigrationInterface {
  name = 'updateUserTableWithRole1606956100438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "role_id" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
  }
}
