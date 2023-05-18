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

export default class CreateOrderDetailDto {
  // @IsNumber()
  // userId: number;

  // @IsNumber()
  // storeId: number;

  @IsNumber()
  totalMoney: number;

  // @IsNumber()
  // totalPoint: number;
}
