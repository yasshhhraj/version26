'use client';
import React, { useEffect, useRef, useState } from "react";

interface CircularCarouselProps {
    items: React.ReactNode[];
}

export default function CircularCarousel({ items }: CircularCarouselProps) {
    const [index, setIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wheelLockRef = useRef<boolean>(false);
    const touchStartXRef = useRef<number | null>(null);
    const keyLockRef = useRef<boolean>(false);

    const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
    const next = () => setIndex((i) => (i + 1) % items.length);

    const getPosition = (i: number): "center" | "left" | "right" | "hidden" => {
        if (i === index) return "center";
        if (i === (index - 1 + items.length) % items.length) return "left";
        if (i === (index + 1) % items.length) return "right";
        return "hidden";
    };

    // Keyboard navigation: Left/Right arrows
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (keyLockRef.current) return;
            if (e.key === 'ArrowLeft') {
                prev();
                keyLockRef.current = true;
                setTimeout(() => (keyLockRef.current = false), 250);
            } else if (e.key === 'ArrowRight') {
                next();
                keyLockRef.current = true;
                setTimeout(() => (keyLockRef.current = false), 250);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [items.length]);

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
        // lock briefly to avoid skipping multiple cards on a single wheel gesture
        setTimeout(() => (wheelLockRef.current = false), 300);
    };

    // Touch swipe navigation for mobile
    const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
        touchStartXRef.current = e.touches[0]?.clientX ?? null;
    };
    const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
        const startX = touchStartXRef.current;
        touchStartXRef.current = null;
        if (startX == null) return;
        const endX = e.changedTouches[0]?.clientX ?? startX;
        const deltaX = endX - startX;
        const threshold = 40; // px swipe threshold
        if (Math.abs(deltaX) < threshold) return;
        if (deltaX > 0) {
            // swipe right -> go to previous
            prev();
        } else {
            // swipe left -> go to next
            next();
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[380px] flex items-center justify-center gap-44   "
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            {/* Left Button */}
            <button
                onClick={prev}
                className=" w-full shrink h-4/5 opacity-5  z-20 text-white bg-gray-700 px-3 py-2 rounded-lg"
            >
                ◀
            </button>

            {/* Cards */}
            <div className="relative  h-full flex items-center justify-center ">
                {items.map((item, i) => {
                    const pos = getPosition(i);

                    return (
                        <div onClick={() =>{
                            console.log(pos, item)}}
                            key={i}
                            className={`
                absolute transition-all duration-500 ease-in-out rounded-xl 
                ${pos === "center" ? "scale-100 z-20 opacity-100" : ""}
                ${pos === "left" ? "scale-0 md:scale-[0.75] -translate-x-[100%] z-10 opacity-60" : ""}
                ${pos === "right" ? "scale-0  md:scale-[0.75] translate-x-[100%] z-10 opacity-60" : ""}
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
                className=" w-full shrink h-4/5 opacity-5  z-20 text-white px-3 py-2  bg-gray-700  rounded-lg"
            >
                ▶
            </button>
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
        <div className="relative group w-80 h-[450px] bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:border-purple-500/50">

            {/* 1. Illustration Area */}
            <div className="h-full w-full p-6 flex items-center justify-center">
                {/* Placeholder for the image/illustration */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-contain drop-shadow-2xl"
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
};

