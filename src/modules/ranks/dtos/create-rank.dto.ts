import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class CreateRankDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsNumber()
  point: number;
}
