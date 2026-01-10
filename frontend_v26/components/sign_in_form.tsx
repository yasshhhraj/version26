"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import {Toast, ToastProps} from "@/components/ui/Toast";
import {useRouter} from "next/navigation";

export function Sign_in_form({slideAction}: {slideAction: () => void}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [toast, setToast] = useState<ToastProps|null>(null);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setToast({message: 'Login Successful', type: 'success', duration: 2000})
                // Also keep localStorage for compatibility if needed, but cookies are now primary
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('email', email);
                
                setTimeout(() =>{
                    router.push('/');
                    router.refresh(); // Refresh to update server components with new cookie
                }, 1000)
            } else {
                setToast({message: data.message || 'Login Failed', type: 'error', duration: 2000})
                console.error("Login Failed", data)
                setTimeout(()=>{
                    setToast(null)
                }, 2000)
            }
        } catch (error) {
            setToast({message: 'An error occurred', type: 'error', duration: 2000})
            console.error("Login Error", error)
        } finally {
            setIsLoading(false);
        }
    }

    if (!mounted) {
        return null;
    }

    return (
        <div className="w-full flex items-center justify-center text-white">
            <form
                onSubmit={handleSubmit}
                className="space-y-4 w-full max-w-sm p-4 rounded-lg"
            >
                <div className={'mt-3 mb-8'}>
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
                        Sign In
                    </h2>
                </div>

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
                        disabled={isLoading}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                <p className="text-center text-sm text-gray-400">
                    Haven&apos;t registered yet?{" "}
                    <span
                        onClick={slideAction}
                        className="font-medium text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                        Sign Up
                    </span>
                </p>
            </form>
            {toast && <Toast {...toast}/>}
        </div>
    )
}
