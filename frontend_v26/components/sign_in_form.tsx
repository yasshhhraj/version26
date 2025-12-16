"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export function Sign_in_form({slide}: {slide: () => void}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Sign in:", { email, password })
    }

    return (
        <div className="h-full w-fit flex-1 flex items-center justify-center text-white p-4">
            <form
                onSubmit={handleSubmit}
                className="space-y-6 overflow-clip overflow-y-auto w-full max-w-sm h-full p-8  rounded-lg "
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
                    Sign In
                </h2>

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
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full max-w-sm px-4 py-3 rounded-lg transition-colors focus:outline-none bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500 backdrop-blur-sm"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg"
                >
                    Sign In
                </Button>

                <p className="text-center text-sm text-gray-400">
                    Haven&apos;t registered yet?{" "}
                    <span
                        onClick={slide}
                        className="font-medium text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    )
}
