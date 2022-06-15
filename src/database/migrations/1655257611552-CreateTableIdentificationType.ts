import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableIdentificationType1655257611552 implements MigrationInterface {
    name = 'CreateTableIdentificationType1655257611552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "identification_type" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" boolean NOT NULL, CONSTRAINT "PK_2c5e774af32b420dafcc7bb3aab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "identification_type"`);
    }

}
