import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender';

export default class UpdateRewardDto {
  @IsOptional()
  @IsNumber()
  storeId: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsNumber()
  point: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  image: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  startTime: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  endTime: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  description: string;
}
