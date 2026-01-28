"use client";

import { Target, Cpu, BarChart3, Quote } from "lucide-react";
import Image from "next/image";
import visionData from "@/public/data/vision.json";
import { motion } from "framer-motion";

export default function VisionPage() {
  return (
    <main className="relative min-h-screen bg-black text-white pt-20 transition-colors duration-300 selection:bg-purple-500/30 overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4600be]/20 blur-[120px] rounded-full -z-10 animate-pulse-glow" />
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4600be]/10 blur-[100px] rounded-full -z-10" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-8 px-8 border-b border-white/10 min-h-[500px] h-[50vh] flex items-end overflow-hidden">
        {/* Spline Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <iframe
            src="https://my.spline.design/boxeshover-DPwvWCqp50AityE6acOm77bf/"
            frameBorder="0"
            width="100%"
            height="100%"
            className="w-full h-full opacity-60" // Removed pointer-events-none to allow hover interaction
          ></iframe>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full pl-6 md:pl-10 lg:pl-4 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-2 text-xs font-medium text-purple-400 border border-purple-500/20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit"
          >
            <Target size={14} />
            <span>{visionData.hero.subtitle}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] font-bold tracking-tighter leading-none break-words drop-shadow-2xl "
          >
            {visionData.hero.title}{" "}
            <span className="text-version-mauve italic font-serif text-glow">
              2026
            </span>
          </motion.h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-end pointer-events-none">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-neutral-300 max-w-md text-sm font-mono tracking-tighter uppercase leading-relaxed bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/5 "
            >
              Exploring the architectural framework for next-generation
              cognitive systems. Archival record of the 33rd annual symposium.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-5 right-4 bg-[#0f1013] px-4 py-3 rounded-full border border-white/10 flex items-center gap-3 shadow-lg z-50">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase font-mono">
            System Online
          </span>
        </div>
      </section>

      {/* Version Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Visual Asset */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-4 bg-[#4600be]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 group-hover:border-purple-500/30 transition-colors duration-500">
              <Image
                src={visionData.version.image}
                alt="Technical Illustration"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />

              {/* Scanning line */}
              <div className="absolute inset-x-0 h-0.5 top-0 bg-linear-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_15px_rgba(70,0,190,0.8)] z-20 animate-scan" />

              {/* Overlay Vignette */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            <div className="absolute top-6 right-6 z-30">
              <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-white bg-black/50 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                <span className="text-purple-400">
                  {visionData.version.tag}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-[#4600be] mb-6">
                <div className="h-px w-12 bg-[#4600be]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                  {visionData.version.id}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-8 uppercase italic font-serif">
                {visionData.version.title}
              </h2>
              <div className="space-y-6 text-neutral-400  leading-relaxed text-justify max-w-2xl font-light">
                {visionData.version.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AGI Theme Section */}
      <section className="bg-white/5 border-y border-white/10 relative overflow-hidden group/agi">
        <div className="absolute inset-0 bg-[url('/Assets/grid.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 text-purple-400 mb-6 uppercase">
                  <Cpu size={18} />
                  <span className="text-[10px] font-bold tracking-[0.3em]">
                    {visionData.agi.subtitle}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mb-8">
                  <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.9] flex-1">
                    {visionData.agi.title}
                  </h2>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="hidden sm:block lg:hidden w-full max-w-[200px]"
                  >
                    <div className="relative aspect-square group">
                      <div className="absolute inset-0 bg-[#4600be]/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
                      <Image
                        src={visionData.agi.image}
                        alt="AGI Visualization"
                        fill
                        className="object-contain relative z-10 drop-shadow-[0_0_20px_rgba(70,0,190,0.4)] max-h-[150px]"
                      />
                    </div>
                  </motion.div>
                </div>
                <p className="text-neutral-400 text-lg leading-relaxed mb-10 font-mono tracking-tight">
                  {visionData.agi.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#4600be] bg-purple-500/5 border border-purple-500/20 px-4 py-2 rounded-lg w-fit">
                  <span>
                    {" "}
                    {"// STATUS:"}{" "}
                    <span className="text-green-500">ACTIVE_RESEARCH</span>
                  </span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none sm:hidden lg:block"
            >
              <div className="relative aspect-square group">
                <div className="absolute inset-0 bg-[#4600be]/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
                <Image
                  src={visionData.agi.image}
                  alt="AGI Visualization"
                  fill
                  className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(70,0,190,0.4)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-[#4600be] mb-6">
              <BarChart3 size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                Network Analytics
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 uppercase italic font-serif">
              {visionData.stats.title}
            </h3>
            <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest">
              {visionData.stats.description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Capability Ratios */}
          <div className="lg:col-span-5 space-y-10">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-400 border-l-2 border-[#4600be] pl-4">
              {visionData.stats.subtitle}
            </h4>

            <div className="space-y-8">
              {visionData.stats.progress.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <div className="flex justify-between text-[10px] font-bold tracking-widest text-neutral-500">
                    <span>{item.label}</span>
                    <span className="text-white font-mono">
                      {item.percentage}
                    </span>
                  </div>

                  <div className="h-0.5 bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.percentage }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-linear-to-r from-purple-800 via-[#4600be] to-purple-400 relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden shadow-2xl group/stats">
            {visionData.stats.grid.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ backgroundColor: "rgba(70,0,190,0.05)" }}
                className="bg-black p-10 flex flex-col justify-center relative group/item overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-purple-500 rounded-full animate-ping" />
                </div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-[#4600be] group-hover/item:text-purple-400 transition-colors">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 group-hover/item:text-neutral-200 transition-colors">
                  {stat.label}
                </p>
                <div className="absolute bottom-0 left-0 w-0 h-px bg-purple-500 group-hover/item:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="relative py-48 border-t border-white/10 overflow-hidden group/quote">
        <div className="absolute inset-0 opacity-30 pointer-events-none group-hover/quote:opacity-40 transition-opacity duration-1000">
          <Image
            src={visionData.quote.image}
            alt="Background"
            fill
            className="object-cover scale-105 group-hover/quote:scale-100 transition-transform duration-[3s]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-black/40 to-black" />
          <div className="absolute inset-0 bg-purple-900/20 mix-blend-color" />
        </div>

        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-[#4600be] mx-auto mb-8 opacity-50 drop-shadow-[0_0_10px_rgba(70,0,190,1)]" />
            <p className="text-2xl md:text-5xl font-bold tracking-tighter leading-tight italic font-serif text-white drop-shadow-2xl">
              &ldquo;{visionData.quote.text}&rdquo;
            </p>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-neutral-500">
                Official Directive
              </span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
