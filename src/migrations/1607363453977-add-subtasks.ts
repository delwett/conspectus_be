import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from 'typeorm'

const tableName = 'tasks'

const column = new TableColumn({
  type: 'uuid',
  name: 'parent_id',
  isNullable: true
})

const index = new TableIndex({
  columnNames: ['parent_id']
})

const foreignKey = new TableForeignKey({
  columnNames: ['parent_id'],
  referencedColumnNames: ['id'],
  referencedTableName: tableName,
  onDelete: 'CASCADE'
})

export class addSubtasks1607363453977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(tableName, column)
    await queryRunner.createForeignKey(tableName, foreignKey)
    await queryRunner.createIndex(tableName, index)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(tableName, index)
    await queryRunner.dropForeignKey(tableName, foreignKey)
    await queryRunner.dropColumn(tableName, column)
  }
}
