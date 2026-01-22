import { createContext } from "react";
import type {
  AuthUserResponse,
  LoginRequest,
  RegisterRequest,
  VerifyRegistrationOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/lib/auth.types";

export interface AuthContextValue {
  user: AuthUserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;

  registerRequestOtp: (data: RegisterRequest) => Promise<void>;
  registerVerifyOtp: (
    data: RegisterRequest & VerifyRegistrationOtpRequest,
  ) => Promise<void>;

  forgotPasswordRequestOtp: (data: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;

  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
