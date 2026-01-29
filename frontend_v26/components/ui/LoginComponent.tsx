"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/auth/use-auth";

export default function LoginComponent({
  menuOpen,
  toggleMenuAction,
}: {
  menuOpen: boolean;
  toggleMenuAction: () => void;
}) {
  const { user, logout: authLogout, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    refreshUser(); // sync user on mount
  }, [refreshUser]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authLogout();
      window.dispatchEvent(new Event("auth-change"));
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <ProfileBlock
          user={user}
          logout={handleLogout}
          onNavClick={() => menuOpen && toggleMenuAction()}
        />
      ) : (
        <LoginButton onClick={() => menuOpen && toggleMenuAction()} />
      )}

      {/* Mobile Hamburger */}
      <button
        onClick={toggleMenuAction}
        className="md:hidden flex flex-col gap-1.5 p-1 mr-2 z-50"
      >
        <span
          className={`block w-6 h-0.5 bg-white rounded transition-transform ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white rounded transition-opacity ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-white rounded transition-transform ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>
    </div>
  );
}

function LoginButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/auth"
      onClick={onClick}
      className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition-colors shadow-lg shadow-purple-900/20"
    >
      Login
    </Link>
  );
}

function ProfileBlock({
  user,
  logout,
  onNavClick,
}: {
  user: { fullName: string; email: string };
  logout: () => Promise<void>;
  onNavClick?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
      if (onNavClick) onNavClick();
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 bg-black/10 shadow-2xl rounded-full overflow-clip"
      >
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium text-white">{user.fullName}</div>
          <div className="text-[10px] text-gray-400">{user.email}</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 bg-linear-to-tr from-purple-500 to-indigo-500" />
          <span className="relative text-white font-bold text-sm uppercase">
            {user.fullName.charAt(0)}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute glassmorphism top-[110%] right-0 mt-2 w-48 bg-[#171717] border border-[#2E2F2F] rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-1 z-50">
          {/* Mobile-only user info */}
          <div className="px-4 py-2 border-b border-[#2E2F2F] sm:hidden">
            <p className="text-sm font-medium text-white">{user.fullName}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>

          <Link
            href="/profile"
            onClick={() => {
              setIsOpen(false);
              if (onNavClick) onNavClick();
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#2E2F2F] transition-colors"
          >
            Profile
          </Link>
          <button
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-[#2E2F2F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
