"use client";
import Link from "next/link";
import { ArrowUpRight, Mail, ChevronDown } from "lucide-react";
import {motion, stagger, Variants} from "framer-motion";
import StarField from "./StarField";

interface HeroProps {
  onContactClick?: () => void;
  data: {
    badge: string;
    mainTitle: string; // COGNIX
    subtitle: string; // VERSION '26
    tagline: string; // INTELLIGENCE WITHOUT LIMITS
    description: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
}

export default function Hero({ data, onContactClick }: HeroProps) {
  // Fallback if data is missing (e.g., during dev/refactor)
  if (!data) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.12),
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Desktop animation (slide from left)
  const desktopItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full h-screen relative flex flex-col md:flex-row items-center overflow-hidden bg-[#050507]">
      {/* StarField Background - Only visible on mobile */}
      <div className="absolute inset-0 z-0 md:hidden">
        <StarField />
      </div>

      {/* Ambient Glow Effects - Mobile only */}
      <div className="absolute inset-0 z-1 md:hidden pointer-events-none overflow-hidden">
        {/* Top-right purple glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]" />
        {/* Center-left cyan glow */}
        <div className="absolute top-1/3 -left-20 w-56 h-56 bg-cyan-500/15 rounded-full blur-[80px]" />
        {/* Bottom-center blue glow */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 h-48 bg-blue-600/20 rounded-full blur-[90px]" />
      </div>

      {/* Subtle grid pattern overlay - Mobile only */}
      <div 
        className="absolute inset-0 z-2 md:hidden pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Spline Scene via Iframe - Only visible on desktop */}
      <div className="hidden md:block md:absolute md:inset-0 md:h-full z-0 overflow-hidden">
        <div className="relative w-full h-full">
            <iframe
            src="https://my.spline.design/particleaibrain-q5STAo6ZTEYaE5aZfOVaeeGO/?t=2"
            width="100%"
            height="100%"
            className="w-full h-full border-0"
            ></iframe>
        </div>
      </div>

      {/* Overlay to hide a potential watermark at bottom right with Version badge */}
      <div className="absolute bottom-4 right-4 z-20 hidden md:block">
        <div className="bg-[#0E0E0F] px-10 py-4 rounded-lg border border-white/10 shadow-lg flex items-center gap-2">
          <span className="text-white/80 text-sm font-mono tracking-wider">
            version26
          </span>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pointer-events-none flex-1 flex items-center justify-center md:justify-start">
        {/* Mobile Layout */}
        <motion.div
          className="flex md:hidden flex-col items-center text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* EST Badge with a glow */}
          <motion.div
            variants={itemVariants}
            className="mb-5 pointer-events-auto"
          >
            <span className="px-5 py-1.5 rounded-full border border-white/20 text-white/90 text-[11px] font-mono tracking-[0.2em] bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              {data.badge}
            </span>
          </motion.div>

          {/* Version Subtitle */}
          <motion.h2
            variants={itemVariants}
            className="text-white/50 text-[11px] tracking-[0.35em] uppercase font-medium mb-3"
          >
            {data.subtitle}
          </motion.h2>

          {/* Main Title with enhanced glow - HERO ELEMENT */}
          <motion.div
            variants={itemVariants}
            className="relative mb-4"
          >
            {/* Glow behind title */}
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/40 via-blue-500/40 to-purple-500/40 blur-3xl scale-150 opacity-60" />
            <h1 className="relative text-7xl font-bold tracking-tight leading-none">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_50px_rgba(59,130,246,0.6)]">
                {data.mainTitle}
              </span>
            </h1>
          </motion.div>

          {/* Tagline with decorative line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-linear-to-r from-transparent to-white/30" />
            <h3 className="text-white/80 text-[11px] tracking-[0.2em] font-light uppercase">
              {data.tagline}
            </h3>
            <div className="w-8 h-px bg-linear-to-l from-transparent to-white/30" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400/90 text-[13px] max-w-[300px] leading-relaxed mb-8"
          >
            {data.description}
          </motion.p>

          {/* Buttons stacked vertically with enhanced styling */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 items-center justify-center pointer-events-auto w-full max-w-[280px]"
          >
            <Link
              href="/events"
              className="w-full text-center group relative px-6 py-3.5 rounded-full text-white font-medium text-[14px] tracking-wide overflow-hidden transition-all duration-300 flex items-center justify-center gap-2"
            >
              {/* Button background with a gradient border */}
              <div className="absolute inset-0 bg-linear-to-r from-[#4600be] to-[#6b21a8] rounded-full" />
              <div className="absolute inset-px bg-linear-to-r from-[#4600be] to-[#371768] rounded-full" />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-linear-to-r from-purple-600/50 to-blue-600/50 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <motion.span className="relative flex items-center gap-2" whileTap={{ scale: 0.95 }}>
                {data.buttons.primary}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.span>
            </Link>

            <motion.button
              onClick={onContactClick}
              whileTap={{ scale: 0.95 }}
              className="w-full text-center group relative px-6 py-3.5 rounded-full border border-white/20 text-white font-medium text-[14px] tracking-wide bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {data.buttons.secondary}
              <Mail className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Mobile scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-white/30" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Desktop Layout - Original styling */}
        <motion.div
          className="hidden md:flex flex-col items-start text-left w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* EST Badge */}
          <motion.div
            variants={desktopItemVariants}
            className="mb-6 pointer-events-auto"
          >
            <span className="px-5 py-1.5 rounded-full border border-white/20 text-white/80 text-sm font-mono tracking-widest bg-white/5 backdrop-blur-sm">
              {data.badge}
            </span>
          </motion.div>

          {/* Version Subtitle */}
          <motion.h2
            variants={desktopItemVariants}
            className="text-white/60 text-lg tracking-[0.3em] uppercase font-medium mb-2 pl-1"
          >
            {data.subtitle}
          </motion.h2>

          {/* COGNIX Main Title */}
          <motion.h1
            variants={desktopItemVariants}
            className="text-9xl font-bold tracking-tighter mb-4 leading-none"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              {data.mainTitle}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.h3
            variants={desktopItemVariants}
            className="text-white text-2xl tracking-[0.2em] font-light uppercase mb-8 text-shadow-sm pl-1"
          >
            {data.tagline}
          </motion.h3>

          {/* Description */}
          <motion.p
            variants={desktopItemVariants}
            className="text-gray-400 text-lg max-w-md leading-relaxed mb-10 pl-1"
          >
            {data.description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={desktopItemVariants}
            className="flex flex-row gap-6 items-center justify-start pointer-events-auto pl-1"
          >
            <Link
              href="/events"
              className="text-center group relative px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide bg-linear-to-r from-[#4600be] to-[#371768] hover:from-[#5b1ad4] hover:to-[#4a1f8c] shadow-[0_0_20px_rgba(70,0,190,0.3)] hover:shadow-[0_0_30px_rgba(70,0,190,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <motion.div className="flex items-center gap-2" whileTap={{ scale: 0.95 }}>
                {data.buttons.primary}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.div>
            </Link>

            <motion.button
              onClick={onContactClick}
              whileTap={{ scale: 0.95 }}
              className="text-center group relative px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm tracking-wide bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              {data.buttons.secondary}
              <Mail className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

       {/* Scroll Indicator - hidden on mobile */}
       <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2">
            <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 rounded-full bg-white/60" 
            />
        </div>
      </motion.div>
    </div>
  );
}
