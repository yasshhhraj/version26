import {
  LoginRequest,
  RegisterRequest,
  VerifyRegistrationOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthUserResponse,
  SuccessResponse,
} from "@/lib/auth.types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3333";
const PREFIX = "api/v1";

const API_URL = `${BASE_URL}/${PREFIX}`;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}/${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return res.json();
}

/* ──────────────────────────────
 * AUTH API
 * ────────────────────────────── */
export const authApi = {
  /* ───────── REGISTRATION ───────── */

  requestRegistrationOtp(data: RegisterRequest) {
    return request<SuccessResponse>("auth/register/request-otp", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyRegistrationOtp(data: RegisterRequest & VerifyRegistrationOtpRequest) {
    return request<AuthUserResponse>("auth/register/verify-otp", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /* ───────── FORGOT PASSWORD ───────── */

  requestPasswordResetOtp(data: ForgotPasswordRequest) {
    return request<SuccessResponse>("auth/forgot-password/request-otp", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resetPassword(data: ResetPasswordRequest) {
    return request<SuccessResponse>("auth/forgot-password/reset", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /* ───────── AUTH SESSION ───────── */

  login(data: LoginRequest) {
    return request<AuthUserResponse>("auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout() {
    return request<SuccessResponse>("auth/logout", {
      method: "POST",
    });
  },

  me() {
    return request<AuthUserResponse>("auth/me");
  },
};
