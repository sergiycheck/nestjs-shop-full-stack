import dotenv from 'dotenv';
import path from 'node:path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const pathEnv = path.resolve(process.cwd(), '.env.dev');
dotenv.config({ path: pathEnv });

type ConfigType = {
  postgresDbOptions: PostgresConnectionOptions;
};

const Config: ConfigType = {
  postgresDbOptions: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};

export default Config;
