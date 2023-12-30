import { IsNumber, IsString } from 'class-validator';

export class ColumnDto {
  @IsString()
  name?: string;

  /* @IsNumber()
  userId: number; */
}
