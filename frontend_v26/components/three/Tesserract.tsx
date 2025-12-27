"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";

/* ---------- Types ---------- */
type Vec4 = [number, number, number, number];
export type InteractionState = "PASSIVE" | "HOVER" | "ACTIVE";

/* ---------- Global Static Memory (The "One Instance" Optimization) ---------- */
// Since we only have one Tesseract, we allocate these ONCE globally.
// This completely removes Garbage Collection overhead.

const NUM_VERTICES = 16;
// 1. Reusable Vector Pool
const projectedVerticesPool = Array.from(
    { length: NUM_VERTICES },
    () => new THREE.Vector3()
);

// 2. Static 4D Data
const vertices4D: Vec4[] = [];
for (const x of [-1, 1])
    for (const y of [-1, 1])
        for (const z of [-1, 1])
            for (const w of [-1, 1]) vertices4D.push([x, y, z, w]);

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

const FACES = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [3, 7, 11, 15],
];

const FACE_COLORS = [
    "#4fd1ff", "#9cff6a", "#ffd166", "#c77dff", "#ff6ad5", "#ff9f1c",
];

// 3. Topology Map
const structuralEdgesIndices: number[][] = [];
const faceEdgesIndicesMap: number[][][] = FACES.map(() => []);

edges.forEach((edge) => {
    let belongsToAny = false;
    FACES.forEach((face, faceIndex) => {
        if (face.includes(edge[0]) && face.includes(edge[1])) {
            faceEdgesIndicesMap[faceIndex].push(edge);
            belongsToAny = true;
        }
    });
    if (!belongsToAny) structuralEdgesIndices.push(edge);
});

/* ---------- Helper ---------- */
function applyRotationAndProject(original: Vec4, targetVec3: THREE.Vector3, angle: number) {
    const [x, y, z, w] = original;

    // Rotate XW
    const c1 = Math.cos(angle);
    const s1 = Math.sin(angle);
    const rx = x * c1 - w * s1;
    const rw = x * s1 + w * c1;

    // Rotate YZ
    const c2 = Math.cos(0.6 * angle);
    const s2 = Math.sin(0.6 * angle);
    const ry = y * c2 - z * s2;
    const rz = y * s2 + z * c2;

    // Project 4D -> 3D
    const d = 3;
    const scale = d / (d - Math.min(rw, d - 0.01));

    targetVec3.set(rx * scale, ry * scale, rz * scale);
}

/* ---------- Component ---------- */
export default function Tesseract({
                                      onFaceChangeAction,
                                      interactionState,
                                  }: {
    onFaceChangeAction: (face: number) => void;
    interactionState: InteractionState;
}) {
    // We instantiate the BufferGeometries inside the component so they are
    // tied to the React lifecycle (created on mount, disposed on unmount).
    const { faceGeometries, structuralGeometry } = useMemo(() => {
        const fGeos = FACES.map((_, i) => {
            const geo = new THREE.BufferGeometry();
            const edgeCount = faceEdgesIndicesMap[i].length;
            geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgeCount * 6), 3));
            return geo;
        });

        const sGeo = new THREE.BufferGeometry();
        const sEdgeCount = structuralEdgesIndices.length;
        sGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sEdgeCount * 6), 3));

        return { faceGeometries: fGeos, structuralGeometry: sGeo };
    }, []);

    // Clean up GPU memory when component unmounts
    useEffect(() => {
        return () => {
            structuralGeometry.dispose();
            faceGeometries.forEach(g => g.dispose());
        };
    }, [structuralGeometry, faceGeometries]);

    const angle = useRef(0);
    const currentVelocity = useRef(0.03); // Total velocity
    const lastFace = useRef<number | null>(null);

    // Scroll Handler
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const onWheel = (e: WheelEvent) => {
            currentVelocity.current += e.deltaY * 0.00005;
        };
        const onScroll = () => {
            const dy = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;
            currentVelocity.current += dy * 0.001;
        };

        window.addEventListener("wheel", onWheel, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useFrame(() => {
        // 1. Physics: Friction & Speed
        // Decay velocity so it doesn't spin forever
        if (Math.abs(currentVelocity.current) > 0.03) {
            currentVelocity.current *= 0.95; // Friction
        }
        if (Math.abs(currentVelocity.current) < 0.03) {
            currentVelocity.current = 0.03; // Floor to base speed
        }

        const speedMult = interactionState === "ACTIVE" ? 0.2 : interactionState === "HOVER" ? 0.5 : 1;
        angle.current += currentVelocity.current * speedMult;

        // 2. Math: Project 4D -> 3D (Write to Global Pool)
        for(let i = 0; i < NUM_VERTICES; i++) {
            applyRotationAndProject(vertices4D[i], projectedVerticesPool[i], angle.current);
        }

        // 3. Logic: Detect Active Face
        let maxZ = -Infinity;
        let activeFace = 0;

        for(let i = 0; i < 6; i++) { // 6 Faces
            const faceIndices = FACES[i];
            let sumZ = 0;
            for(let k=0; k < 4; k++) sumZ += projectedVerticesPool[faceIndices[k]].z;

            const z = sumZ * 0.25; // Division is usually faster than / 4 inside loops

            // +0.01 prevents flickering when two faces are equal
            if (z > maxZ + 0.01) {
                maxZ = z;
                activeFace = i;
            }
        }

        if (activeFace !== lastFace.current) {
            lastFace.current = activeFace;
            onFaceChangeAction(activeFace);
        }

        // 4. Render: Update Geometry Buffers

        // Update Face Geometries
        for (let i = 0; i < 6; i++) {
            const edges = faceEdgesIndicesMap[i];
            const array = (faceGeometries[i].attributes.position as THREE.BufferAttribute).array as Float32Array;
            let idx = 0;
            for(let e = 0; e < edges.length; e++) {
                const [a, b] = edges[e];
                const v1 = projectedVerticesPool[a];
                const v2 = projectedVerticesPool[b];

                array[idx++] = v1.x; array[idx++] = v1.y; array[idx++] = v1.z;
                array[idx++] = v2.x; array[idx++] = v2.y; array[idx++] = v2.z;
            }
            faceGeometries[i].attributes.position.needsUpdate = true;
        }

        // Update Structural Geometry
        const structArray = (structuralGeometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        let sIdx = 0;
        for(let e = 0; e < structuralEdgesIndices.length; e++) {
            const [a, b] = structuralEdgesIndices[e];
            const v1 = projectedVerticesPool[a];
            const v2 = projectedVerticesPool[b];

            structArray[sIdx++] = v1.x; structArray[sIdx++] = v1.y; structArray[sIdx++] = v1.z;
            structArray[sIdx++] = v2.x; structArray[sIdx++] = v2.y; structArray[sIdx++] = v2.z;
        }
        structuralGeometry.attributes.position.needsUpdate = true;
    });

    return (
        <>
            {FACE_COLORS.map((color, i) => (
                <group key={i}>
                    {/* Main Line */}
                    <lineSegments geometry={faceGeometries[i]} frustumCulled={false}>
                        <lineBasicMaterial color={color} transparent opacity={0.4} />
                    </lineSegments>
                    {/* Glow Effect 1 */}
                    <lineSegments geometry={faceGeometries[i]} scale={1.01} frustumCulled={false}>
                        <lineBasicMaterial color={color} transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </lineSegments>
                    {/* Glow Effect 2 */}
                    <lineSegments geometry={faceGeometries[i]} scale={1.025} frustumCulled={false}>
                        <lineBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </lineSegments>
                </group>
            ))}

            <group>
                <lineSegments geometry={structuralGeometry} frustumCulled={false}>
                    <lineBasicMaterial color="#ffffff" transparent opacity={0.25} />
                </lineSegments>
                <lineSegments geometry={structuralGeometry} scale={0.92} frustumCulled={false}>
                    <lineBasicMaterial color="#ffffff" transparent opacity={0.1} />
                </lineSegments>
            </group>
        </>
    );
}