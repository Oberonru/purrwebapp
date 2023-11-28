import { Injectable, Logger, Res } from '@nestjs/common';
import { response } from 'express';
import { OAuth } from 'oauth';

const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
const key = '3f06054f19b7002c4f55424fb1d20b26';
const secret =
  'd1d2e9849fb7abe6f444175bcb9f266a03720a6dc846d33b1c786a769dea0766';
const loginCallback = `http://localhost:3000/auth/callback`;

@Injectable()
export class AuthService {
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
        //если нет пользозвателя - create иначе update в бд
        this.oauthSecrets[token] = tokenSecret;
        resolve(token);
      }),
    );
  }

  callback(token, verifier): Promise<string> {
    return new Promise((resolve, reject) => {

      //получаю пользователя и его tokenSecret, иначе 401 ошибка
      const tokenSecret = this.oauthSecrets[token];

      this.oauth.OAuthGetAccessToken(
        token,
        tokenSecret,
        verifier,
        function (error, accessToken, accessTokenSecret, results) {
          //записываю текущему пользователю accessToken, accessTokenSecret
          //подписываю jwt и возвращаю accessToken пользоавтелю
          resolve(accessToken);
        },
      );
    });
  }
}
