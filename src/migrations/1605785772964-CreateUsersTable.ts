import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1605785772964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true
          },
          {
            name: "first_name",
            type: "varchar"
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );

    await queryRunner.query("INSERT INTO users (first_name, email) VALUES ('Test user', 'test@test.test')");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
