import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexConfig = {
  client: process.env.DB_CLIENT,
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    pool: {
      min: 2,
      max: 20,
    },
  },
};

const knexInstance = knex(knexConfig);

export { knexInstance };
