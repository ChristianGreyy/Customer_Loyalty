import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender';

export default class CreatePersonalRewardDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  point: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  startTime: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  endTime: string;

  @IsString()
  quantity: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  description: string;
}
