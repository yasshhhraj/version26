'use client'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {EventCard, EventPopUp, EventCardData} from "@/components/Event";


interface event {
    id: string;
    title: string;
    tagline: string;
    description: string;
    imageUrl: string;
    eventType: string;
    dateRangeText: string;
    locationType: 'Virtual' | 'In-Person' | string;
}

export default function CircularCarousel() {
    const [eventsData, setEventsData] = useState<event[]>([]);

    useEffect(() => {
        // Read static JSON from /public folder instead of calling API
        fetch('/events/events.json')
            .then(res => (res.ok ? res.json() : []))
            .then(data => setEventsData(data))
            .catch(() => setEventsData([]));
    }, []);

    const [index, setIndex] = useState(0);
    const [isVertical, setIsVertical] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wheelLockRef = useRef<boolean>(false);
    const touchStartXRef = useRef<number | null>(null);
    const touchStartYRef = useRef<number | null>(null);
    const keyLockRef = useRef<boolean>(false);


    const [selectedEvent, setSelectedEvent] = useState<EventCardData | null>(null);
    const openDetails = useCallback((ev: EventCardData) => {
        setSelectedEvent(ev);
        setIsModalOpen(true);
    }, []);
    const items = eventsData.map((event) => (
        <EventCard key={event.id} data={event} onDetailsClickAction={openDetails}/>
    ))

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
            const smallWidth = typeof window !== 'undefined' && window.innerWidth < 400;
            setIsVertical(Boolean(portrait && smallWidth));
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
        // e.preventDefault();
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
            const ev = eventsData[i];
            if (ev) openDetails(ev);
        } else {
            // Optional UX: clicking a side card brings it to the center
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
                ${pos === "left" ? (isVertical ? "scale-75 blur-xs sm:scale-[0.75] -translate-y-[40%]  z-10 opacity-60" : "scale-75 blur-xs -translate-x-[70%]  z-10 opacity-60") : ""}
                ${pos === "right" ? (isVertical ? "scale-75 blur-xs sm:scale-[0.75] translate-y-[40%]  z-10 opacity-60" : "scale-75 blur-xs translate-x-[70%]  z-10 opacity-60") : ""}
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
            <EventPopUp open={isModalOpen} onCloseAction={() => setIsModalOpen(false)} title={selectedEvent?.title ?? "Event Details"}>
                {selectedEvent ? (
                    <div className="space-y-3 text-sm md:text-base">
                        {selectedEvent.imageUrl ? (
                            <div className="w-full flex justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={selectedEvent.imageUrl} alt={selectedEvent.title ?? "Event"} className="max-h-64 object-contain rounded-lg" />
                            </div>
                        ) : null}
                        {selectedEvent.tagline ? <p className="text-neutral-700 dark:text-neutral-300">{selectedEvent.tagline}</p> : null}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-300">
                            {selectedEvent.eventType ? <div><span className="font-semibold">Type: </span>{selectedEvent.eventType}</div> : null}
                            {selectedEvent.dateRangeText ? <div><span className="font-semibold">Dates: </span>{selectedEvent.dateRangeText}</div> : null}
                            {selectedEvent.locationType ? <div><span className="font-semibold">Location: </span>{selectedEvent.locationType}</div> : null}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2 text-sm md:text-base">
                        <p>Select an event to see details.</p>
                    </div>
                )}
            </EventPopUp>
        </div>
    );
}


