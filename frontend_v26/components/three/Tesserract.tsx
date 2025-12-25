"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ---------- Types ---------- */
type Vec4 = [number, number, number, number];
type InteractionState = "PASSIVE" | "HOVER" | "ACTIVE";

/* ---------- 4D Math ---------- */
function rotate4D(
    [x, y, z, w]: Vec4,
    angle: number,
    a: number,
    b: number
): Vec4 {
    const v = [x, y, z, w];
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const va = v[a];
    const vb = v[b];
    v[a] = va * cos - vb * sin;
    v[b] = va * sin + vb * cos;
    return v as Vec4;
}

function project4Dto3D([x, y, z, w]: Vec4) {
    const d = 3;
    const scale = d / (d - w);
    return new THREE.Vector3(x * scale, y * scale, z * scale);
}

/* ---------- Geometry ---------- */
const vertices4D: Vec4[] = [];
for (let x of [-1, 1])
    for (let y of [-1, 1])
        for (let z of [-1, 1])
            for (let w of [-1, 1]) vertices4D.push([x, y, z, w]);

const edges: number[][] = [];
for (let i = 0; i < vertices4D.length; i++) {
    for (let j = i + 1; j < vertices4D.length; j++) {
        const diff =
            Math.abs(vertices4D[i][0] - vertices4D[j][0]) +
            Math.abs(vertices4D[i][1] - vertices4D[j][1]) +
            Math.abs(vertices4D[i][2] - vertices4D[j][2]) +
            Math.abs(vertices4D[i][3] - vertices4D[j][3]);
        if (diff === 2) edges.push([i, j]);
    }
}

/* ---------- Faces ---------- */
const FACES = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [3, 7, 11, 15],
];

const FACE_COLORS = [
    "#4fd1ff",
    "#9cff6a",
    "#ffd166",
    "#c77dff",
    "#ff6ad5",
    "#ff9f1c",
];

function edgeBelongsToFace(edge: number[], face: number[]) {
    return face.includes(edge[0]) && face.includes(edge[1]);
}
function edgeBelongsToAnyFace(edge: number[]) {
    return FACES.some(
        (face) => face.includes(edge[0]) && face.includes(edge[1])
    );
}

/* ---------- Component ---------- */
export default function Tesseract({
                                      onFaceChange,
                                      interactionState,
                                  }: {
    onFaceChange: (face: number) => void;
    interactionState: InteractionState;
}) {
    const faceRefs = useRef<THREE.LineSegments[]>([]);
    const structuralRef = useRef<THREE.LineSegments>(null);

    const angle = useRef(0);
    const angularVelocity = useRef(0.002);
    const lastFace = useRef<number | null>(null);

    /* ---------- Interaction Events ---------- */


    /* ---------- Scroll + Wheel ---------- */
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const onWheel = (e: WheelEvent) => {
            angularVelocity.current += e.deltaY * 0.00001;
        };
        const onScroll = () => {
            const dy = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            angularVelocity.current += dy * 0.0005;
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    /* ---------- Animation ---------- */
    useFrame(() => {
        const speedFactor =
            interactionState === "ACTIVE"
                ? 0.15
                : interactionState === "HOVER"
                    ? 0.5
                    : 1;

        angle.current += angularVelocity.current * speedFactor;
        angularVelocity.current *= 0.98;

        if (Math.abs(angularVelocity.current) < 0.001) {
            angularVelocity.current =
                0.001 * Math.sign(angularVelocity.current || 1);
        }

        const rotated = vertices4D.map((v) =>
            rotate4D(
                rotate4D(v, angle.current, 0, 3),
                angle.current * 0.6,
                1,
                2
            )
        );
        const projected = rotated.map(project4Dto3D);

        /* ---------- Face Detection ---------- */
        let maxZ = -Infinity;
        let activeFace = 0;

        FACES.forEach((face, i) => {
            const z =
                face.reduce((sum, idx) => sum + projected[idx].z, 0) / face.length;
            if (z > maxZ) {
                maxZ = z;
                activeFace = i;
            }
        });

        if (activeFace !== lastFace.current) {
            lastFace.current = activeFace;
            onFaceChange(activeFace);
        }

        /* ---------- Face Edges ---------- */
        FACES.forEach((face, i) => {
            const positions: number[] = [];
            edges.forEach(([a, b]) => {
                if (edgeBelongsToFace([a, b], face)) {
                    positions.push(
                        projected[a].x,
                        projected[a].y,
                        projected[a].z,
                        projected[b].x,
                        projected[b].y,
                        projected[b].z
                    );
                }
            });

            const geom = faceRefs.current[i]?.geometry;
            if (geom) {
                geom.setAttribute(
                    "position",
                    new THREE.Float32BufferAttribute(positions, 3)
                );
                geom.computeBoundingSphere();

                const mat = faceRefs.current[i].material as THREE.LineBasicMaterial;
                mat.opacity =
                    interactionState === "ACTIVE"
                        ? i === activeFace
                            ? 1
                            : 0.25
                        : interactionState === "HOVER"
                            ? i === activeFace
                                ? 0.9
                                : 0.4
                            : 0.6;
            }
        });

        /* ---------- Structural Edges ---------- */
        const structuralPositions: number[] = [];
        edges.forEach(([a, b]) => {
            if (!edgeBelongsToAnyFace([a, b])) {
                structuralPositions.push(
                    projected[a].x,
                    projected[a].y,
                    projected[a].z,
                    projected[b].x,
                    projected[b].y,
                    projected[b].z
                );
            }
        });

        if (structuralRef.current) {
            structuralRef.current.geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(structuralPositions, 3)
            );
            (structuralRef.current.material as THREE.LineBasicMaterial).opacity =
                interactionState === "ACTIVE" ? 0.15 : 0.25;
        }
    });

    /* ---------- Render ---------- */
    return (
        <mesh
            onPointerDown={()=>alert('hii')}

        >
            {FACE_COLORS.map((color, i) => (
                <lineSegments
                    key={i}
                    ref={(el) => {
                        if (el) faceRefs.current[i] = el;
                    }}
                >
                    <bufferGeometry />
                    <lineBasicMaterial color={color} transparent opacity={0.6} />
                </lineSegments>
            ))}

            <lineSegments
                ref={structuralRef}
            >
                <bufferGeometry />
                <lineBasicMaterial color="#ffffff" transparent opacity={0.25} />
            </lineSegments>
        </mesh>
    );
}
