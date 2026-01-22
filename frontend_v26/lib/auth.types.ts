export interface UserSafe {
  id: string;
  fullName: string;
  rollNo: string;
  collegeName: string;
  mobile: string;
  email: string;
  degree: string;
  semester: number;
  createdAt: string;
  updatedAt: string;
}

/* ──────────────────────────────
 * LOGIN
 * ────────────────────────────── */
export interface LoginRequest {
  email: string;
  password: string;
}

/* ──────────────────────────────
 * REGISTRATION
 * Request OTP
 * ────────────────────────────── */
export interface RegisterRequest {
  fullName: string;
  rollNo: string;
  collegeName: string;
  mobile: string;
  email: string;
  semester: number;
  password: string;
}

/* ──────────────────────────────
 * REGISTRATION
 * Verify OTP
 * ────────────────────────────── */
export interface VerifyRegistrationOtpRequest {
  email: string;
  otp: string;
}

/* ──────────────────────────────
 * FORGOT PASSWORD
 * ────────────────────────────── */
export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

/* ──────────────────────────────
 * RESPONSES
 * ────────────────────────────── */
export interface SuccessResponse {
  success: true;
}

export type AuthUserResponse = UserSafe;
