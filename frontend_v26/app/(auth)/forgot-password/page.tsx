"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  // stages: email -> otp -> reset
  const [stage, setStage] = useState<"email" | "otp" | "reset">("email");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    // Placeholder: Request OTP from backend
    setStage("otp");
    setMessage("An OTP has been sent to your email (mock). Please verify it.");
  };

  useEffect(() => {
    if (stage === "otp") {
      // focus first box when entering OTP stage
      otpRefs.current[0]?.focus();
    }
  }, [stage]);

  const handleOtpChange = (index: number, value: string) => {
    // allow only single numeric digit
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // clear current value first
        const next = [...otp];
        next[index] = "";
        setOtp(next);
        return; // keep focus here
      }
      // move to previous if current is empty
      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        const next = [...otp];
        next[index - 1] = "";
        setOtp(next);
      }
    }
  };

  const handleOtpPaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const digits = text.replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;
    const next = [...otp];
    for (let i = 0; i < digits.length && index + i < 6; i++) {
      next[index + i] = digits[i];
    }
    setOtp(next);
    const nextIndex = Math.min(index + digits.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const code = otp.join("");
    if (code.length !== 6 || /\D/.test(code)) {
      setError("Please enter the 6-digit OTP.");
      return;
    }
    // Dummy verification success
    setMessage("OTP verified (mock). You can now set a new password.");
    setStage("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Placeholder: Submit new password with OTP to backend
    setMessage("Password has been reset (mock). You can now sign in.");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm bg-transparent text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Forgot Password
        </h2>

        <form className="space-y-6" onSubmit={
          stage === "email" ? handleGetOtp : stage === "otp" ? handleVerifyOtp : handleResetPassword
        }>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
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

          {stage === "email" && (
            <Button
              type="submit"
              className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
            >
              Get OTP
            </Button>
          )}

          {stage === "otp" && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Enter 6-digit OTP
                </label>
                <div className="flex items-center gap-2">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
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

              <Button
                type="submit"
                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
              >
                Verify OTP
              </Button>
            </>
          )}

          {stage === "reset" && (
            <>
              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
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
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
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
                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
              >
                Reset Password
              </Button>
            </>
          )}
        </form>

        {(error || message) && (
          <p className={`mt-4 text-sm ${error ? "text-red-400" : "text-green-400"}`}>
            {error ?? message}
          </p>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          Remembered your password?{" "}
          <Link href="/auth" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
