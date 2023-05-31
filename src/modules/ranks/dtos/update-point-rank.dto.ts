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
import { Rank } from '../../../common/enums/rank';

export default class UpdatePointRankDto {
  @IsEnum(Rank, { message: 'Invalid rank' })
  rank: Rank;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  point: number;

  @IsOptional()
  @IsNumber()
  maxPoint: number;
}
