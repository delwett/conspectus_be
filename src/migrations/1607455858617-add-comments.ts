import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const commentsTable = new Table({
  name: 'comments',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      default: 'uuid_generate_v4()'
    },
    {
      name: 'task_id',
      type: 'uuid'
    },
    {
      name: 'creator_id',
      type: 'uuid'
    },
    {
      name: 'text',
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
  ],
  foreignKeys: [
    {
      columnNames: ['task_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'tasks',
      onDelete: 'CASCADE'
    },
    {
      columnNames: ['creator_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'
    }
  ],
  indices: [
    {
      columnNames: ['task_id']
    },
    {
      columnNames: ['creator_id']
    }
  ]
})

export class addComments1607455858617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(commentsTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(commentsTable)
  }
}
