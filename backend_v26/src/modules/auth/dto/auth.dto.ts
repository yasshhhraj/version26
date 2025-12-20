import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class LoginDto {
  @IsEmail()
  @Trim()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
