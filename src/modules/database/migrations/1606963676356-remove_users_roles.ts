import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class removeUsersRoles1606963676356 implements MigrationInterface {
  name = 'removeUsersRoles1606963676356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "users_roles"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users_roles (
        user_id serial NOT NULL,
        role_id serial NOT NULL,
        CONSTRAINT users_roles_pk PRIMARY KEY (user_id, role_id)
      );`,
    );
  }
}
