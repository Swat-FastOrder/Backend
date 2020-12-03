import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class addRoles1606963676357 implements MigrationInterface {
  name = 'addRoles1606963676357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO roles (id, "name", author_id, created_at, updated_at) VALUES(1, 'admin', 1, now(), now());`,
    );
    await queryRunner.query(
      `INSERT INTO roles (id, "name", author_id, created_at, updated_at) VALUES(2, 'chef', 1, now(), now());`,
    );
    await queryRunner.query(
      `INSERT INTO roles (id, "name", author_id, created_at, updated_at) VALUES(3, 'waitress', 1, now(), now());`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM roles WHERE id IN (1,2,3)`);
  }
}
