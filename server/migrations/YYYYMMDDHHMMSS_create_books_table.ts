import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    process.env.BOOK_TABLE_NAME ?? 'books',
    (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').nullable();
      table.date('published_date').notNullable();
      table
        .integer('author_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('authors')
        .onDelete('CASCADE');
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(process.env.BOOK_TABLE_NAME ?? 'books');
}
