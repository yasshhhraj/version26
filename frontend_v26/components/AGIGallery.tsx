"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Camera, Play} from "lucide-react";
import Image from "next/image";


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
        src: "/Assets/gallery/01.jpeg",
        alt: "Event Snapshot",
        category: "Highlights",
        timestamp: "Day 1",
    },
    {
        id: "2",
        src: "/Assets/gallery/02.jpeg",
        alt: "Event Snapshot",
        category: "Ceremony",
        timestamp: "Day 1",
    },
    {
        id: "3",
        src: "/Assets/gallery/03.jpeg",
        alt: "Event Snapshot",
        category: "Crowd",
        timestamp: "Day 1",
    },
    {
        id: "4",
        src: "/Assets/gallery/04.jpeg",
        alt: "Innovation Lab",
        category: "Keynote",
        timestamp: "Day 2",
    },
    {
        id: "5",
        src: "/Assets/gallery/05.jpeg",
        alt: "Crowd Engagement",
        category: "Tech",
        timestamp: "Day 2",
    },
    {
        id: "6",
        src: "/Assets/gallery/06.jpeg",
        alt: "Event Snapshot",
        category: "Workshops",
        timestamp: "Day 2",
    },
    {
        id: "7",
        src: "/Assets/gallery/07.jpeg",
        alt: "Memorable Moments",
        category: "Competitions",
        timestamp: "Day 3",
    },
    {
        id: "8",
        src: "/Assets/gallery/08.jpeg",
        alt: "Crowd Engagement",
        category: "Keynote",
        timestamp: "Day 3",
    },
    {
        id: "9",
        src: "/Assets/gallery/09.jpeg",
        alt: "Networking Hour",
        category: "Community",
        timestamp: "Day 3",
    },
    {
        id: "10",
        src: "/Assets/gallery/10.jpeg",
        alt: "Networking Hour",
        category: "Workshops",
        timestamp: "Day 3",
    },
    {
        id: "11",
        src: "/Assets/gallery/11.jpeg",
        alt: "Memorable Moments",
        category: "Seminars",
        timestamp: "Day 3",
    },
    {
        id: "12",
        src: "/Assets/gallery/12.jpeg",
        alt: "Keynote Session",
        category: "Community",
        timestamp: "Day 1",
    },
    {
        id: "13",
        src: "/Assets/gallery/13.jpeg",
        alt: "Entrepreneurship Hour",
        category: "Tech",
        timestamp: "Day 2",
    },
    {
        id: "14",
        src: "/Assets/gallery/14.jpeg",
        alt: "Innovation Lab",
        category: "Highlights",
        timestamp: "Day 2",
    },
    {
        id: "15",
        src: "/Assets/gallery/15.jpeg",
        alt: "Informative Panels",
        category: "Seminars",
        timestamp: "Day 2",
    },
    {
        id: "16",
        src: "/Assets/gallery/16.jpeg",
        alt: "Speaker Series",
        category: "Keynote",
        timestamp: "Day 2",
    },
    {
        id: "17",
        src: "/Assets/gallery/17.jpeg",
        alt: "Speaker Series",
        category: "Highlights",
        timestamp: "Day 3",
    },
];

export default function AGIGallery({ videoData }: { videoData?: { src: string; title: string } }) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(6);
    useRef<HTMLDivElement>(null);
// Initial load adjustment based on screen size
    useEffect(() => {
        const updateInitialCount = () => {
            if (window.innerWidth >= 1024) {
                setVisibleCount(9);
            } else if (window.innerWidth >= 640) {
                setVisibleCount(6);
            } else {
                setVisibleCount(3);
            }
        };

        updateInitialCount();
    }, []);

    // Infinite scroll observer removed in favor of explicit "Load More" to fix Footer Trap
    
    return (
        <section className="relative min-h-screen bg-transparent px-4 md:px-8 py-24 text-neutral-100 selection:bg-purple-500/30 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4600be]/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full -z-10" />
            
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <div className="mb-4 flex items-center gap-2 text-xs font-medium text-purple-400 border border-purple-500/20 bg-purple-500/5 px-3 py-1 rounded-full">
                        <Camera size={14} />
                        <span>VERSION&apos;26 ARCHIVE</span>
                    </div>
                    <h2 className="text-5xl font-bold tracking-tighter text-white md:text-7xl lg:text-8xl mb-6">
                        Event <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4600be] to-purple-400 italic">Gallery</span>
                    </h2>
                    <p className="max-w-xl text-neutral-400 text-lg">
                        Explore the defining moments of the 33rd edition. A curated collection of innovation, community, and technological breakthroughs.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    
                    {/* Featured Video Card - Spans 2 cols on large screens if first item, or just fits in grid */}
                    {videoData && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 relative group rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl aspect-video lg:aspect-auto">
                             <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                             <iframe
                                className="w-full h-full object-cover"
                                src={`${videoData.src}?controls=0&rel=0&modestbranding=1`}
                                title={videoData.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <Play className="w-5 h-5 text-white fill-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-purple-300 font-mono uppercase tracking-widest">Featured Video</p>
                                    <h3 className="text-xl font-bold text-white">{videoData.title}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Photo Cards */}
                    {photos.slice(0, visibleCount).map((photo, index) => (
                        <Card key={photo.id} photo={photo} index={index} onClick={() => setSelectedId(photo.id)} />
                    ))}
                </div>

                {/* Load More Button */}
                {visibleCount < photos.length && (
                    <div className="flex justify-center mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVisibleCount((prev) => Math.min(prev + 6, photos.length))}
                            className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium text-sm tracking-wide transition-colors backdrop-blur-md flex items-center gap-2 group"
                        >
                            <span>Load More Moments</span>
                            <div className="w-1 h-1 rounded-full bg-purple-500 group-hover:shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-shadow" />
                        </motion.button>
                    </div>
                )}
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
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index % 3 * 0.1 }}
            onClick={onClick}
            className="group relative cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 aspect-4/3 md:aspect-square"
        >
            {/* Image */}
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onLoad={() => setIsLoading(false)}
                    className={`object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end items-start">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {photo.category}
                    </p>
                    <h3 className="text-2xl font-bold text-white leading-tight mb-1">
                        {photo.alt}
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono">
                        {photo.timestamp}
                    </p>
                </div>
                
                {/* Icon Button */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2.5 group-hover:translate-y-0">
                    <ZoomIn className="w-4 h-4 text-white" />
                </div>
            </div>
        </motion.div>
    );
}

import { createPortal } from "react-dom";

// ... Lightbox Component ...
function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Ensure we are on client before rendering portal (though AGIGallery is client component, safe guard)
    if (typeof document === 'undefined') return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative max-h-[95vh] max-w-7xl w-full overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/90 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent p-6 pointer-events-none">
                    <div className="flex items-center gap-3 pointer-events-auto">
                        <div className="rounded-full bg-purple-500/20 p-2 border border-purple-500/30">
                            <Camera className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">{photo.category}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-white/10 p-3 text-white/70 hover:bg-white/20 hover:text-white transition-colors pointer-events-auto cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Image Section */}
                <div className="relative flex w-full h-full min-h-[50vh] items-center justify-center bg-black">
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={1920}
                        height={1080}
                        className="max-h-[85vh] w-auto object-contain"
                        priority
                    />
                </div>
            </div>
        </motion.div>,
        document.body
    );
}
