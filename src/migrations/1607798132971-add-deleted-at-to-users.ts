import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

const column = new TableColumn({
  name: 'deleted_at',
  type: 'timestamp',
  isNullable: true
})

export class addDeletedAtToUsers1607798132971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', column)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', column)
  }
}
