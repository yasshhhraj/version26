"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { Toast, ToastProps } from "@/components/ui/Toast"

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
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<ToastProps|null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setToast({message: 'Passwords do not match', type: 'error', duration: 2000})
            setTimeout(() => setToast(null), 2000)
            return
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, college, roll, mobile, semester, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToast({message: 'Sign up successful! Please sign in.', type: 'success', duration: 2000})
                // Also keep localStorage for compatibility if needed
                localStorage.setItem('email', email)
                localStorage.setItem('password', password)
                localStorage.setItem('name', name)
                
                setTimeout(() => {
                    slideAction(); // Switch to sign in form
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
                {[1, 2, 3].map((i) => (
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

            <form onSubmit={handleSubmit}
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
                            <Button
                                type="button"
                                onClick={nextStep}
                                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                disabled={isLoading}
                            >
                                Next
                            </Button>
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

                            <div className="space-y-2">
                                <label htmlFor="roll" className="block text-sm font-medium text-gray-300">
                                    College Roll number
                                </label>
                                <input
                                    id="roll"
                                    type="text"
                                    value={roll}
                                    onChange={(e) => setRoll(e.target.value)}
                                    className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
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
                                    className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-full max-w-sm bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                    disabled={isLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                    disabled={isLoading}
                                >
                                    Next
                                </Button>
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

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    onClick={prevStep}
                                    className="w-full max-w-sm bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                    disabled={isLoading}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                                >
                                    {isLoading ? 'Signing Up...' : 'Sign Up'}
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
