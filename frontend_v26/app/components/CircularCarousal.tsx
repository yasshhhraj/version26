'use client';
import React, {useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
import Event from "@/app/components/Event";

interface CircularCarouselProps {
    items: React.ReactNode[];
}

export default function CircularCarousel({ items }: CircularCarouselProps) {
    const [index, setIndex] = useState(0);
    const [isVertical, setIsVertical] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wheelLockRef = useRef<boolean>(false);
    const touchStartXRef = useRef<number | null>(null);
    const touchStartYRef = useRef<number | null>(null);
    const keyLockRef = useRef<boolean>(false);

    const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);
    const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

    const getPosition = (i: number): "center" | "left" | "right" | "hidden" => {
        if (i === index) return "center";
        if (i === (index - 1 + items.length) % items.length) return "left";
        if (i === (index + 1) % items.length) return "right";
        return "hidden";
    };

    // Determine orientation: portrait -> vertical carousel behavior
    useEffect(() => {
        const updateOrientation = () => {
            const portrait = typeof window !== 'undefined' &&
                (window.matchMedia && window.matchMedia('(orientation: portrait)').matches);
            // Fallback to small width if matchMedia not available
            const smallWidth = typeof window !== 'undefined' && window.innerWidth < 768;
            setIsVertical(Boolean(portrait || smallWidth));
        };
        updateOrientation();
        window.addEventListener('resize', updateOrientation);
        const mm = window.matchMedia ? window.matchMedia('(orientation: portrait)') : null;
        const mmListener = () => updateOrientation();
        if (mm) mm.addEventListener('change', mmListener);
        return () => {
            window.removeEventListener('resize', updateOrientation);
            if (mm) mm.removeEventListener('change', mmListener);
        };
    }, []);

    // Keyboard navigation: Arrow keys
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (keyLockRef.current) return;
            if (e.key === 'ArrowLeft' || (isVertical && e.key === 'ArrowUp')) {
                prev();
                keyLockRef.current = true;
                setTimeout(() => (keyLockRef.current = false), 250);
            } else if (e.key === 'ArrowRight' || (isVertical && e.key === 'ArrowDown')) {
                next();
                keyLockRef.current = true;
                setTimeout(() => (keyLockRef.current = false), 250);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [items.length, next, prev, isVertical]);

    // Wheel navigation (scroll): up -> prev, down -> next (throttled)
    const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
        // Prevent page scroll while interacting with the carousel
        e.preventDefault();
        if (wheelLockRef.current) return;
        if (e.deltaY > 0) {
            next();
        } else if (e.deltaY < 0) {
            prev();
        }
        wheelLockRef.current = true;
        // lock briefly to avoid skipping multiple cards on a single-wheel gesture
        setTimeout(() => (wheelLockRef.current = false), 300);
    };

    // Touch swipe navigation for mobile
    const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
        const t = e.touches[0];
        touchStartXRef.current = t?.clientX ?? null;
        touchStartYRef.current = t?.clientY ?? null;
    };
    const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
        const startX = touchStartXRef.current;
        const startY = touchStartYRef.current;
        touchStartXRef.current = null;
        touchStartYRef.current = null;
        if (startX == null) return;
        const endTouch = e.changedTouches[0];
        const endX = endTouch?.clientX ?? startX;
        const endY = endTouch?.clientY ?? startY ?? 0;
        const deltaX = endX - startX;
        const deltaY = (startY == null ? 0 : endY - startY);
        const threshold = 40; // px swipe threshold

        // Determine dominant axis to avoid diagonal misfires
        if (isVertical) {
            if (Math.abs(deltaY) < threshold || Math.abs(deltaY) < Math.abs(deltaX)) return;
            if (deltaY > 0) {
                // swipe down -> previous
                prev();
            } else {
                // swipe up -> next
                next();
            }
        } else {
            if (Math.abs(deltaX) < threshold || Math.abs(deltaX) < Math.abs(deltaY)) return;
            if (deltaX > 0) {
                // swipe right -> previous
                prev();
            } else {
                // swipe left -> next
                next();
            }
        }
    };

    const handleCardClick = (i: number) => {
        // If the clicked card is centered, open the Event modal.
        if (i === index) {
            setIsModalOpen(true);
        } else {
            // Optional UX: clicking a side card brings it to center
            setIndex(i);
        }
    };

    return (
        <div
            ref={containerRef}
            className="py-6 relative w-full h-full    flex items-center justify-center gap-4   "
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* Left Button */}
            <button
                onClick={prev}
                className={(isVertical? "hidden":"")+" w-full h-4/5 opacity-0 z-20 text-white bg-gray-700 px-3 py-2 rounded-lg"}
            >
                ◀
            </button>

            {/* Cards */}
            <div className="relative  max-h-[80%] md:max-h-full  w-full flex items-center justify-center ">
                {items.map((item, i) => {
                    const pos = getPosition(i);

                    return (
                        <div onClick={() => handleCardClick(i)}
                            key={i}
                            className={`
                absolute transition-all duration-500 ease-in-out rounded-xl h-full 
                ${pos === "center" ? "relative   z-20 opacity-100 shadow-sm" : ""}
                ${pos === "left" ? (isVertical ? "scale-50 sm:scale-[0.75] -translate-y-[40%]  z-10 opacity-60" : "scale-0 sm:scale-[0.75] -translate-x-[80%]  z-10 opacity-60") : ""}
                ${pos === "right" ? (isVertical ? "scale-50 sm:scale-[0.75] translate-y-[40%]  z-10 opacity-60" : "scale-0  sm:scale-[0.75] translate-x-[80%]  z-10 opacity-60") : ""}
                ${pos === "hidden" ? "scale-[0.5] opacity-0 pointer-events-none" : ""}
              `}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>

            {/* Right Button */}
            <button
                onClick={next}
                className={(isVertical?"hidden ":"")+" w-full h-4/5 opacity-0 z-20 text-white px-3 py-2  bg-gray-700  rounded-lg"}
            >
                ▶
            </button>
            {/* Event Modal */}
            <Event
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={"Event Details"}
            >
                {/* Placeholder details; replace with actual event info later */}
                <div className="space-y-2 text-sm md:text-base">
                    <p>This is a placeholder for the selected event.</p>
                    <p>Click the X to close.</p>
                </div>
            </Event>
        </div>
    );
}

interface EventCardProps {
    title: string;
    description: string;
    image: string;
}

export function EventCard({ title, description, image}: EventCardProps) {
    return (
        <div className="relative group w-80 md:w-[624px] sm:w-96  aspect-square md:aspect-auto bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:border-purple-500/50">

            {/* 1. Illustration Area */}
            <div className="h-full w-full  flex items-center justify-center">
                {/* Placeholder for the image/illustration */}
                <Image
                    width={500}
                    height={300}
                    src={image}
                    alt={title}
                    className="w-full  h-full object-contain drop-shadow-2xl"
                />
            </div>

            {/* 2. Bottom Info Bar (The pill shape) */}
            <div className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-3 rounded-2xl flex items-center justify-between">

                {/* Left Side: Icon & Text */}
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-700/50 rounded-full text-gray-300">
                        {/*<Trophy size={18} />*/}
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-white text-sm font-bold leading-tight">{title}</h3>
                        <p className="text-gray-400 text-xs truncate max-w-[100px]">{description}</p>
                    </div>
                </div>

                {/* Right Side: Button */}
                <button
                    className="bg-purple-700 hover:bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-purple-900/20"
                >
                    Register
                </button>
            </div>
        </div>
    );
}

