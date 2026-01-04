"use client";

import {useMemo, useState} from "react";
import * as THREE from "three";

/* ---------- Config ---------- */
const GRID_SIZE = 5;
const SPACING = 0.35;
const ENTANGLED_PAIRS = 6;

export default function QuantumSubstrateLattice({
                                                    visible,
                                                }: {
    visible: boolean;
}) {

    const [random1] = useState(()=>Math.random())
    const [random2] = useState(()=>Math.random())

    const { positions, entanglementLines } = useMemo(() => {
        const pts: number[] = [];
        const nodes: THREE.Vector3[] = [];

        const offset = ((GRID_SIZE - 1) * SPACING) / 2;

        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                for (let z = 0; z < GRID_SIZE; z++) {
                    const vx = x * SPACING - offset;
                    const vy = y * SPACING - offset;
                    const vz = z * SPACING - offset;

                    pts.push(vx, vy, vz);
                    nodes.push(new THREE.Vector3(vx, vy, vz));
                }
            }
        }

        const lines: number[] = [];
        for (let i = 0; i < ENTANGLED_PAIRS; i++) {
            const a = nodes[Math.floor(random1 * nodes.length)];
            const b = nodes[Math.floor(random2 * nodes.length)];

            if (a.distanceTo(b) < SPACING * 2) continue;

            lines.push(
                a.x, a.y, a.z,
                b.x, b.y, b.z
            );
        }

        return {
            positions: new Float32Array(pts),
            entanglementLines: new Float32Array(lines),
        };
    }, [random1, random2]);

    return (
        <group visible={visible}>
            {/* ===== LATTICE POINTS ===== */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={positions.length / 3}
                        itemSize={3}
                        args={[new Float32Array(positions.length * 3), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.06}              // ↑ real, visible size
                    sizeAttenuation={true}   // ✅ THIS IS THE KEY
                    color="#00ffff"
                    transparent
                    opacity={0.6}
                    depthWrite={false}
                />
            </points>

            {/* ===== ENTANGLEMENT LINKS ===== */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={entanglementLines}
                        count={entanglementLines.length / 3}
                        itemSize={3}
                        args={[new Float32Array(entanglementLines.length * 3), 3]}

                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#0077ff"
                    transparent
                    opacity={0.3}        // ↑ from 0.12
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}
