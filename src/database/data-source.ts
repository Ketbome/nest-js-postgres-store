import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const AppDataSource = new DataSource({
  type: process.env.TYPEORM_TYPE as any,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
});
