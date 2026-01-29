"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Toast, ToastProps } from "@/components/ui/Toast";
import { useAuth } from "@/src/auth/use-auth";

export default function ForgotPasswordPage() {
  const { forgotPasswordRequestOtp, resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"email" | "otp">("email"); // merged stage reset into otp
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (stage === "otp") otpRefs.current[0]?.focus();
  }, [stage]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, duration: 2000 });
  };

  // OTP input handlers
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < otpRefs.current.length - 1)
      otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
        return;
      }
      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        const next = [...otp];
        next[index - 1] = "";
        setOtp(next);
      }
    }
  };

  const handleOtpPaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    if (digits.length === 0) return;

    const next = [...otp];
    digits.forEach((digit, i) => {
      if (index + i < 6) {
        next[index + i] = digit;
      }
    });
    setOtp(next);
    
    const focusIndex = Math.min(index + digits.length, 5);
    otpRefs.current[focusIndex]?.focus();
  };

  // Step 1: send OTP
  const handleGetOtp = async () => {
    setToast(null);

    if (!email)
      return showToast("Enter your email", "error");

    setIsLoading(true);
    try {
      await forgotPasswordRequestOtp({ email });
      setStage("otp");
      showToast("OTP sent to your email", "success");
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to send OTP", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: verify OTP + reset password
  const handleResetPassword = async () => {
    setToast(null);

    const code = otp.join("");
    if (code.length !== 6)
      return showToast("Enter 6-digit OTP", "error");
    if (!newPassword || !confirmPassword)
      return showToast("Fill all password fields", "error");
    if (newPassword !== confirmPassword)
      return showToast("Passwords do not match", "error");

    setIsLoading(true);
    try {
      await resetPassword({ email, otp: code, password: newPassword });
      showToast("Password reset successful! You can now sign in.", "success");
      setStage("email");
      setOtp(["", "", "", "", "", ""]);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      showToast(
          err instanceof Error ? err.message : "Failed to reset password",
          "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isResetDisabled =
    isLoading ||
    otp.some((v) => v === "") ||
    !newPassword ||
    !confirmPassword ||
    newPassword !== confirmPassword;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  px-4 pb-5">
      <div className="w-full max-w-sm bg-transparent text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-nowrap">
          Forgot Password
        </h2>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (stage === "email") void handleGetOtp();
            else void handleResetPassword();
          }}
        >
          {/* Email field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
              required
              disabled={stage !== "email"}
            />
          </div>

          {/* Stage: email */}
          {stage === "email" && (
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
            >
              {isLoading ? "Sending OTP..." : "Get OTP"}
            </Button>
          )}

          {/* Stage: OTP + reset */}
          {stage === "otp" && (
            <>
              {/* OTP inputs */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Enter 6-digit OTP
                </label>
                <div className="flex items-center gap-2">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpRefs.current[idx] = el;
                      }}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={val}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      onPaste={(e) => handleOtpPaste(idx, e)}
                      className="w-10 h-12 text-center text-lg rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                    />
                  ))}
                </div>
              </div>

              {/* New password */}
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isResetDisabled}
                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          )}
        </form>

        {toast && <Toast {...toast} />}

        <p className="text-center text-sm text-gray-400 mt-6">
          Remembered your password?{" "}
          <Link
            href="/auth"
            className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}