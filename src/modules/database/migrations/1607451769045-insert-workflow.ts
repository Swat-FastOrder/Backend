import { MigrationInterface, QueryRunner } from 'typeorm';

/* eslint-disable @typescript-eslint/class-name-casing */
export class insertWorkflow1607451769045 implements MigrationInterface {
  name = 'insertWorkflow1607451769045';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      INSERT INTO public.order_detail_workflow (status_start, status_end) VALUES('ordered', 'ready-to-prepare');
      INSERT INTO public.order_detail_workflow (status_start, status_end) VALUES('ready-to-prepare', 'preparing');
      INSERT INTO public.order_detail_workflow (status_start, status_end) VALUES('preparing', 'ready-to-serve');
      INSERT INTO public.order_detail_workflow (status_start, status_end) VALUES('ready-to-serve', 'served');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SELECT 1`);
  }
}
