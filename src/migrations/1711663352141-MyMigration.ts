import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1711663352141 implements MigrationInterface {
    name = 'MyMigration1711663352141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_35c345d074803326a814f6035e8"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_35c345d074803326a814f6035e8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_35c345d074803326a814f6035e8"`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_picture" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_35c345d074803326a814f6035e8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
