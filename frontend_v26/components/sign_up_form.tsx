"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { Toast, ToastProps } from "@/components/ui/Toast"

import {Loader} from "@/components/ui/Loader";

export function Sign_up_form({slideAction}: {slideAction: () => void}) {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [college, setCollege] = useState("")
    const [roll, setRoll] = useState("")
    const [mobile, setMobile] = useState("")
    const [semester, setSemester] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<ToastProps|null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, "").slice(0, 1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);
        if (digit && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                const next = [...otp];
                next[index] = "";
                setOtp(next);
                return;
            }
            if (index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`);
                prevInput?.focus();
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
        document.getElementById(`otp-${nextIndex}`)?.focus();
    };

    const handleSubmitDetails = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step < 3) {
            nextStep();
            return;
        }
        if (password !== confirmPassword) {
            setToast({message: 'Passwords do not match', type: 'error', duration: 2000})
            setTimeout(() => setToast(null), 2000)
            return
        }

        setIsLoading(true);
        // Mock sending OTP
        setTimeout(() => {
            setIsLoading(false);
            setStep(4);
            setToast({message: 'OTP sent to your email', type: 'success', duration: 2000})
            setTimeout(() => setToast(null), 2000)
        }, 1000);
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length !== 6) {
            setToast({message: 'Please enter a valid 6-digit OTP', type: 'error', duration: 2000})
            setTimeout(() => setToast(null), 2000)
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, college, roll, mobile, semester, password, otp: code }),
            });

            const data = await response.json();

            if (response.ok) {
                setToast({message: 'Sign up successful! Please sign in.', type: 'success', duration: 2000})
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                localStorage.setItem('name', name)
                
                setTimeout(() => {
                    slideAction();
                }, 2000);
            } else {
                setToast({message: data.message || 'Sign up failed', type: 'error', duration: 2000})
                setTimeout(() => setToast(null), 2000)
            }
        } catch (error) {
            setToast({message: 'An error occurred during sign up', type: 'error', duration: 2000})
            console.error("Sign up error", error)
            setTimeout(() => setToast(null), 2000)
        } finally {
            setIsLoading(false);
        }
    }

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    if (!mounted) {
        return null;
    }

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
                            backgroundColor: i <= step ? "#3b82f6" : "rgba(255, 255, 255, 0.2)"
                        }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>

            <form onSubmit={step === 4 ? handleVerifyOTP : handleSubmitDetails}
                className="space-y-4 w-full max-w-sm p-4 rounded-lg "
            >
                <div className={'mt-3 mb-8'}>
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
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
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
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">
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
                                <label htmlFor="college" className="block text-sm font-medium text-gray-300">
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
                                    <label htmlFor="roll" className="block text-sm font-medium text-gray-300">
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
                                    <label htmlFor="semester" className="block text-sm font-medium text-gray-300">
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
                                    <p className="text-xs text-red-400">Passwords do not match.</p>
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
                                        <span>{step === 3 ? 'Sending OTP...' : 'Loading...'}</span>
                                    </>
                                ) : 'Next'}
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
                                    disabled={isLoading || otp.some(v => v === "")}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Verifying...</span>
                                        </>
                                    ) : 'Verify & Sign Up'}
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
            {toast && <Toast {...toast}/>}
        </div>
    )
}
