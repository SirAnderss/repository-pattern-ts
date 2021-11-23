import { ConnectionOptions } from 'mysql2';

export const dbConf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
  decimalNumbers: true
} as ConnectionOptions;
