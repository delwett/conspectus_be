import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const tasksTable = new Table({
  name: 'tasks',
  columns: [
    {
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      default: 'uuid_generate_v4()'
    },
    {
      name: 'board_id',
      type: 'uuid'
    },
    {
      name: 'creator_id',
      type: 'uuid'
    },
    {
      name: 'description',
      type: 'varchar'
    },
    {
      name: 'status',
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
  ],
  foreignKeys: [
    {
      columnNames: ['board_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'boards',
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
      columnNames: ['board_id']
    },
    {
      columnNames: ['creator_id']
    }
  ]
})

export class addTasksWithRel1607261537645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(tasksTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tasksTable)
  }
}
