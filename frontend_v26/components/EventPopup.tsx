import {useEffect, useState} from "react";
import {EventCardData} from "@/components/event-poster";
import {createPortal} from 'react-dom';
import {X, Calendar, MapPin, Info, Link, Mail, LucideIcon} from 'lucide-react';
import Image from "next/image";

export interface FullEventData extends EventCardData {
    participation: string;
    fullDescription: string;
    rules: string[];
    prize: string[];
    venue: string;
    platform: string;
    contact: string;
    registrationUrl?: string;
    isOnline?: boolean;
}

interface EventPopUpProps {
    open: boolean;
    onClose: () => void;
    data: FullEventData;
}

const useBodyScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        if (isLocked) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLocked]);
};

const InfoItem = ({icon: Icon, label, value}: { icon: LucideIcon; label: string; value: string }) => (
    <div className="flex items-start gap-3">
        <Icon className="text-purple-500 shrink-0" size={18}/>
        <div>
            <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">{label}</p>
            <p className="text-sm text-neutral-200 leading-tight">{value}</p>
        </div>
    </div>
);

export default function EventPopUp({open, onClose, data}: EventPopUpProps) {
    useBodyScrollLock(open);

    if (!open || !data) return null;

    return createPortal(
        <div
            className="fixed  inset-0 z-9999 flex items-center sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4">
            <div
                className="relative  w-[90vw] sm:w-[80vw] lg:w-1/2 max-h-[90vh] bg-neutral-950 border-t sm:border border-white/10 rounded-t-4xl sm:rounded-4xl overflow-hidden flex flex-col  shadow-2xl">
                {/* Header */}
                <header className="relative h-56 shrink-0">
                    <Image src={data.imageUrl??''} width={1024} height={1024}  className="w-full h-full object-cover opacity-50" alt={data.title??'undefined'}/>
                    <div
                        className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/20 to-transparent"/>
                    <button onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/20 transition-all">
                        <X size={20}/>
                    </button>
                    <div className="absolute bottom-6 left-8 right-8">
                        <div className="flex gap-2 mb-3">
                            <Badge text={data.eventType??'undefined'} className="bg-purple-600"/>
                            <Badge text={data.participation}
                                   className="bg-white/10 backdrop-blur-md border border-white/10"/>
                            {data.isOnline && (
                                <Badge text="Online" className="bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                            )}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{data.title}</h2>
                        <p className="text-purple-300 italic text-sm mt-1">{data.tagline}</p>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 custom-scrollbar bg-neutral-950">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <section>
                                <h3 className="text-white font-semibold flex items-center gap-2 mb-3 text-lg">
                                    <Info size={18} className="text-purple-500"/> Description
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed whitespace-pre-line">{data.fullDescription}</p>
                            </section>

                            {data.isOnline && (
                                <section className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                    <p className="text-purple-300 text-sm font-medium">
                                        Note: Please ensure you have a <a href="https://www.hackerearth.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-200">HackerEarth ID</a> created before the event.
                                    </p>
                                </section>
                            )}

                            {data.rules?.length > 0 && (
                                <section>
                                    <h3 className="text-white font-semibold mb-3">Rules</h3>
                                    <ul className="space-y-2">
                                        {data.rules.map((rule, i) => (
                                            <li key={i} className="text-sm text-neutral-400 flex items-start gap-2">
                                                <span
                                                    className="text-purple-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0"/>
                                                {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            )}
                        </div>

                        <aside className="space-y-4">
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-5">
                                <InfoItem icon={Calendar} label="Date" value={data.date??'undefined'}/>
                                <InfoItem icon={MapPin} label="Venue" value={data.venue}/>
                                {data.platform && <InfoItem icon={Link} label="Platform" value={data.platform}/>}
                            </div>
                            {data.contact && (
                                <div className="p-5 rounded-2xl bg-purple-600/5 border border-purple-500/10">
                                    <p className="text-[10px] text-purple-400 uppercase font-bold tracking-widest mb-2">Queries</p>
                                    <a href={`mailto:${data.contact}`}
                                       className="flex items-center gap-2 text-white text-sm hover:underline">
                                        <Mail size={14}/> {data.contact}
                                    </a>
                                </div>
                            )}
                        </aside>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}

function Badge({text, className = ""}: { text: string; className?: string }) {
    return (
        <span
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${className}`}>
            {text}
        </span>
    );
}


//TODO
// implement dummy registration