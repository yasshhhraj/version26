"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AuthContext } from "./auth.context";
import { authApi } from "@/lib/auth.api";
import type {
  AuthUserResponse,
  LoginRequest,
  RegisterRequest,
  VerifyRegistrationOtpRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "@/lib/auth.types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ──────────────────────────────
   * Load user on app start
   * ────────────────────────────── */
  const refreshUser = useCallback(async () => {
    try {
      const me = await authApi.me();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  /* ──────────────────────────────
   * AUTH ACTIONS
   * ────────────────────────────── */
  const login = async (data: LoginRequest) => {
    const loggedInUser = await authApi.login(data);
    setUser(loggedInUser);
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  /* ──────────────────────────────
   * REGISTRATION
   * ────────────────────────────── */
  const registerRequestOtp = async (data: RegisterRequest) => {
    await authApi.requestRegistrationOtp(data);
  };

  const registerVerifyOtp = async (
    data: RegisterRequest & VerifyRegistrationOtpRequest,
  ) => {
    const newUser = await authApi.verifyRegistrationOtp(data);
    setUser(newUser); // auto-login after register
  };

  /* ──────────────────────────────
   * FORGOT PASSWORD
   * ────────────────────────────── */
  const forgotPasswordRequestOtp = async (data: ForgotPasswordRequest) => {
    await authApi.requestPasswordResetOtp(data);
  };

  const resetPassword = async (data: ResetPasswordRequest) => {
    await authApi.resetPassword(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,

        login,
        logout,

        registerRequestOtp,
        registerVerifyOtp,

        forgotPasswordRequestOtp,
        resetPassword,

        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
