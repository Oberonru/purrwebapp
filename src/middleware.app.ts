import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import config from './config';

export class MiddlewareApp implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    //const [type, token] = request.headers.authorization.split(' ') ?? [];

    //const userData = this.jwtService.decode(token);
    //console.log('userData : ', userData);

    next();
  }
}
