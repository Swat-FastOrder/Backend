import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class addFinishedOrderStatusEnum1606963676359
  implements MigrationInterface {
  name = 'addFinishedOrderStatusEnum1606963676359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE enum_order_statuses ADD VALUE 'finished';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 1`);
  }
}
