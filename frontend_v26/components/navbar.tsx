"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import LoginComponent from "@/components/ui/LoginComponent";
import { Home, Calendar, Lightbulb, Users, LucideIcon } from "lucide-react";

interface NavLinkItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_LINKS: NavLinkItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Event", icon: Calendar },
  { href: "/vision", label: "Vision", icon: Lightbulb },
  { href: "/team", label: "Team", icon: Users },
];

function NavLink({
  href,
  children,
  icon: Icon,
  isActive,
  isMobile = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  icon: LucideIcon;
  isActive: boolean;
  isMobile?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2 relative px-3 py-2 transition-colors duration-300",
        isActive
          ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          : "text-white/80 hover:text-white",
        className
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 transition-transform duration-300",
          isActive ? "scale-110 text-purple-400" : "group-hover:scale-110 group-hover:text-purple-400"
        )}
      />
      <span className="relative font-medium tracking-wide">
        {children}
      </span>
      
      {/* Active State Sliding Underline (Desktop Only) */}
      {isActive && !isMobile && (
        <motion.span
          layoutId="navbar-active"
          className="absolute bottom-[-10px] left-3 right-3 h-[3px] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] rounded-t-full"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      {/* Hover Underline (Desktop Only, not active) */}
      {!isActive && !isMobile && (
        <span className="absolute bottom-0 left-3 right-3 w-0 h-[2px] bg-purple-500/50 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl flex justify-between items-center px-2 py-2 rounded-full transition-all duration-500 ease-in-out border border-white/10",
        scrolled
          ? "bg-white/5 backdrop-blur-md shadow-md text-white"
          : "bg-transparent text-white",
        menuOpen && "bg-black/90", // Ensure background when menu is open on mobile
      )}
    >
      {/* 1. LEFT: LOGO */}
      <div className="relative w-32 h-10 shrink-0">
        <Link href="/">
          <Image
            src="/Assets/logo_version.png"
            alt="Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
      </div>

      {/* 2. CENTER: NAVIGATION LINKS */}
      <div className="hidden md:flex gap-6 font-semibold">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.label}
            href={link.href}
            icon={link.icon}
            isActive={pathname === link.href}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* 3. RIGHT: AUTH & HAMBURGER */}
      <div className="flex gap-4">
        <LoginComponent
          menuOpen={menuOpen}
          toggleMenu={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* 4. MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="absolute top-20 right-0 left-0 mx-auto w-[95%] bg-[#0E0E0F] border border-white/10 rounded-2xl flex flex-col p-4 gap-2 md:hidden animate-in slide-in-from-top-2 fade-in shadow-2xl">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              icon={link.icon}
              isActive={pathname === link.href}
              isMobile={true}
              className="block w-full py-3 px-4 text-center hover:bg-white/5 rounded-lg text-lg font-medium"
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
