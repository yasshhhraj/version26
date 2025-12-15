"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export function Sign_up_form({slide}: {slide: () => void}) {
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [college, setCollege] = useState("")
    const [roll, setRoll] = useState("")
    const [mobile, setMobile] = useState("")
    const [semester, setSemester] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (step < 3) return
        if (password !== confirmPassword) {
            console.error("Passwords do not match")
            return
        }
        console.log("Sign up:", { email, name, college, roll, mobile, semester, password })
    }

    return (
        <div className="h-full w-full flex items-center justify-center text-white p-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full max-w-sm p-8 rounded-lg min-h-[60vh] md:min-h-0"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
                    Sign Up
                </h2>
                <p className="text-center text-sm text-gray-400 mb-6">Step {step} of 3</p>

                {/* Animated steps container */}
                <div className="relative overflow-hidden flex-1 min-h-80 md:min-h-[24rem]">
                    {/* Step 1 */}
                    <div
                        aria-hidden={step !== 1}
                        className={
                            "absolute inset-0 w-full transition-all duration-500 ease-out  space-y-4 flex flex-col " +
                            (step === 1
                                ? "translate-x-0 opacity-100 pointer-events-auto"
                                : step === 2 || step === 3
                                ? "-translate-x-full opacity-0 pointer-events-none"
                                : "")
                        }
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
                            />
                        </div>

                        <div className="mt-auto flex gap-4 pt-2">
                            <Button
                                type="button"
                                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                onClick={() => setStep(2)}
                                disabled={!email || !name || !mobile}
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div aria-hidden={step !== 2}
                         className={
                            "absolute inset-0 w-full transition-all duration-500 ease-out space-y-4 flex flex-col " +
                            (step === 1
                                ? "translate-x-full opacity-0 pointer-events-none"
                                : step === 2
                                ? "translate-x-0 opacity-100 pointer-events-auto"
                                : step === 3
                                ? "-translate-x-full opacity-0 pointer-events-none"
                                : "")
                        }
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
                            />
                        </div>

                        <div className="mt-auto flex gap-4 pt-2">
                            <Button
                                type="button"
                                className="w-full max-w-sm bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                onClick={() => setStep(1)}
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                onClick={() => setStep(3)}
                                disabled={!college || !roll || !semester}
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div aria-hidden={step !== 3}
                        className={
                            "absolute inset-0 w-full transition-all duration-500 ease-out space-y-4 flex flex-col " +
                            (step === 3
                                ? "translate-x-0 opacity-100 pointer-events-auto"
                                : "translate-x-full opacity-0 pointer-events-none")
                        }
                    >
                        <div className="space-y-2">
                            <label htmlFor="email-readonly" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                id="email-readonly"
                                type="email"
                                value={email}
                                readOnly
                                className="w-full max-w-sm px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 backdrop-blur-sm read-only:opacity-80"
                            />
                        </div>

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
                            />
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-xs text-red-400">Passwords do not match.</p>
                            )}
                        </div>

                        <div className="mt-auto flex gap-4 pt-2">
                            <Button
                                type="button"
                                className="w-full max-w-sm bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                onClick={() => setStep(2)}
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                                disabled={!password || !confirmPassword || password !== confirmPassword}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-400">
                    Already a user?{" "}
                    <span
                        onClick={slide}
                        className="font-medium text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                        Sign In
                    </span>
                </p>
            </form>
        </div>
    )
}
