import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('permissions', (table) => {
    table.increments('id').primary();
    table.string('role', 50).notNullable();
    table.string('resource_type', 50).notNullable();
    table.boolean('can_read').defaultTo(false);
    table.boolean('can_write').defaultTo(false);
  });

  // Insert default roles with permissions
  await knex('permissions').insert([
    // Admin permissions
    { role: 'admin', resource_type: 'author', can_read: true, can_write: true },
    { role: 'admin', resource_type: 'book', can_read: true, can_write: true },

    // Viewer permissions
    {
      role: 'viewer',
      resource_type: 'author',
      can_read: true,
      can_write: false,
    },
    { role: 'viewer', resource_type: 'book', can_read: true, can_write: false },

    // Author permissions
    {
      role: 'author',
      resource_type: 'author',
      can_read: true,
      can_write: true,
    },
    { role: 'author', resource_type: 'book', can_read: true, can_write: true },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('permissions');
}
