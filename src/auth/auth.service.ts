import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth } from 'oauth';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserDto } from 'src/user/dto/user.dto';
import { sign } from 'jsonwebtoken';

const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
const key = '3f06054f19b7002c4f55424fb1d20b26';
const secret =
  'd1d2e9849fb7abe6f444175bcb9f266a03720a6dc846d33b1c786a769dea0766';
const loginCallback = `http://localhost:3000/auth/callback`;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly httpService: HttpService,
  ) {}

  oauthSecrets: Record<string, string> = {};

  oauth = new OAuth(
    requestURL,
    accessURL,
    key,
    secret,
    '1.0A',
    loginCallback,
    'HMAC-SHA1',
  );

  login(): Promise<string> {
    return new Promise((resolve, reject) =>
      this.oauth.getOAuthRequestToken((error, token, tokenSecret, results) => {
        // временно сохранить токены в кэш (Redis)
        this.oauthSecrets[token] = tokenSecret;
        resolve(token);
      }),
    );
  }

  callback(token, verifier): Promise<string> {
    return new Promise((resolve, reject) => {
      //получаю пользователя и его tokenSecret, иначе 401 ошибка
      const tokenSecret = this.oauthSecrets[token];

      this.oauth.getOAuthAccessToken(
        token,
        tokenSecret,
        verifier,
        async (error, accessToken, accessTokenSecret, results) => {
          //записываю текущему пользователю accessToken, accessTokenSecret
          //подписываю jwt и возвращаю accessToken пользоавтелю
          //error && console.log('error', error);

          const url = `https://api.trello.com/1/members/me/?key=${key}&token=${accessToken}`;

          const response = await firstValueFrom(this.httpService.get(url));

          const { data } = response; // получил пользователя

          const me = this.userRepository.find({
            where: {
              trelloId: data.id,
            },
          });

          const newUser = new UserDto();
          newUser.trelloId = data.id;
          newUser.accessToken = accessToken;
          newUser.accessTokenSecret = accessTokenSecret;

          // проверяешь в базе: есть ли пользователь в таблице users, поле trelloId пользователь с data.id
          // если пользователя нет, то создаёшь и сохраняешь accessToken, accessTokenSecret
          // если пользователь есть, то обновляешь ему accessToken, accessTokenSecret
          if ((await me).length === 0) {
            this.userRepository.save(newUser);
          } else {
            this.userRepository
              .createQueryBuilder()
              .update(UserEntity)
              .set({ accessToken, accessTokenSecret })
              .where({ trelloId: data.id })
              .execute();
          }

          const jwtToken = sign({ id: data.id }, 'Werry-secret-KEY');

          // формируешь JWT-токен с payload = { userId }, где userId - id в таблице users (не trelloId)
          // возвращаешь позователю JWT-токен, с которым он дальше обращается ко всем API твоего приложения
          // (отправляется, например, в хэдере Authorization: Bearer <jwtToken>)
          resolve(jwtToken);
        },
      );
    });
  }
}
