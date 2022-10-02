import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class Initial1664474542276 implements MigrationInterface {
  usersTableName: string;
  postsTableName: string;
  constructor() {
    this.usersTableName = 'user';
    this.postsTableName = 'post';
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const { usersTableName, postsTableName } = this;
    await queryRunner.createTable(
      new Table({
        name: usersTableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'isActive',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      usersTableName,
      new TableIndex({
        name: 'IDX_USERNAME_NAME',
        columnNames: ['username'],
      }),
    );

    await queryRunner.createIndex(
      usersTableName,
      new TableIndex({
        name: 'IDX_EMAIL_NAME',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: postsTableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'votes',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.addColumn(
      postsTableName,
      new TableColumn({
        name: 'userId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      postsTableName,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: usersTableName,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const { usersTableName, postsTableName } = this;

    const table = await queryRunner.getTable(postsTableName);
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );

    await queryRunner.dropForeignKey(postsTableName, foreignKey);
    await queryRunner.dropTable(postsTableName);

    await queryRunner.dropIndex(usersTableName, 'IDX_USERNAME_NAME');
    await queryRunner.dropIndex(usersTableName, 'IDX_EMAIL_NAME');
    await queryRunner.dropTable(usersTableName);
  }
}
