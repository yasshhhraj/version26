"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Layers, Terminal, Camera } from "lucide-react";
import Image from "next/image";
import { clsx } from "clsx";


// --- Types ---
type Photo = {
    id: string;
    src: string;
    alt: string;
    category: string; // e.g., "Workshops", "Keynote", "Crowd"
    timestamp: string; // e.g., "Day 1"
};

// --- Gallery Data ---
const photos: Photo[] = [
    {
        id: "1",
        src: "/Assets/gallery/0.JPG",
        alt: "Event Snapshot",
        category: "Highlights",
        timestamp: "Day 1",
    },
    {
        id: "2",
        src: "/Assets/gallery/c1.JPG",
        alt: "Ceremony Moments",
        category: "Ceremony",
        timestamp: "Day 1",
    },
    {
        id: "3",
        src: "/Assets/gallery/c2.JPG",
        alt: "Crowd Engagement",
        category: "Crowd",
        timestamp: "Day 1",
    },
    {
        id: "4",
        src: "/Assets/gallery/c4.jpg",
        alt: "Keynote Session",
        category: "Keynote",
        timestamp: "Day 2",
    },
    {
        id: "5",
        src: "/Assets/gallery/f1.jpg",
        alt: "Tech Interaction",
        category: "Tech",
        timestamp: "Day 2",
    },
    {
        id: "6",
        src: "/Assets/gallery/f3.JPG",
        alt: "Workshop Fun",
        category: "Workshops",
        timestamp: "Day 2",
    },
    {
        id: "7",
        src: "/Assets/gallery/f4.JPG",
        alt: "Collaborative Coding",
        category: "Competitions",
        timestamp: "Day 3",
    },
    {
        id: "8",
        src: "/Assets/gallery/f5.jpg",
        alt: "Main Stage",
        category: "Keynote",
        timestamp: "Day 3",
    },
    {
        id: "9",
        src: "/Assets/gallery/g1.jpg",
        alt: "Global Connections",
        category: "Community",
        timestamp: "Day 3",
    },
    {
        id: "10",
        src: "/Assets/gallery/g2.jpg",
        alt: "Innovation Lab",
        category: "Workshops",
        timestamp: "Day 1",
    },
    {
        id: "11",
        src: "/Assets/gallery/g3.jpg",
        alt: "Speaker Series",
        category: "Seminars",
        timestamp: "Day 2",
    },
    {
        id: "12",
        src: "/Assets/gallery/h.jpg",
        alt: "Networking Hour",
        category: "Community",
        timestamp: "Day 1",
    },
    {
        id: "13",
        src: "/Assets/gallery/i1.JPG",
        alt: "Immersive Experience",
        category: "Tech",
        timestamp: "Day 2",
    },
    {
        id: "14",
        src: "/Assets/gallery/i2.JPG",
        alt: "Inspiration Gallery",
        category: "Highlights",
        timestamp: "Day 3",
    },
    {
        id: "15",
        src: "/Assets/gallery/i3.JPG",
        alt: "Informative Panels",
        category: "Seminars",
        timestamp: "Day 1",
    },
    {
        id: "16",
        src: "/Assets/gallery/m3.jpg",
        alt: "Morning Session",
        category: "Keynote",
        timestamp: "Day 2",
    },
    {
        id: "17",
        src: "/Assets/gallery/m8.jpg",
        alt: "Memorable Moments",
        category: "Highlights",
        timestamp: "Day 3",
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
                            initial={{opacity: 0, scale: 0.95}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true}}
                            className="w-full aspect-video rounded-3xl border border-white/10 overflow-hidden bg-zinc-900 shadow-[0_0_50px_-12px_rgba(70,0,190,0.3)] relative group"
                        >
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/C1GOcj_aLPQ?si=7c_doixXs2p4XMi-&modestbranding=1&rel=0"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                            <div
                                className="absolute inset-0 pointer-events-none border-20 border-black/20 mix-blend-overlay"/>
                        </motion.div>
                    )}

                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                        {photos.map((photo, index) => (
                            <Card key={photo.id} photo={photo} index={index} onClick={() => setSelectedId(photo.id)}/>
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
            <div className="overflow-hidden bg-zinc-900/50">
                <motion.div layoutId={`image-${photo.id}`} className="w-full">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={800}
                        height={1200}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="h-auto w-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0"
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
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-2xl"
            onClick={onClose}
        >
            <motion.div
                layoutId={`card-${photo.id}`}
                className="relative max-h-full max-w-6xl w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/90 shadow-[0_0_100px_rgba(70,0,190,0.2)]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-6 md:p-8">
                    <div className="flex items-center gap-4">
                        <div className="rounded-full bg-[#4600be]/20 p-2.5 border border-[#4600be]/30 backdrop-blur-md">
                            <Camera className="h-5 w-5 text-[#4600be]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4600be] drop-shadow-md">{photo.timestamp}</span>
                            <span className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1 drop-shadow-md">{photo.alt}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="group relative rounded-full bg-black/40 p-4 text-white/70 transition-all hover:bg-[#4600be] hover:text-white border border-white/10 backdrop-blur-md"
                    >
                        <X size={24} className="transition-transform duration-300 group-hover:rotate-90" />
                    </button>
                </div>

                {/* Image Section */}
                <div className="relative flex min-h-[50vh] max-h-[85vh] w-full items-center justify-center bg-zinc-950/50">
                    <motion.div layoutId={`image-${photo.id}`} className="relative max-h-full w-full flex items-center justify-center">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            width={1920}
                            height={1080}
                            className="max-h-[85vh] w-auto object-contain"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Modal Footer / Details */}
                <div className="flex items-center justify-between border-t border-white/5 bg-black/40 p-6 md:p-8 backdrop-blur-md">
                    <div className="flex flex-wrap gap-6 md:gap-12">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-white/5 p-2">
                                <Layers size={18} className="text-[#4600be]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Resolution</span>
                                <span className="text-sm font-medium text-neutral-200">High Definition</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-white/5 p-2">
                                <Terminal size={18} className="text-[#4600be]" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase tracking-widest text-neutral-500">Category</span>
                                <span className="text-sm font-medium text-neutral-200">{photo.category}</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <span className="font-mono text-[10px] text-neutral-500 tracking-tighter">
                            UID_{photo.id.padStart(6, '0')} {"// ARCHIVE_2026"}
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
