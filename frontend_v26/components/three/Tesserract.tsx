"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import TesseractEdges from "./TesseractEdges";

/* ---------- Types ---------- */
type Vec4 = [number, number, number, number];
export type InteractionState = "PASSIVE" | "HOVER" | "ACTIVE";

/* ---------- Global Static Memory ---------- */
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
                                      onRotationChangeAction,
                                  }: {
    onFaceChangeAction: (face: number) => void;
    interactionState: InteractionState;
    onRotationChangeAction?: (angle: number) => void;
}) {
    const geometriesRef = useRef<{
        faceGeometries: THREE.BufferGeometry[];
        structuralGeometry: THREE.BufferGeometry;
    } | null>(null);

    // Lazy initialization
    if (geometriesRef.current === null) {
        const faceGeometries = FACES.map((_, i) => {
            const geo = new THREE.BufferGeometry();
            const edgeCount = faceEdgesIndicesMap[i].length;
            geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgeCount * 6), 3));
            return geo;
        });

        const structuralGeometry = new THREE.BufferGeometry();
        const sEdgeCount = structuralEdgesIndices.length;
        structuralGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(sEdgeCount * 6), 3));

        geometriesRef.current = { faceGeometries, structuralGeometry };
    }

    useEffect(() => {
        return () => {
            if (geometriesRef.current) {
                geometriesRef.current.structuralGeometry.dispose();
                geometriesRef.current.faceGeometries.forEach(g => g.dispose());
                // CRITICAL FIX: Reset ref to null so Strict Mode re-mounts re-initialize geometries
                geometriesRef.current = null;
            }
        };
    }, []);

    const angle = useRef(0);
    const currentVelocity = useRef(0.03);
    const lastFace = useRef<number | null>(null);

    useFrame(() => {
        const geometries = geometriesRef.current;
        if (!geometries) return;

        // Speed logic
        const speedMult = interactionState === "ACTIVE" ? 0 : interactionState === "HOVER" ? 0.125 : 0.5;
        angle.current += currentVelocity.current * speedMult;

        if (onRotationChangeAction) {
            onRotationChangeAction(angle.current);
        }

        // 1. Project 4D -> 3D (Writes to Global Pool)
        for(let i = 0; i < NUM_VERTICES; i++) {
            applyRotationAndProject(vertices4D[i], projectedVerticesPool[i], angle.current);
        }

        // 2. Detect Active Face
        let maxZ = -Infinity;
        let activeFace = 0;

        for(let i = 0; i < 6; i++) {
            const faceIndices = FACES[i];
            let sumZ = 0;
            for(let k=0; k < 4; k++) sumZ += projectedVerticesPool[faceIndices[k]].z;
            const z = sumZ * 0.25;

            if (z > maxZ + 0.01) {
                maxZ = z;
                activeFace = i;
            }
        }

        if (activeFace !== lastFace.current) {
            lastFace.current = activeFace;
            onFaceChangeAction(activeFace);
        }

        // 3. Update Geometry Buffers

        // Update Faces
        for (let i = 0; i < 6; i++) {
            const edges = faceEdgesIndicesMap[i];
            const geometry = geometries.faceGeometries[i];
            const positionAttribute = geometry.attributes.position as THREE.BufferAttribute;
            const array = positionAttribute.array as Float32Array;

            let idx = 0;
            for(let e = 0; e < edges.length; e++) {
                const [a, b] = edges[e];
                const v1 = projectedVerticesPool[a];
                const v2 = projectedVerticesPool[b];

                array[idx++] = v1.x; array[idx++] = v1.y; array[idx++] = v1.z;
                array[idx++] = v2.x; array[idx++] = v2.y; array[idx++] = v2.z;
            }
            positionAttribute.needsUpdate = true;
        }

        // Update Structural
        const positionAttribute = geometries.structuralGeometry.attributes.position as THREE.BufferAttribute;
        const structArray = positionAttribute.array as Float32Array;
        let sIdx = 0;
        for(let e = 0; e < structuralEdgesIndices.length; e++) {
            const [a, b] = structuralEdgesIndices[e];
            const v1 = projectedVerticesPool[a];
            const v2 = projectedVerticesPool[b];

            structArray[sIdx++] = v1.x; structArray[sIdx++] = v1.y; structArray[sIdx++] = v1.z;
            structArray[sIdx++] = v2.x; structArray[sIdx++] = v2.y; structArray[sIdx++] = v2.z;
        }
        positionAttribute.needsUpdate = true;
    });

    if (!geometriesRef.current) return null;

    return (
        <TesseractEdges
            faceGeometries={geometriesRef.current.faceGeometries}
            structuralGeometry={geometriesRef.current.structuralGeometry}
        />
    );
}
