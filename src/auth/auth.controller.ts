import { Controller, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
const appName = 'Trello OAuth Example';
const scope = 'read';
const expiration = '1hour';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(@Res() response: Response) {
    const token = await this.authService.login();

    response.redirect(
      `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`,
    );
  }

  async callback(@Query('oauth_token') token: string, @Query('oauth_verifier') verifier: string) {
        return await this.authService.callback(token, verifier);
  }
}



