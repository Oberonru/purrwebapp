import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './column.entity';
import { Repository } from 'typeorm';
import { ColumnDto } from './dto/column.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnRepository: Repository<ColumnEntity>,
  ) {}

  async createColumn(dto: ColumnDto, userId) {
    const existName = await this.columnRepository.findOne({
      where: { name: dto.name },
    });

    if (existName) {
      return 'this name is exist';
    }

    const columnEntity = new ColumnEntity();
    columnEntity.userId = userId;
    columnEntity.name = dto.name;

    return this.columnRepository.save(columnEntity);
  }

  async getColumn(userId, coumnId) {
    const column = await this.columnRepository.findOne({
      where: {
        userId,
        id: coumnId,
      },
    });

    if (column === null) {
      throw new ForbiddenException();
    }

    return column;
  }

  async remove(userId, columnId) {}
}
