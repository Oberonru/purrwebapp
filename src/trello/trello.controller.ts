import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { TrelloService } from './trello.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';

const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
const appName = 'Trello OAuth Example';
const scope = 'read';
const expiration = '1hour';

@UseGuards(AuthGuard)
@Controller('trello')
export class TrelloController {
  constructor(private readonly trelloService: TrelloService) {}

  @Get('link')
  async link(@Res() response: Response) {
    const token = await this.trelloService.link();

    response.redirect(
      `${authorizeURL}?oauth_token=${token}&name=${appName}&scope=${scope}&expiration=${expiration}`,
    );
  }

  @Get('callback')
  async callback(
    @Query('oauth_token') token: string,
    @Query('oauth_verifier') verifier: string,
  ) {
    return await this.trelloService.callback(token, verifier);
  }
}
