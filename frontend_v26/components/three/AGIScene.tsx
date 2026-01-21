"use client";

import { Canvas } from "@react-three/fiber";
import { useState, useEffect, Suspense } from "react";
import Tesseract from "@/components/three/Tesserract";
import InnerObjectSwitcher from "@/components/three/inner/InnerObjectSwitcher";

type InteractionState = "PASSIVE" | "HOVER" | "ACTIVE";

const FACE_KEYS = [
    "substrate",
    "organization",
    "reactivity",
    "world_models",
    "emergence",
    "symbiosis",
];

interface FaceData {
    title: string;
    hover: string;
    active: string;
}

export default function AGIScene() {
    const [_, setActiveFace] = useState(0);
    const [interactionState, setInteractionState] = useState<InteractionState>("PASSIVE");
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState<Record<string, FaceData> | null>(null);
    const [ready, setReady] = useState(false);

    // Fetch data
    useEffect(() => {
        fetch('/data/data.json')
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error("Failed to load data.json", err));
    }, []);

    // Sequential switching of inner objects
    useEffect(() => {
        // Stop switching if ACTIVE
        if (interactionState === "ACTIVE") return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % 6);
        }, 3000);
        return () => clearInterval(interval);
    }, [interactionState]);

    const currentKey = FACE_KEYS[activeIndex];
    const currentData = data ? data[currentKey] : null;

    const handleInteraction = () => {
        setInteractionState(prev => {
            if (prev === "PASSIVE") return "HOVER";
            if (prev === "HOVER") return "ACTIVE";
            return "PASSIVE";
        });
    };

    return (
        <div
            className="relative h-full w-full overflow-hidden "
            onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') {
                    setInteractionState("HOVER");
                }
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') {
                    setInteractionState("PASSIVE");
                }
            }}
            onClick={handleInteraction}
        >

            {/* Info Overlay */}
            <div className={`pointer-events-none absolute z-50
                top-0 left-0 w-full p-4 
                md:top-4 md:left-4 md:w-auto md:p-3 
                flex flex-col items-center md:items-start justify-start
                transition-all duration-500 ease-in-out
                ${interactionState === "PASSIVE" ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"}`}
            >
                <div className="max-w-full md:max-w-md text-center md:text-left">
                    {currentData ? (
                        <div className="flex flex-col gap-2 items-center md:items-start">
                            {/* Title - Always shown when overlay is visible */}
                            <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase text-[#4fd1ff] drop-shadow-md bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none px-3 py-1 rounded-full md:px-0 md:py-0 md:rounded-none inline-block">
                                {currentData.title}
                            </h2>

                            {/* Hover Text - Shown on HOVER and ACTIVE */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                interactionState !== "PASSIVE" ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                            }`}>
                                <p className="text-base md:text-lg font-medium text-gray-200 bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-2 md:p-0 rounded-lg md:rounded-none">
                                    {currentData.hover}
                                </p>
                            </div>

                            {/* Active Text - Shown only on ACTIVE */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                interactionState === "ACTIVE" ? "max-h-60 opacity-100 mt-1" : "max-h-0 opacity-0"
                            }`}>
                                <p className="text-sm md:text-base text-gray-300 leading-relaxed border-l-0 md:border-l-2 border-[#4fd1ff] pl-0 md:pl-3 bg-black/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-3 md:p-0 rounded-lg md:rounded-none">
                                    {currentData.active}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-pulse text-base text-gray-400">Loading data...</div>
                    )}
                </div>
            </div>

            <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                onClick={(e) => {
                    e.stopPropagation(); // Prevent double triggering if wrapper also catches it
                    handleInteraction();
                }}
                onCreated={() => setReady(true)}
                className={`transition-opacity duration-1000 ease-in-out ${ready ? 'opacity-100' : 'opacity-0'}`}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.35} />
                    <directionalLight position={[4, 4, 6]} intensity={0.2} />

                    <Tesseract
                        onFaceChangeAction={(face) =>setActiveFace(face)}
                        interactionState={interactionState}
                    />
                    <InnerObjectSwitcher activeIndex={activeIndex} />
                </Suspense>
            </Canvas>
        </div>
    );
}
