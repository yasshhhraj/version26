"use client";

import { Canvas } from "@react-three/fiber";
import {useEffect, useRef, useState} from "react";
import Tesseract from "@/components/three/Tesserract";

type InteractionState = "PASSIVE" | "HOVER" | "ACTIVE";

const FACE_NAMES = [
    "Substrate",
    "Organization",
    "Reactivity",
    "World Models",
    "Emergence",
    "Symbiosis",
];

export default function AGIScene() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [activeFace, setActiveFace] = useState(0);
    const [interactionState, setInteractionState] = useState<InteractionState>("PASSIVE");

// TEMP: toggle every 2 seconds
    useEffect(() => {
        const states: InteractionState[] = ["PASSIVE", "HOVER", "ACTIVE"];
        let i = 0;
        const id = setInterval(() => {
            setInteractionState(states[i % 3]);
            i++;
        }, 2000);
        return () => clearInterval(id);
    }, []);

//todo “Interaction model to be finalized (scroll/click-driven, hover intentionally avoided)”

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full overflow-hidden "
            onPointerEnter={() => setInteractionState("HOVER")}
            onPointerLeave={() => setInteractionState("PASSIVE")}
            onClick={() => setInteractionState("ACTIVE")}
        >
            {/* 🔎 Debug Overlay (remove later) */}
            <div className="pointer-events-none absolute top-4 left-4 z-10 rounded-md  px-3 py-2 text-sm text-white">
                <div>
                    <span className="opacity-70">STATE:</span>{" "}
                    <span className="font-medium">{interactionState}</span>
                </div>
                <div>
                    <span className="opacity-70">FACE:</span>{" "}
                    <span className="font-medium"> {FACE_NAMES[activeFace] ?? "—"} </span>
                </div>
            </div>

            <Canvas
                camera={{ position: [0, 0, 6], fov: 55 }}
                onClick={() => setInteractionState("ACTIVE")}
            >
                <ambientLight intensity={0.35} />
                <directionalLight position={[4, 4, 6]} intensity={0.8} />

                <Tesseract
                    onFaceChange={setActiveFace}
                    interactionState={interactionState}

                />
            </Canvas>
        </div>
    );
}
