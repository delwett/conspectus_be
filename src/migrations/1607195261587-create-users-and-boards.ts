import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import bcrypt from 'bcrypt'
import { addWeeks, startOfWeek } from 'date-fns'
import { BoardStatus } from '@/entities/board'
import toISODate from '@/utils/to-iso-date'

const DefaultPassword = '123123123'

export class createUsersAndBoards1607195261587 implements MigrationInterface {
  name = 'createUsersAndBoards1607195261587'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'first_name',
            type: 'text'
          },
          {
            name: 'last_name',
            type: 'text',
            isNullable: true
          },
          {
            name: 'email',
            type: 'text',
            isUnique: true
          },
          {
            name: 'password',
            type: 'text'
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
    )

    const generatedPasswordHash = await bcrypt.hash(DefaultPassword, 10)

    await queryRunner.query(
      `INSERT INTO users (first_name, email, password) VALUES ('Test user', 'test@test.test', '${generatedPasswordHash}')`
    )

    await queryRunner.createTable(
      new Table({
        name: 'boards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'meeting_date',
            type: 'date'
          },
          {
            name: 'status',
            type: 'text'
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
    )

    const startOfNextWeek = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 })

    await queryRunner.query(
      `INSERT INTO boards (meeting_date, status) VALUES ('${toISODate(startOfNextWeek)}', '${BoardStatus.Pending}')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "boards"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`)
  }
}
