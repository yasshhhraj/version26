import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Trim()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  rollNo: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  collegeName: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  mobile: string;

  @IsEmail()
  @Trim()
  email: string;

  @IsString()
  @IsNotEmpty()
  degree: string; // enforced as "MCA" in service layer

  @IsInt()
  @Min(1)
  semester: number;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
