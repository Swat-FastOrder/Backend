import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class tableUsersAndRoles1605821989764 implements MigrationInterface {
  name = 'tableUsersAndRoles1605821989764';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(35) NOT NULL, "author_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying(50) NOT NULL, "last_name" character varying(50) NOT NULL, "email" character varying(65) NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "author_id" integer NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE users_roles (
        user_id serial NOT NULL,
        role_id serial NOT NULL,
        CONSTRAINT users_roles_pk PRIMARY KEY (user_id, role_id)
      );`,
    );
    await queryRunner.query(
      `INSERT INTO users (id,first_name,last_name,email,"password",is_active,author_id) VALUES
	    (1,'FastOrder','','admin@fastorder.com','$2a$10$kRze24HsXf.mzHantDJHD.WMmJap/JP7t1u4O.wAsgqfQHA2VqdXS',true,NULL);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users_roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}
