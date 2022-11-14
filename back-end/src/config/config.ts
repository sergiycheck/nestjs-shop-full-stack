import dotenv from 'dotenv';
import path from 'node:path';

const pathEnv = path.resolve(process.cwd(), '.env');
dotenv.config({ path: pathEnv });

type ConfigType = {
  postgresDbOptions: any;
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

console.log(Config);

export default Config;
