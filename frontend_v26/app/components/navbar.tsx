"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedin, setLoggedin] = useState(true);

  // Close mobile menu on resize to avoid UI bugs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // NAVBAR CONTAINER: Absolute, Transparent, High Z-Index
    <nav className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 flex items-center justify-between">
      
      {/* 1. LEFT: LOGO */}
      <Logo />

      {/* 2. CENTER: NAVIGATION LINKS (Absolute Center) 
          Hidden on mobile (md:flex), positioned absolutely to be perfectly centered regardless of Logo width.
      */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <NavItem icon="home.svg" label="Home" />
        <NavItem icon="bill.svg" label="Event" />
        <NavItem icon="bulb.svg" label="Vision" />
        <NavItem icon="team.svg" label="Team" />
      </div>

      {/* 3. RIGHT: PROFILE & MOBILE TOGGLE */}
      <div className="flex items-center gap-4">
        {/* Profile / Login State */}
        {loggedin ? (
          <ProfileBlock logout={() => setLoggedin(false)} />
        ) : (
          <LoginButton login={() => setLoggedin(true)} />
        )}

        {/* Mobile Hamburger (Visible only on small screens) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1 z-50"
        >
          <span className={`block w-6 h-0.5 bg-white rounded transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white rounded transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* 4. MOBILE MENU DROPDOWN 
          Renders outside the flow, aligned to the right.
      */}
      {menuOpen && (
        <div className="absolute top-16 right-0 bg-[#171717] border border-[#2E2F2F] rounded-lg p-4 w-48 shadow-xl flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in md:hidden">
          <NavItem icon="home.svg" label="Home" mobile />
          <NavItem icon="bill.svg" label="Event" mobile />
          <NavItem icon="bulb.svg" label="Vision" mobile />
          <NavItem icon="team.svg" label="Team" mobile />
        </div>
      )}
    </nav>
  );
}

/* ---------------- Sub-Components ---------------- */

function Logo() {
  return (
    <div className="relative w-32 h-10 md:w-44 md:h-12 shrink-0">
      <Image
        src="/Assets/final-logo.png"
        alt="Logo"
        fill
        className="object-contain object-left"
        priority
      />
    </div>
  );
}

function NavItem({ icon, label, mobile = false }: { icon: string; label: string; mobile?: boolean }) {
  return (
    <a
      href="#"
      className={`group flex items-center gap-2 transition-colors duration-200 ${
        mobile ? "p-2 hover:bg-[#2E2F2F] rounded-md" : "hover:text-purple-400"
      }`}
    >
      {/* Icon Masking Technique */}
      <div
        className={`bg-white group-hover:bg-purple-400 transition-colors duration-200 ${mobile ? "w-5 h-5" : "w-5 h-5"}`}
        style={{
          maskImage: `url(/icons/${icon})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
        }}
      />
      <span className="font-medium text-white group-hover:text-purple-400 transition-colors">
        {label}
      </span>
    </a>
  );
}

function LoginButton({ login }: { login: () => void }) {
  return (
    <button
      onClick={login}
      className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors shadow-lg shadow-purple-900/20"
    >
      Login
    </button>
  );
}

function ProfileBlock({ logout }: { logout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-[#171717] border border-[#2E2F2F] hover:border-gray-500 rounded-lg p-1.5 md:p-2 transition-all duration-200"
      >
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium text-white">Yash Raj</div>
          <div className="text-[10px] text-gray-400">user@example.com</div>
        </div>
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-md bg-gray-600 overflow-hidden relative">
             {/* Use next/image here for real profile pic */}
             <div className="absolute inset-0 bg-linear-to-tr from-purple-500 to-indigo-500" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#171717] border border-[#2E2F2F] rounded-lg shadow-xl py-1 animate-in fade-in slide-in-from-top-1 z-50">
           {/* Mobile-only user info inside dropdown */}
          <div className="px-4 py-2 border-b border-[#2E2F2F] sm:hidden">
            <p className="text-sm font-medium text-white">Yash Raj</p>
            <p className="text-xs text-gray-400">user@example.com</p>
          </div>
          
          <a href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#2E2F2F] transition-colors">
            Profile
          </a>
          <button
            onClick={logout}
            className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-[#2E2F2F] transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}