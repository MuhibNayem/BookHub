import app from './app';
import dotenv from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import minimist from 'minimist';

dotenv.config();

const args = minimist(process.argv.slice(2));
const forceMigrations = args['force-migrations'] || false;

const PORT = process.env.PORT || 3000;

const migrationsAlreadyApplied = (): boolean => {
  const __dirname = path.resolve();
  try {
    const knexFilePath = path.resolve(__dirname, './knexfile.ts');
    const knexConfig = require(knexFilePath).development;
    const migrationsDirectory = knexConfig?.migrations?.directory;

    if (!fs.existsSync(migrationsDirectory)) {
      return false;
    }

    const command = `npx knex --knexfile ${knexFilePath} migrate:currentVersion`;
    const currentVersion = execSync(command, { encoding: 'utf8' });

    return currentVersion.trim() !== 'none';
  } catch (error) {
    console.error('Error checking migration status:', error);
    return false;
  }
};

const startServer = async () => {
  try {
    const migrationsApplied = migrationsAlreadyApplied();

    if (!migrationsApplied || forceMigrations) {
      console.log('Running migrations...');
      execSync('npx knex migrate:latest', { stdio: 'inherit' });
      console.log('Migrations completed.');
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
