import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import bcrypt from 'bcrypt';

const DefaultPassword = '123123123';

export class CreateUsersTable1605785772964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'first_name',
            type: 'varchar'
          },
          {
            name: 'last_name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    );

    const generatedPasswordHash = await bcrypt.hash(DefaultPassword, 10);

    await queryRunner.query(
      `INSERT INTO users (first_name, email, password) VALUES ('Test user', 'test@test.test', '${generatedPasswordHash}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
