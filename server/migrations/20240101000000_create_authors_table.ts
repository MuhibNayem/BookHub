import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    process.env.AUTHOR_TABLE_NAME ?? 'authors',
    (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('bio').nullable();
      table.date('birthdate').notNullable();
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(process.env.AUTHOR_TABLE_NAME ?? 'authors');
}
