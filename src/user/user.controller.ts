import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ColumnDto } from 'src/column/dto/column.dto';

@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {}
