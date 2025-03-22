import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskPrioEnum1742666187217 implements MigrationInterface {
    name = 'TaskPrioEnum1742666187217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."tasks_priority_enum" RENAME TO "tasks_priority_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_priority_enum" AS ENUM('Low', 'Medium', 'High')`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "public"."tasks_priority_enum" USING "priority"::"text"::"public"."tasks_priority_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_priority_enum_old" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "priority" TYPE "public"."tasks_priority_enum_old" USING "priority"::"text"::"public"."tasks_priority_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."tasks_priority_enum_old" RENAME TO "tasks_priority_enum"`);
    }

}
