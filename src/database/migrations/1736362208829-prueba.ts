import { MigrationInterface, QueryRunner } from "typeorm";

export class Prueba1736362208829 implements MigrationInterface {
    name = 'Prueba1736362208829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "rut" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db" UNIQUE ("rut")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_9f839e522b3b8c8c8223cde81db"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "rut"`);
    }

}
