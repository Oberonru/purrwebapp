import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { TrelloController } from './trello.controller';
import { TrelloService } from './trello.service';
import { UserEntity } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    HttpModule,
    JwtModule,
  ],
  controllers: [TrelloController],
  providers: [TrelloService],
})
export class TrelloModule {}
