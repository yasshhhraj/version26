'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LoginComponent from "@/components/ui/LoginComponent";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const checkPopup = () => {
      setIsPopupVisible(document.body.style.overflow === 'hidden');
    };

    // Initial check
    checkPopup();

    // Create a MutationObserver to watch for style changes on body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          checkPopup();
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);



  // Close mobile menu on resize to avoid UI bugs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // NAVBAR CONTAINER: Fixed, Transparent, High Z-Index
    <nav className={
          "glassmorphism h-14"
        +" py-1 px-2 lg:px-6 lg:rounded-full fixed top-5 lg:top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 flex items-center justify-between "
        +" rounded-lg transition-transform duration-500 "
        + (isPopupVisible ? " -translate-y-[200%] " : " translate-y-0 ")
    }>

      {/* 1. LEFT: LOGO */}
      {/* Invert logo in light mode to make white text black */}
      <Logo className=" transition-all" />

      {/* 2. CENTER: NAVIGATION LINKS (Absolute Center)
          Hidden on mobile (md:flex), positioned absolutely to be perfectly centered regardless of Logo width.
      */}
      <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        <NavItem icon="home.svg" path="/" label="Home" />
        <NavItem icon="bill.svg" path="/events" label="Event" />
        <NavItem icon="bulb.svg" path="/vision" label="Vision" />
        <NavItem icon="team.svg" path="/team" label="Team" />
      </div>

      {/* 3. RIGHT: PROFILE & MOBILE TOGGLE */}
      <LoginComponent menuOpen={menuOpen} toggleMenu={() => setMenuOpen((prev) => !prev)} />

      {/* 4. MOBILE MENU DROPDOWN
          Renders outside the flow, aligned to the right.
      */}
      {menuOpen && (
        <div className=" glassmorphism absolute lg:hidden top-15 right-0 bg-black/55  border border-[#2E2F2F] w-48 flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in rounded-lg  lg:rounded-full">
          <NavItem icon="home.svg" path="/" label="Home" mobile />
          <NavItem icon="bill.svg" path="/events" label="Event" mobile />
          <NavItem icon="bulb.svg" path="/vision" label="Vision" mobile />
          <NavItem icon="team.svg" path="/team" label="Team" mobile />
        </div>
      )}
    </nav>
  );
}

/* ---------------- Sub-Components ---------------- */

function Logo({ className }: { className?: string }) {
  return (
    <div className={`relative w-32 lg:w-38 h-10 shrink-0 transition-all duration-500 ${className}`}>
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

function NavItem({ icon, label, path='#', mobile = false }: { icon: string; path: string; label: string; mobile?: boolean }) {
  return (
    <a
      href={path}
      className={`group flex items-center gap-2 transition-colors duration-200 ${
        mobile ? "p-3 hover:bg-[#2E2F2F]/20 rounded-md" : "hover:text-purple-400"
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
      <span className="text-xl md:font-medium text-white group-hover:text-purple-400 transition-colors">
        {label}
      </span>
    </a>
  );
}
