import {
  Controller,
  Body,
  Post,
  Req,
  UseGuards,
  Get,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { ColumnDto } from './dto/column.dto';
import { ColumnService } from './column.service';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ColumnEntity } from './column.entity';

@Controller('users/:userId/columns')
@UseGuards(AuthGuard)
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post('create_column')
  createColumn(@Body() columnDto: ColumnDto, @Req() request: Request) {
    const { userId } = request['userPayload'];
    return this.columnService.createColumn(columnDto, userId);
  }

  @Get(':columnId')
  getColumn(
    @Param('userId') userId: string,
    @Param('columnId') columnId: string,
    @Req() request: Request,
  ): Promise<ColumnEntity> {
    const payload = request['userPayload'];

    if (parseInt(userId) !== payload.userId) {
      throw new ForbiddenException();
    }

    return this.columnService.getColumn(userId, columnId);
  }

  @Get(':colummnId/remove')
  remove(@Param('userId') userId: string, @Param('columnId') columnId: string) {
    return this.columnService.remove(userId, columnId);
  }
}
