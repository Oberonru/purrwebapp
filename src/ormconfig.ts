import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './user/user.entity';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: '123',
  database: 'test',
  //Users/alexey/dev/Nestjs/src/user/user.entity.ts ---path
  //entities: [__dirname + '*/**/*.entity{.ts, .js}'],
  entities: [UserEntity],
  synchronize: true,
};

export default ormconfig;
