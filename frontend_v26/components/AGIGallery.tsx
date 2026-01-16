"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Layers, Terminal, Camera } from "lucide-react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


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
        <section className="relative min-h-screen bg-transparent px-8 py-24 text-neutral-100 selection:bg-purple-500/30 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4600be]/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full -z-10" />
            
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-10 md:flex-row md:items-end">
                    <div>
                        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-purple-400 border border-purple-500/20 bg-purple-500/5 px-3 py-1 rounded-full w-fit">
                            <Camera size={14} />
                            <span>VERSION&apos;26 ARCHIVE</span>
                        </div>
                        <h2 className="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-9xl">
                            Event <span className="text-[#4600be] italic">Gallery</span>
                        </h2>
                    </div>
                        <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-neutral-400">
                            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4600be] opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4600be]"></span>
                                </span>
                                LIVE FEED
                            </div>
                            <div className="border-l border-white/10 pl-4 py-2 uppercase tracking-[0.2em]">{photos.length + (videoData ? 1 : 0)} Moments Captured</div>
                        </div>
                </div>

                {/* Gallery Items */}
                <div className="flex flex-col gap-12">
                    {videoData && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full aspect-video rounded-3xl border border-white/10 overflow-hidden bg-zinc-900 shadow-[0_0_50px_-12px_rgba(70,0,190,0.3)] relative group"
                        >
                            <iframe
                                className="w-full h-full grayscale-[0.5] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                                src={videoData.src}
                                title={videoData.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 pointer-events-none">
                                <div className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-white bg-[#4600be] border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md shadow-lg">
                                    <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
                                    OFFICIAL AFTERMOVIE
                                </div>
                            </div>
                            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20 mix-blend-overlay" />
                        </motion.div>
                    )}

                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                        {photos.map((photo, index) => (
                            <Card key={photo.id} photo={photo} index={index} onClick={() => setSelectedId(photo.id)} />
                        ))}
                    </div>
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
function Card({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
    return (
        <motion.div
            layoutId={`card-${photo.id}`}
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-[#4600be]/30 hover:bg-white/10 break-inside-avoid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index % 3 * 0.1 }}
        >
            {/* Scanning Line Effect on Hover */}
            <div className="absolute inset-x-0 h-[2px] top-0 bg-gradient-to-r from-transparent via-[#4600be] to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:top-full z-20" />

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 transition-all group-hover:border-[#4600be] group-hover:w-4 group-hover:h-4 z-20" />

            {/* Image Container */}
            <div className={clsx(
                "overflow-hidden",
                index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
            )}>
                <motion.div layoutId={`image-${photo.id}`} className="h-full w-full">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={600}
                        height={800}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                    />
                </motion.div>
            </div>

            {/* Card Overlay / Metadata */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                <motion.p className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#4600be] mb-1">
                    {photo.category}
                </motion.p>
                <div className="flex items-end justify-between gap-4">
                    <motion.h3 className="text-lg font-bold text-white leading-tight">
                        {photo.alt}
                    </motion.h3>
                    <div className="shrink-0 rounded-full bg-[#4600be] p-2 shadow-[0_0_15px_rgba(70,0,190,0.5)]">
                        <ZoomIn className="h-4 w-4 text-white" />
                    </div>
                </div>
            </div>

            {/* Static Bottom Info (Visible when not hovered) */}
            <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-[10px] font-mono text-white/40 tracking-tighter">
                    REF_{photo.id.padStart(4, '0')} {'//'} {photo.timestamp}
                </p>
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
                        <div className="rounded-full bg-[#4600be]/20 p-2 border border-[#4600be]/30">
                            <Camera className="h-5 w-5 text-[#4600be]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4600be]">{photo.timestamp}</span>
                            <span className="text-xl font-bold text-white tracking-tight mt-1">{photo.alt}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-white/5 p-3 text-white/70 transition-all hover:bg-white/10 hover:text-white border border-white/10"
                    >
                        <X size={20} />
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
