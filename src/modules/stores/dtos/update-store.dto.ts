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
import { Rank } from 'src/common/enums/rank';
import { TypePoint } from '../../../common/enums/typePoint';

export default class UpdateStoreDto {
  @IsOptional()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'Invalid email',
  })
  @MinLength(4)
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsEnum(TypePoint, { message: 'Invalid type point of store' })
  typePoint: string;

  @IsOptional()
  @IsNumber()
  bronzeDiscount: number;

  @IsOptional()
  @IsNumber()
  silverDiscount: number;

  @IsOptional()
  @IsNumber()
  goldenDiscount: number;

  @IsOptional()
  @IsNumber()
  maxPoint: number;

  @IsOptional()
  @IsNumber()
  bronzePoint: number;

  @IsOptional()
  @IsNumber()
  silverPoint: number;

  @IsOptional()
  @IsNumber()
  goldenPoint: number;

  @IsOptional()
  @IsNumber()
  miniumMoney: number;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
