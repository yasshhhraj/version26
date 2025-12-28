"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Cpu, Layers, Terminal, Camera } from "lucide-react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility for cleaner tailwind classes ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- Types ---
type Photo = {
    id: string;
    src: string;
    alt: string;
    category: string; // e.g., "Workshops", "Keynote", "Crowd"
    timestamp: string; // e.g., "Day 1"
};

// --- Dummy Data (Replace with your actual images) ---
const photos: Photo[] = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        alt: "Cybersecurity Workshop",
        category: "Workshops",
        timestamp: "Day 1 - 10:00 AM",
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        alt: "Hackathon Coding",
        category: "Competitions",
        timestamp: "Day 1 - 02:00 PM",
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
        alt: "Main Stage Event",
        category: "Keynote",
        timestamp: "Day 2 - 09:00 AM",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
        alt: "Networking",
        category: "Community",
        timestamp: "Day 2 - 05:00 PM",
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=800",
        alt: "Prize Distribution",
        category: "Awards",
        timestamp: "Day 3 - 06:00 PM",
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1504384308090-c54be3855833?auto=format&fit=crop&q=80&w=800",
        alt: "Tech Talk",
        category: "Seminars",
        timestamp: "Day 3 - 11:00 AM",
    },
];

export default function AGIGallery({ videoData }: { videoData?: { src: string; title: string } }) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <section className="relative min-h-screen bg-transparent p-8 text-neutral-100 selection:bg-purple-500/30">
            {/* Background Grid Effect - Subtle integration */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-10 md:flex-row md:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-purple-400 border border-purple-500/20 bg-purple-500/5 px-3 py-1 rounded-full w-fit">
                            <Camera size={14} />
                            <span>VERSION'26 ARCHIVE</span>
                        </div>
                        <h2 className="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl">
                            Event <span className="text-[#4600be]">Gallery</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
                        <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4600be] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4600be]"></span>
              </span>
                            LIVE FEED
                        </div>
                        <div className="border-l border-white/10 pl-4">{photos.length + (videoData ? 1 : 0)} MOMENTS CAPTURED</div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videoData && (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mb-6">
                            <div className="w-full aspect-video rounded-xl border border-white/10 overflow-hidden bg-zinc-900 shadow-2xl relative">
                                <iframe
                                    className="w-full h-full"
                                    src={videoData.src}
                                    title={videoData.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="flex items-center gap-2 text-[10px] font-medium text-white/90 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        OFFICIAL AFTERMOVIE
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {photos.map((photo) => (
                        <Card key={photo.id} photo={photo} onClick={() => setSelectedId(photo.id)} />
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedId && (
                    <Lightbox
                        photo={photos.find((p) => p.id === selectedId)!}
                        onClose={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

// --- Individual Card Component ---
function Card({ photo, onClick }: { photo: Photo; onClick: () => void }) {
    return (
        <motion.div
            layoutId={`card-${photo.id}`}
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#4600be]/50 hover:bg-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Scanning Line Effect on Hover - kept subtle */}
            <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-[#4600be]/5 to-transparent transition-transform duration-1000 group-hover:translate-y-full" />

            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden">
                <motion.div layoutId={`image-${photo.id}`} className="h-full w-full">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </motion.div>
            </div>

            {/* Card Overlay / Metadata */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 opacity-100 transition-opacity">
                <div className="flex items-center justify-between">
                    <div>
                        <motion.p className="font-medium text-[10px] uppercase tracking-widest text-[#4600be]">
                            {photo.category}
                        </motion.p>
                        <motion.h3 className="text-base font-bold text-white mt-1">
                            {photo.alt}
                        </motion.h3>
                    </div>
                    <div className="rounded-full bg-white/10 p-2 backdrop-blur-md transition-colors group-hover:bg-[#4600be]/20">
                        <ZoomIn className="h-4 w-4 text-white/70 transition-colors group-hover:text-white" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Lightbox Component ---
function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                layoutId={`card-${photo.id}`}
                className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/90 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-6 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-[#4600be]/20 p-2">
                            <Camera className="h-5 w-5 text-[#4600be]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium uppercase tracking-wider text-purple-400">{photo.timestamp}</span>
                            <span className="text-lg font-bold text-white leading-none mt-1">{photo.alt}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-white/5 p-2 text-white/70 transition-all hover:bg-white/10 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Full Image */}
                <div className="relative aspect-video w-full bg-black/40">
                    <motion.div layoutId={`image-${photo.id}`} className="h-full w-full">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Modal Footer / Details */}
                <div className="flex items-center justify-between border-t border-white/5 bg-white/5 p-6 text-xs text-neutral-400">
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <Layers size={14} className="text-[#4600be]" />
                            <span>High Resolution</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-[#4600be]" />
                            <span>Source: Main Camera</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
