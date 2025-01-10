import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    postgres: {
      dbName: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    mysql: {
      dbName: process.env.MYSQL_DB,
      port: parseInt(process.env.MYSQL_PORT, 10),
      password: process.env.MYSQL_PASSWORD,
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
    },
    typeOrmConfig: {
      type: process.env.TYPEORM_TYPE,
      entities: process.env.TYPEORM_ENTITIES,
      migrations: process.env.TYPEORM_MIGRATIONS,
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
    },
    key: process.env.API_KEY,
  };
});
