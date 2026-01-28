'use client'
import Image from "next/image";
import React, {useEffect, useState, useRef, useCallback, useMemo} from "react";
import EventPopUp, {FullEventData} from "@/components/EventPopup";
import AGIEventPoster, {EventCardData} from "@/components/event-poster";
import { Search } from "lucide-react";

const EventsPage = () => {
    const [eventsData, setEventsData] = useState<EventCardData[]>([]);
    const [filter, setFilter] = useState<'All' | 'Technical' | 'Non-Technical'>('All');
    const [selectedEvent, setSelectedEvent] = useState<EventCardData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Hover Magnet Shadow State
    const [shadowStyle, setShadowStyle] = useState<React.CSSProperties>({
        opacity: 0,
        transform: 'translate(0px, 0px)',
        width: '0px',
        height: '0px',
    });
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Read static JSON from /public folder instead of calling API
        fetch('/data/events.json')
            .then(res => (res.ok ? res.json() : []))
            .then(data => {
                setEventsData(data);
            })
            .catch(() => {
                setEventsData([]);
            });
    }, []);

    const filteredEvents = useMemo(() => {
        let filtered = eventsData;

        if (filter !== 'All') {
            filtered = filtered.filter(e => e.eventType?.toLowerCase() === filter.toLowerCase());
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(e => 
                e.title?.toLowerCase().includes(q) || 
                e.description?.toLowerCase().includes(q) ||
                e.tagline?.toLowerCase().includes(q)
            );
        }

        return filtered;
    }, [filter, eventsData, searchQuery]);

    const openDetails = useCallback((ev: EventCardData) => {
        setSelectedEvent(ev);
        setIsModalOpen(true);
    }, []);

    // Magnet Shadow Logic
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        updateShadowPosition(e.currentTarget);
    };

    const handleMouseLeaveGrid = () => {
        setShadowStyle(prev => ({ ...prev, opacity: 0 }));
    };

    const updateShadowPosition = (target: HTMLElement) => {
        if (!gridRef.current) return;

        const gridRect = gridRef.current.getBoundingClientRect();
        const cardRect = target.getBoundingClientRect();

        const x = cardRect.left - gridRect.left;
        const y = cardRect.top - gridRect.top;

        setShadowStyle({
            opacity: 1,
            transform: `translate(${x}px, ${y}px)`,
            width: `${cardRect.width}px`,
            height: `${cardRect.height}px`,
        });
    };

    return (
        <main className={'relative flex flex-col items-center justify-start h-dvh w-dvw overflow-hidden bg-black'}>
            <div className={'absolute  h-[150%] w-1/2 sm:w-2/3 md:w-xl bg-blue-400 rounded-[100%] transform top-1/2 -translate-y-1/2 blur-[128px]'} />

            <div className={'w-[250%] sm:w-[150%] md:w-4/5 aspect-square scale-x-120 bg-black absolute flex items-start justify-center top-[90%] sm:top-[85%] md:top-[80%] left-1/2 transform -translate-x-1/2 rounded-full border border-[#4A68FF]/20 transition-colors duration-300 pointer-events-none'}>
                <Image src={'/Assets/shine.svg'} alt={'decorative shine'} width={1980} height={1000}
                       className={'w-full scale-x-90 transform -translate-y-10 md-translate-y-5 md:-translate-x-5 opacity-50 transition-opacity duration-300'}/>
            </div>

            <div className={'absolute h-full w-full flex flex-col items-center justify-start overflow-x-hidden'}>
                <div className={'w-full leading-none flex items-center justify-center shrink z-10 mt-24'}>
                    <p className={'font-bold text-[clamp(64px,20vw,256px)] text-version-mauve text-shadow-lg transition-all duration-300'}>EVENTS</p>
                </div>

                {/*Filter Bar*/}
                <div className="z-10 mt-6 mb-6 flex flex-col items-center gap-4">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-3 md:gap-2 md:bg-white/5 md:backdrop-blur-md md:p-1.5 md:rounded-full md:border md:border-white/10 md:transition-all md:duration-300">
                        
                        {/* Search Bar */}
                        <div className={`flex items-center bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 md:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none md:border-none transition-all duration-300`}>
                            <div className={`flex items-center overflow-hidden transition-all duration-300 ${isSearchOpen ? 'w-48 sm:w-64 opacity-100 px-2' : 'w-0 opacity-0'}`}>
                                <input 
                                    type="text" 
                                    placeholder="Search events..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent text-white text-sm outline-none placeholder:text-gray-500"
                                />
                            </div>

                            <button 
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className={`p-2 rounded-full transition-colors ${isSearchOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <Search size={18} />
                            </button>
                        </div>

                        <div className="hidden md:block w-px h-6 bg-white/10 mx-1" />

                        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 md:bg-transparent md:backdrop-blur-none md:p-0 md:rounded-none md:border-none">
                            {(['All', 'Technical', 'Non-Technical'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                                        filter === f
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                                            : 'text-gray-200 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-200 text-sm font-medium">
                        Showing {filteredEvents.length} Events
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="w-full md:max-w-[1400px] px-4 sm:px-8 pb-20 z-10">
                    <div
                        ref={gridRef}
                        className="relative grid place-items-center gap-6 md:gap-8 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
                        onMouseLeave={handleMouseLeaveGrid}
                    >
                        {/* Magnet Shadow Element */}
                        <div
                            className="absolute inset-0 bg-purple-500/10 rounded-3xl pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] z-0"
                            style={shadowStyle}
                        />

                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                onMouseEnter={(e) => handleMouseEnter(e)}
                                className="relative z-10"
                            >
                                <AGIEventPoster
                                    eventData={event}
                                    onClick={() => openDetails(event)}
                                    className="w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Event Modal */}
            <EventPopUp open={isModalOpen} onClose={()=>setIsModalOpen(false)} data={selectedEvent as FullEventData}/>
        </main>
    );
}

export default EventsPage;
