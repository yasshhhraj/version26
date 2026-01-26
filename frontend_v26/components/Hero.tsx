"use client";
import { ArrowUpRight, Mail } from "lucide-react";

interface HeroProps {
  data: {
    badge: string;
    mainTitle: string; // COGNIX
    subtitle: string;  // VERSION '26
    tagline: string;   // INTELLIGENCE WITHOUT LIMITS
    description: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
}

export default function Hero({ data }: HeroProps) {
  // Fallback if data is missing (e.g. during dev/refactor)
  if (!data) return null;

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden z-10">
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 mt-[-5vh]">
        
        {/* EST Badge */}
        <div className="mb-8">
          <span className="px-5 py-1.5 rounded-full border border-white/20 text-white/80 text-xs md:text-sm font-mono tracking-widest bg-white/5 backdrop-blur-sm">
            {data.badge}
          </span>
        </div>

        {/* Version Subtitle */}
        <h2 className="text-white/60 text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-2">
          {data.subtitle}
        </h2>

        {/* COGNIX Main Title */}
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            {data.mainTitle}
          </span>
        </h1>

        {/* Tagline */}
        <h3 className="text-white text-lg md:text-2xl tracking-[0.2em] font-light uppercase mb-8 text-shadow-sm">
          {data.tagline}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
          {data.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <button className="group relative px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide bg-transparent hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer">
            {data.buttons.primary}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          
          <button className="group relative px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide bg-transparent hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer">
            {data.buttons.secondary}
            <Mail className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
