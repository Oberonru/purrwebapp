import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ColumnModule } from 'src/column/column.module';

@Module({
  imports: [ColumnModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
