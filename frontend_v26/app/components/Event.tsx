"use client";

import React, { useEffect, useRef } from "react";

type EventProps = {
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
export default function Event({ open, onClose, children, title }: EventProps) {
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
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title ? (
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold truncate">{title}</h2>
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
