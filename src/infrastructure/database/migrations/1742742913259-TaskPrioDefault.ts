import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskPrioDefault1742742913259 implements MigrationInterface {
    name = 'TaskPrioDefault1742742913259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."tasks_priority_enum" RENAME TO "tasks_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_priority_enum" AS ENUM('None', 'Low', 'Medium', 'High')`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "public"."tasks_priority_enum" USING "priority"::"text"::"public"."tasks_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'None'`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum_old"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'None'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_priority_enum_old" AS ENUM('Low', 'Medium', 'High')`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "public"."tasks_priority_enum_old" USING "priority"::"text"::"public"."tasks_priority_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."tasks_priority_enum_old" RENAME TO "tasks_priority_enum"`);
    }

}
