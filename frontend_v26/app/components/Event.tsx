"use client";

import React, { useEffect, useRef } from "react";
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
    dateRangeText?: string;

    /** Simple location type (e.g., 'Virtual', 'New York'). */
    locationType?: 'Virtual' | 'In-Person' | string;
}


export interface FullEventData extends EventCardData {
    /** The full, detailed explanation of the event, its goals, and schedule. */
    fullDescription: string;

    /** Specific start date and time (ISO string preferred for serialization). */
    startDate: string;

    /** Specific end date and time (ISO string preferred for serialization). */
    endDate: string;

    /** Detailed address or full link/platform instructions for virtual events. */
    fullLocationDetails: string;

    /** Detailed cost or ticket structure (e.g., 'Early Bird: $99', 'Free'). */
    feeStructure: string;

    /** Detailed agenda, array of speakers, or schedule breakdown. */
    detailedAgenda: { time: string; activity: string; speaker?: string }[];

    /** A list of necessary requirements or target audience details. */
    prerequisites: string[];

    /** Optional link for direct registration. */
    registrationLink: string;

    /** Optional contact email or phone for support. */
    contactEmail?: string;
}


type EventPopUpProps = {
  open: boolean;
  onClose: () => void;
  // Placeholder for future event data; consumer can pass JSX for now
  children?: React.ReactNode;
  title?: string;
};

/**
 * Event popup modal component.
 * - Small screens: takes (almost) full screen
 * - Large screens: centered dialog with max width ~60% of viewport
 */
export function EventPopUp({ open, onClose, children, title }: EventPopUpProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close when clicking outside the dialog
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onMouseDown={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className={
          // Mobile: full height/width with some padding. md+: centered card with max-w 60vw
          "relative z-10 w-[96vw] h-[92vh] md:h-auto md:max-h-[90vh] md:w-auto md:max-w-[60vw] " +
          "bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-black/10 dark:border-white/10 " +
          "p-4 sm:p-6 md:p-8 overflow-auto"
        }
        role="document"
        aria-labelledby={title ? "event-popup-title" : undefined}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title ? (
              <h2 id="event-popup-title" className="text-lg sm:text-xl md:text-2xl font-semibold truncate">{title}</h2>
            ) : null}
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="shrink-0 rounded-md p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-white/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {children ?? (
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              Event details will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




type EventCardProps = {
  data: EventCardData;
  onDetailsClick?: (event: EventCardData) => void;
};

export function EventCard({ data, onDetailsClick }: EventCardProps) {
    const hasImage = Boolean(data.imageUrl);
    const title = data.title ?? "Event";
    return (
        <div className="relative group w-80 md:w-[624px] sm:w-96  aspect-square md:aspect-auto bg-gray-900/50 border border-gray-800 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:border-purple-500/50">

            {/* 1. Illustration Area */}
            <div className="h-full w-full  flex items-center justify-center">
                {/* Placeholder for the image/illustration */}
                {hasImage ? (
                  <Image
                    width={500}
                    height={300}
                    src={data.imageUrl as string}
                    alt={title}
                    className="w-full  h-full object-contain drop-shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    {title}
                  </div>
                )}
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
                        <p className="text-gray-400 text-xs truncate max-w-[100px]">{data.eventType??''}</p>
                        {/*<p className="text-gray-400 text-xs truncate max-w-[100px]">{data.description??''}</p>*/}
                    </div>
                </div>

                {/* Right Side: Button */}
                <button
                    className="bg-purple-700 hover:bg-purple-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-purple-900/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDetailsClick?.(data);
                    }}
                >
                    Details
                </button>
            </div>
        </div>
    );
}
