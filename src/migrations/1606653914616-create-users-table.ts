import { MigrationInterface, QueryRunner } from 'typeorm'
import bcrypt from 'bcrypt'

const DefaultPassword = '123123123'

export class createUsersTable1606653914616 implements MigrationInterface {
  name = 'createUsersTable1606653914616'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )

    const generatedPasswordHash = await bcrypt.hash(DefaultPassword, 10)

    await queryRunner.query(
      `INSERT INTO users (first_name, email, password) VALUES ('Test user', 'test@test.test', '${generatedPasswordHash}')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)

    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`)
  }
}
