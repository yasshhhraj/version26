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
    <div className="w-full h-screen relative flex items-center bg-black overflow-hidden">
      {/* Spline Scene via Iframe - Restored Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe
          src="https://my.spline.design/particleaibrain-q5STAo6ZTEYaE5aZfOVaeeGO/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Overlay to hide potential watermark at bottom right with Version badge */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
        <div className="bg-[#0E0E0F] px-10 py-4 rounded-lg border border-white/10 shadow-lg flex items-center gap-2">
          <span className="text-white/80 text-sm font-mono tracking-wider">
            version26
          </span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-[95%] max-w-7xl mx-auto px-6 pointer-events-none">
        <div className="flex flex-col items-start text-left max-w-4xl mt-[-5vh]">
          
          {/* EST Badge */}
          <div className="mb-6 pointer-events-auto">
            <span className="px-5 py-1.5 rounded-full border border-white/20 text-white/80 text-xs md:text-sm font-mono tracking-widest bg-white/5 backdrop-blur-sm">
              {data.badge}
            </span>
          </div>

          {/* Version Subtitle */}
          <h2 className="text-white/60 text-sm md:text-lg tracking-[0.3em] uppercase font-medium mb-2 pl-1">
            {data.subtitle}
          </h2>

          {/* COGNIX Main Title */}
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-4 leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              {data.mainTitle}
            </span>
          </h1>

          {/* Tagline */}
          <h3 className="text-white text-lg md:text-2xl tracking-[0.2em] font-light uppercase mb-8 text-shadow-sm pl-1">
            {data.tagline}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-10 pl-1">
            {data.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-6 items-center pointer-events-auto pl-1">
            <button className="group relative px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer">
              {data.buttons.primary}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            <button className="group relative px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center gap-2 cursor-pointer">
              {data.buttons.secondary}
              <Mail className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
