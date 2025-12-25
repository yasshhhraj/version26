"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

/* ---------- 4D Math Utilities ---------- */

type Vec4 = [number, number, number, number];

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

function project4Dto3D([x, y, z, w]: Vec4): THREE.Vector3 {
    const distance = 3;
    const scale = distance / (distance - w);
    return new THREE.Vector3(x * scale, y * scale, z * scale);
}

/* ---------- Tesseract Geometry ---------- */

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

/* ---------- Main Mesh ---------- */

function TesseractMesh({
                           setFrontCell,
                       }: {
    setFrontCell: (i: number) => void;
}) {
    const ref = useRef<THREE.LineSegments>(null);
    const angle = useRef(0);

    useFrame(() => {
        angle.current += 0.01;

        const rotated = vertices4D.map((v) =>
            rotate4D(rotate4D(v, angle.current, 0, 3), angle.current * 0.7, 1, 2)
        );

        const projected = rotated.map(project4Dto3D);

        /* --- Detect front-facing cell --- */
        const cells = [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13, 14, 15],
        ];

        let maxZ = -Infinity;
        let front = 0;

        cells.forEach((cell, i) => {
            const avgZ =
                cell.reduce((sum, idx) => sum + projected[idx].z, 0) / 4;
            if (avgZ > maxZ) {
                maxZ = avgZ;
                front = i;
            }
        });

        setFrontCell(front);

        /* --- Update geometry --- */
        const positions: number[] = [];
        edges.forEach(([a, b]) => {
            positions.push(
                projected[a].x,
                projected[a].y,
                projected[a].z,
                projected[b].x,
                projected[b].y,
                projected[b].z
            );
        });

        ref.current!.geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(positions, 3)
        );
        ref.current!.geometry.computeBoundingSphere();
    });

    return (
        <lineSegments ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color="#4fd1ff" />
        </lineSegments>
    );
}

/* ---------- Canvas Wrapper ---------- */

export default function Ball() {
    const [frontCell, setFrontCell] = useState(0);

    return (
        <>
            {/* Debug / UI */}
            <div className="absolute top-4 left-4 text-white text-sm">
                Front Cell: {frontCell}
            </div>

            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.4} />
                <TesseractMesh setFrontCell={setFrontCell} />
                <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
        </>
    );
}
