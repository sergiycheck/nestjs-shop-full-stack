import { DataSource, DataSourceOptions } from 'typeorm';
import Config from './src/config/config';

export const options: DataSourceOptions = {
  ...Config.postgresDbOptions,
  // adds entities to entities array with forFeature method
  autoLoadEntities: true,
  migrationsRun: true,
  logging: true,
  migrationsTableName: 'typeorm_migrations',
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export default new DataSource(options);
