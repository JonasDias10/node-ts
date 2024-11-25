import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddReviewTable1732501440519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "review",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "content",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "product_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "review",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("review");
  }
}
