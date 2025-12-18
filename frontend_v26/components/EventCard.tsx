"use client";

import Image from "next/image";

// Shared data contracts
export interface EventCardData {
    /** A unique identifier for the event (used to fetch the full data for the popup). */
    id?: string;

    /** The primary, short name of the event. */
    title?: string;

    /** A brief, compelling description or mission statement. */
    tagline?: string;

    /** The primary graphic or image URL for the card. */
    imageUrl?: string;

    /** The type of event (e.g., 'Hackathon', 'Conference', 'Workshop'). */
    eventType?: string;

    /** The key date range (e.g., "Jan 25 – Jan 27"). */
    date?: string;

    /** Simple location type (e.g., 'Virtual', 'New York'). */
    locationType?: 'Virtual' | 'In-Person' | string;
}




import { Calendar, MapPin, Trophy } from 'lucide-react'; // Example icons

export default function EventCard({ data, onDetailsClickAction }: {
    data: EventCardData,
    onDetailsClickAction?: (data: EventCardData) => void
}) {
    const hasImage = Boolean(data.imageUrl);
    const title = data.title ?? "Event";

    return (
        <div className="relative group w-80 md:w-[624px] sm:w-96 aspect-square md:aspect-video bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/50">

            {/* 1. Illustration/Image Area */}
            <div className="h-full w-full flex items-center justify-center bg-linear-to-b from-transparent to-gray-900/20">
                {hasImage ? (
                    <Image
                        loading="eager"
                        width={800}
                        height={600}
                        src={data.imageUrl as string}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500 font-medium">
                        {title}
                    </div>
                )}
            </div>

            {/* 2. Top-Left Badge (Date/Type) */}
            <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                    {data.eventType}
                </span>
                {data.date && (
                    <span className="bg-purple-600/80 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full font-bold">
                        {data.date}
                    </span>
                )}
            </div>

            {/* 3. Bottom Info Bar (Floating Pill) */}
            <div className="absolute bottom-4 left-4 right-4 bg-gray-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-2xl">

                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon Circle */}
                    <div className="hidden sm:flex p-2.5 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400">
                        <Trophy size={20} />
                    </div>

                    <div className="flex flex-col min-w-0">
                        <h3 className="text-white text-base font-bold leading-tight truncate">
                            {title}
                        </h3>

                        {/* Tagline & Metadata */}
                        <div className="flex flex-col gap-0.5 mt-1">
                            {data.tagline && (
                                <p className="text-purple-300 text-[11px] font-medium truncate italic leading-none mb-1">
                                    {data.tagline}
                                </p>
                            )}
                            <div className="flex items-center gap-3 text-gray-400 text-[10px]">
                                <span className="flex items-center gap-1">
                                    <MapPin size={10} className="text-gray-500" />
                                    {data.locationType}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Action */}
                <button
                    className="ml-4 shrink-0 bg-white hover:bg-purple-50 text-gray-900 text-xs font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-lg"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDetailsClickAction?.(data);
                    }}
                >
                    Details
                </button>
            </div>
        </div>
    );
}







    //
    // export default function EventCard({ data, onDetailsClickAction }: EventCardProps) {
    //     const hasImage = Boolean(data.imageUrl);
    //     const title = data.title ?? "Event";
    //     return (
    //         <div className="relative group w-80 md:w-[624px] sm:w-96  aspect-square md:aspect-auto bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:border-purple-500/50">
    //
    //             {/* 1. Illustration Area */}
    //             <div className="h-full w-full  flex items-center justify-center">
    //                 {/* Placeholder for the image/illustration */}
    //                 {hasImage ? (
    //                   <Image loading="eager"
    //                     width={500}
    //                     height={300}
    //                     src={data.imageUrl as string}
    //                     alt={title}
    //                     className="w-full  h-full object-contain drop-shadow-2xl"
    //                   />
    //                 ) : (
    //                   <div className="w-full h-full flex items-center justify-center text-neutral-400">
    //                     {title}
    //                   </div>
    //                 )}
    //             </div>
    //
    //             {/* 2. Bottom Info Bar (The pill shape) */}
    //             <div className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 p-3 rounded-2xl flex items-center justify-between">
    //
    //                 {/* Left Side: Icon & Text */}
    //                 <div className="flex items-center gap-3">
    //                     <div className="p-2 bg-gray-700/50 rounded-full text-gray-300">
    //                         {/*<Trophy size={18} />*/}
    //                     </div>
    //                     <div className="flex flex-col">
    //                         <h3 className="text-white text-sm font-bold leading-tight">{title}</h3>
    //                         <p className="text-gray-400 text-xs truncate max-w-[100px]">{data.eventType??''}</p>
    //                         {/*<p className="text-gray-400 text-xs truncate max-w-[100px]">{data.description??''}</p>*/}
    //                     </div>
    //                 </div>
    //
    //                 {/* Right Side: Button */}
    //                 <button
    //                     className="bg-purple-700 hover:bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-purple-900/20"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       onDetailsClickAction?.(data);
    //                     }}
    //                 >
    //                     Details
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }
