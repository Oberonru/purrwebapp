import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/authDto';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
