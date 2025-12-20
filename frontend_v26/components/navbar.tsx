'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import LoginComponent from "@/components/ui/LoginComponent";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);



  // Close mobile menu on resize to avoid UI bugs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
//
//   I have this Liquid-glass built using the David UI Tailwind CSS Library by Creative Tim. Integrate the component in my project. There are more details on the Framework Documentation at https://www.creative-tim.com/david-ui/docs/html/liquid-glass .
//
//       Component Code:
//       ```html
//
//           <div class="flex items-center justify-center w-screen min-h-[400px] bg-cover bg-center bg-no-repeat rounded-md" style="background-image: url('https://images.unsplash.com/photo-1694637449947-cfe5552518c2?w=800&auto=format&fit=crop&q=90');">
//             <div class="flex gap-2 max-w-md bg-black/20 backdrop-blur-sm border border-white/50 rounded-xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-3 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none">
//               <div class="flex flex-col items-center gap-1">
//                 <button class="h-12 w-12 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center p-2 text-white text-sm font-medium rounded-lg bg-white/2.5 border border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-white/30 transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition antialiased">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
//                     <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
//                     <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
//                   </svg>
//                 </button>
//                 <span class="text-xs">Mail</span>
//               </div>
//               <div class="flex flex-col items-center gap-1">
//                 <button class="h-12 w-12 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center p-2 text-white text-sm font-medium rounded-lg bg-white/2.5 border border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-white/30 transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition antialiased">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
//                     <path fill-rule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clip-rule="evenodd" />
//                   </svg>
//                 </button>
//                 <span class="text-xs">Music</span>
//               </div>
//               <div class="flex flex-col items-center gap-1">
//                 <button class="h-12 w-12 inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center p-2 text-white text-sm font-medium rounded-lg bg-white/2.5 border border-white/50 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] hover:bg-white/30 transition-all duration-300 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none transition antialiased">
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
//                     <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd" />
//                   </svg>
//                 </button>
//                 <span class="text-xs">Apps</span>
//               </div>
//             </div>
//           </div>
//
// ```



  return (
    // NAVBAR CONTAINER: Absolute, Transparent, High Z-Index
    <nav className="   border border-white/50 p-2 px-3 md:px-10 bg-black/20 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] rounded-lg md:rounded-full bg-linear-to-br from-white/20 via-transparent to-white/20                       absolute top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 flex items-center justify-between">

      {/* 1. LEFT: LOGO */}
      {/* Invert logo in light mode to make white text black */}
      <Logo className=" transition-all" />

      {/* 2. CENTER: NAVIGATION LINKS (Absolute Center)
          Hidden on mobile (md:flex), positioned absolutely to be perfectly centered regardless of Logo width.
      */}
      <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
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
        <div className="absolute top-17 right-0  dark:bg-[#171717]/95 dark:border-[#2E2F2F] w-48 flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in         border border-white/50   bg-black/20 backdrop-blur-sm shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] rounded-lg md:rounded-full bg-linear-to-br from-white/20 via-transparent to-white/20           md:hidden">
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
    <div className={`relative w-32 h-10 md:w-44 md:h-12 shrink-0 ${className}`}>
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
        mobile ? "p-3 hover:bg-gray-100 dark:hover:bg-[#2E2F2F]/20 rounded-md" : "hover:text-purple-600 dark:hover:text-purple-400"
      }`}
    >
      {/* Icon Masking Technique */}
      <div
        className={`bg-gray-700 dark:bg-white group-hover:bg-purple-600 dark:group-hover:bg-purple-400 transition-colors duration-200 ${mobile ? "w-5 h-5" : "w-5 h-5"}`}
        style={{
          maskImage: `url(/icons/${icon})`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
        }}
      />
      <span className="text-xl md:font-medium text-gray-700 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
        {label}
      </span>
    </a>
  );
}

