"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Toast, ToastProps } from "@/components/ui/Toast";
import { useAuth } from "@/src/auth/use-auth";

export function Sign_in_form({ slideAction }: { slideAction: () => void }) {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });

      setToast({
        message: "Login successful!",
        type: "success",
        duration: 2000,
      });
      window.dispatchEvent(new Event("auth-change")); // in case some global listeners are watching

      setTimeout(() => {
        router.push("/");
        router.refresh(); // refresh server components to pick up new cookie
      }, 1000);
    } catch (err: unknown) {
      setToast({
        message: err instanceof Error ? err.message : "Login failed",
        type: "error",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(null), 2000);
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-sm p-4 rounded-lg"
      >
        <div className="mt-3 mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">
            Sign In
          </h2>
        </div>

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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <span
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
            >
              Forgot Password?
            </span>
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
          className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing In...</span>
            </>
          ) : (
            "Sign In"
          )}
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

      {toast && <Toast {...toast} />}
    </div>
  );
}
