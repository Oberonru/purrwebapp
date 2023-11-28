import { DataSourceOptions } from 'typeorm';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: '123',
  database: 'test',
  entities: [__dirname + '/**/*.entity.ts{.ts, .js}'],
  synchronize: true,
};

export default ormconfig;
