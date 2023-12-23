import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { TrelloController } from './trello.controller';
import { TrelloService } from './trello.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

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
