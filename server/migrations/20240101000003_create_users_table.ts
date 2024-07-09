import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username', 100).unique().notNullable();
    table.string('password').notNullable();
    table.string('role', 50).notNullable();
    table.string('name').notNullable();
    table.text('bio').nullable();
    table.date('birthdate').notNullable();
  });

  await knex('users').insert({
    username: 'admin',
    password: '$2a$10$1fTvF98p69N/Y3klJ4iC6uQJULg7F6ty5NTa.UwHf9xHZa3ovzR3W',
    role: 'admin',
    name: 'Admin User',
    bio: 'Administrator',
    birthdate: '2000-09-05',
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
