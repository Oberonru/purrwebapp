import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrelloModule } from './trello/trello.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import ormconfig from './ormconfig';
import { ColumnModule } from './column/column.module';
import { MiddlewareApp } from './middleware.app';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    JwtModule,
    AuthModule,
    TrelloModule,
    UserModule,
    ColumnModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MiddlewareApp).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
