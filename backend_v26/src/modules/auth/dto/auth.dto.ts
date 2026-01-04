import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Trim } from 'src/common/decorators/trim.decorator';

/* ──────────────────────────────
 * LOGIN
 * ────────────────────────────── */
export class LoginDto {
  @IsEmail()
  @Trim()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

/* ──────────────────────────────
 * REGISTRATION
 * Collect full data & send OTP
 * ────────────────────────────── */
export class RegisterRequestDto {
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
  @IsNotEmpty()
  @Trim()
  email: string;

  @IsInt()
  @Min(1)
  semester: number;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

/* ──────────────────────────────
 * REGISTRATION
 * Verify OTP & finalize registration
 * ────────────────────────────── */
export class VerifyRegistrationOtpDto {
  @IsEmail()
  @Trim()
  email: string;

  @IsNotEmpty()
  otp: string;
}

// Forgot password – request OTP
export class ForgotPasswordRequestDto {
  @IsEmail()
  @Trim()
  email: string;
}

// Forgot password – verify OTP + new password
export class ResetPasswordDto {
  @IsEmail()
  @Trim()
  email: string;

  @IsNotEmpty()
  otp: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
