"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Toast, ToastProps } from "@/components/ui/Toast";
import { useAuth } from "@/src/auth/use-auth";

export function Sign_up_form({ slideAction }: { slideAction: () => void }) {
  const { registerRequestOtp, registerVerifyOtp } = useAuth();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [roll, setRoll] = useState("");
  const [mobile, setMobile] = useState("");
  const [semester, setSemester] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ───────────────── OTP helpers (unchanged) ───────────────── */

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
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
        document.getElementById(`otp-${index - 1}`)?.focus();
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
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (!digits.length) return;

    const next = [...otp];
    for (let i = 0; i < digits.length && index + i < 6; i++) {
      next[index + i] = digits[i];
    }
    setOtp(next);
    document
      .getElementById(`otp-${Math.min(index + digits.length, 5)}`)
      ?.focus();
  };

  /* ───────────────── STEP 1–3 → REQUEST OTP ───────────────── */

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (password !== confirmPassword) {
      setToast({
        message: "Passwords do not match",
        type: "error",
        duration: 2000,
      });
      setTimeout(() => setToast(null), 2000);
      return;
    }

    setIsLoading(true);

    try {
      await registerRequestOtp({
        fullName: name,
        rollNo: roll,
        collegeName: college,
        mobile,
        email,
        semester: Number(semester),
        password,
      });

      setStep(4);
      setToast({
        message: "OTP sent to your email",
        type: "success",
        duration: 2000,
      });
    } catch (err: Error | unknown) {
      setToast({
        message:
          (err instanceof Error ? err.message : "Failed to send OTP") ||
          "Failed to send OTP",
        type: "error",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  /* ───────────────── STEP 4 → VERIFY OTP ───────────────── */

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) {
      setToast({ message: "Invalid OTP", type: "error", duration: 2000 });
      setTimeout(() => setToast(null), 2000);
      return;
    }

    setIsLoading(true);

    try {
      await registerVerifyOtp({
        fullName: name,
        rollNo: roll,
        collegeName: college,
        mobile,
        email,
        semester: Number(semester),
        password,
        otp: code,
      });

      setToast({
        message: "Registration successful!",
        type: "success",
        duration: 2000,
      });
      setTimeout(slideAction, 2000);
    } catch (err: unknown) {
      setToast({
        message: err instanceof Error ? err.message : "OTP verification failed",
        type: "error",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  if (!mounted) return null;

  /* ───────────────── UI BELOW — UNCHANGED ───────────────── */

  const transition = { duration: 0.3, ease: "easeInOut" as const };

  return (
    <div className="w-full flex items-center justify-center text-white relative">
      {/* Step Indicator */}
      <div className="absolute top-4 right-4 flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full ${
              i <= step ? "bg-blue-500" : "bg-white/20"
            }`}
            initial={false}
            animate={{
              width: i === step ? 24 : 8,
              backgroundColor:
                i <= step ? "#3b82f6" : "rgba(255, 255, 255, 0.2)",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      <form
        onSubmit={step === 4 ? handleVerifyOTP : handleSubmitDetails}
        className="space-y-4 w-full max-w-sm p-4 rounded-lg "
      >
        <div className={"mt-3 mb-8"}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
            Sign Up
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={transition}
              className="space-y-4"
            >
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
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-300"
                >
                  Mobile number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={transition}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor="college"
                  className="block text-sm font-medium text-gray-300"
                >
                  College name
                </label>
                <input
                  id="college"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="roll"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Roll number
                  </label>
                  <input
                    id="roll"
                    type="text"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Semester
                  </label>
                  <input
                    id="semester"
                    type="number"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={transition}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                  required
                  disabled={isLoading}
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-400">
                    Passwords do not match.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step < 4 && (
            <motion.div
              key={`buttons-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4"
            >
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  className="w-full max-w-sm bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                  disabled={isLoading}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{step === 3 ? "Sending OTP..." : "Loading..."}</span>
                  </>
                ) : (
                  "Next"
                )}
              </Button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={transition}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Enter 6-digit OTP sent to your email
                </label>
                <div className="flex items-center justify-between gap-2">
                  {otp.map((val, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
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

              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-full max-w-sm bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                  disabled={isLoading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isLoading || otp.some((v) => v === "")}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    "Verify & Sign Up"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-gray-400">
          Already a user?{" "}
          <span
            onClick={slideAction}
            className="font-medium text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </form>
      {toast && <Toast {...toast} />}
    </div>
  );
}
