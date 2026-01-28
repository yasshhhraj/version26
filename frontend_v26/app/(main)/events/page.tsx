'use client'
import React, {useEffect, useState, useCallback, useMemo} from "react";
import EventPopUp, {FullEventData} from "@/components/EventPopup";
import AGIEventPoster, {EventCardData} from "@/components/event-poster";
import { Search } from "lucide-react";
import StarField from "@/components/StarField";
import { motion } from "framer-motion";

const EventsPage = () => {
    const [eventsData, setEventsData] = useState<EventCardData[]>([]);
    const [filter, setFilter] = useState<'All' | 'Technical' | 'Non-Technical'>('All');
    const [selectedEvent, setSelectedEvent] = useState<EventCardData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        // Read static JSON from /public folder instead of calling API
        const fetchEvents = async () => {
            try {
                const eventsRes = await fetch('/data/events.json');
                const events: EventCardData[] = eventsRes.ok ? await eventsRes.json() : [];
                
                // Sort events to put online events first
                const sortedEvents = [...events].sort((a, b) => {
                    if (a.isOnline && !b.isOnline) return -1;
                    if (!a.isOnline && b.isOnline) return 1;
                    return 0;
                });

                setEventsData(sortedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
                setEventsData([]);
            }
        };

        fetchEvents();
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

    return (
        <main className={'relative min-h-screen w-full bg-[#0B0C0E] flex flex-col items-center justify-start overflow-x-hidden'}>
            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <StarField speedFactor={10} starCount={400} />
            </div>
            
            {/* Ambient Gradients */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-version-indigo-ink/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-version-lavender-purple/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            
            <div className={'relative w-full flex flex-col items-center justify-start pb-32'}>
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
                        className="relative grid place-items-center gap-6 md:gap-8 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
                        onMouseLeave={() => setHoveredEventId(null)}
                    >
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="relative z-10 group"
                                onMouseEnter={() => setHoveredEventId(event.id || null)}
                            >
                                {hoveredEventId === event.id && (
                                    <motion.div
                                        layoutId="glass-hover-effect"
                                        className="absolute -inset-4 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm -z-10"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
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
