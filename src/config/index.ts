import path from 'path';
import dotenv from 'dotenv';

const envFile =
  {
    development: '.env',
    testing: '.env.test',
    production: '.env.production',
  }[process.env.NODE_ENV || 'development'] || '.env'; // fallback default '.env'

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const CONFIG = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL ?? '', // fallback string kosong
  env: process.env.NODE_ENV || 'development',
};
