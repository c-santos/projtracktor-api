import { MigrationInterface, QueryRunner } from "typeorm";

export class Tags1734272343374 implements MigrationInterface {
    name = 'Tags1734272343374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tags_type_enum" AS ENUM('project', 'task')`);
        await queryRunner.query(`CREATE TABLE "tags" ("updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."tags_type_enum" NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_tags" ("project" uuid NOT NULL, "tag" uuid NOT NULL, CONSTRAINT "PK_4229b5dcd29d0e7e56650ad0f61" PRIMARY KEY ("project", "tag"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b86a90d48eba34d897d6198ed3" ON "project_tags" ("project") `);
        await queryRunner.query(`CREATE INDEX "IDX_3da1b1ec06c63223ed8fa0d6c3" ON "project_tags" ("tag") `);
        await queryRunner.query(`CREATE TABLE "task_tags" ("task" uuid NOT NULL, "tag" uuid NOT NULL, CONSTRAINT "PK_250f776781aae3b8e6845e4dcff" PRIMARY KEY ("task", "tag"))`);
        await queryRunner.query(`CREATE INDEX "IDX_29cab43b4b1a8888fc72b95a7f" ON "task_tags" ("task") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8539d5e592b03b4b063cd8d90" ON "task_tags" ("tag") `);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_b86a90d48eba34d897d6198ed3f" FOREIGN KEY ("project") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_3da1b1ec06c63223ed8fa0d6c36" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_tags" ADD CONSTRAINT "FK_29cab43b4b1a8888fc72b95a7f0" FOREIGN KEY ("task") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "task_tags" ADD CONSTRAINT "FK_f8539d5e592b03b4b063cd8d90e" FOREIGN KEY ("tag") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task_tags" DROP CONSTRAINT "FK_f8539d5e592b03b4b063cd8d90e"`);
        await queryRunner.query(`ALTER TABLE "task_tags" DROP CONSTRAINT "FK_29cab43b4b1a8888fc72b95a7f0"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_3da1b1ec06c63223ed8fa0d6c36"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_b86a90d48eba34d897d6198ed3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8539d5e592b03b4b063cd8d90"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29cab43b4b1a8888fc72b95a7f"`);
        await queryRunner.query(`DROP TABLE "task_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3da1b1ec06c63223ed8fa0d6c3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b86a90d48eba34d897d6198ed3"`);
        await queryRunner.query(`DROP TABLE "project_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TYPE "public"."tags_type_enum"`);
    }

}
