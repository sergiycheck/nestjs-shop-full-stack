import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Config from './src/config/config';

declare module 'typeorm/driver/postgres/PostgresConnectionOptions' {
  interface PostgresConnectionOptions {
    cli?: {
      migrationsDir: string;
    };
  }
}

export const options: PostgresConnectionOptions = {
  ...Config.postgresDbOptions,
  entities: ['entities/*.entity.ts'],
  migrationsRun: true,
  migrationsTableName: 'typeorm_migrations',
  cli: {
    migrationsDir: 'migrations',
  },
};

export default new DataSource(options);
