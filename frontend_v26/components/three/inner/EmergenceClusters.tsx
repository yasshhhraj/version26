"use client";

import { useFrame } from "@react-three/fiber";
import {useMemo, useRef, useState} from "react";
import * as THREE from "three";

/* ---------- Config ---------- */
const POINT_COUNT = 160;
const RADIUS = 0.9;

const ATTRACT_RADIUS = 0.28;
const REPEL_RADIUS = 0.12;
const ATTRACT_FORCE = 0.018;
const REPEL_FORCE = 0.035;
const DAMPING = 0.985;

const FILAMENT_RADIUS = 0.22;
const MAX_FILAMENTS = 260;

/* ---------- Types ---------- */
type Particle = {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
};

export default function EmergenceClusters({
                                              visible,
                                          }: {
    visible: boolean;
}) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    const [random] = useState(() => Math.random());
    /* ---------- Particles ---------- */
    const particles = useMemo<Particle[]>(() => {
        const arr: Particle[] = [];

        for (let i = 0; i < POINT_COUNT; i++) {
            const p = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1)
            )
                .normalize()
                .multiplyScalar(random * RADIUS);

            arr.push({
                position: p,
                velocity: new THREE.Vector3(),
            });
        }

        return arr;
    }, [random]);

    /* ---------- Animation ---------- */
    useFrame((_, delta) => {
        if (!visible) return;

        // --- Local interactions (emergence rules) ---
        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];

            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dir = new THREE.Vector3().subVectors(b.position, a.position);
                const dist = dir.length();

                if (dist < 0.0001) continue;

                dir.normalize();

                // Repulsion (avoid collapse)
                if (dist < REPEL_RADIUS) {
                    const f = REPEL_FORCE * (1 - dist / REPEL_RADIUS);
                    a.velocity.addScaledVector(dir, -f);
                    b.velocity.addScaledVector(dir, f);
                }

                // Attraction (cluster formation)
                else if (dist < ATTRACT_RADIUS) {
                    const f = ATTRACT_FORCE * (1 - dist / ATTRACT_RADIUS);
                    a.velocity.addScaledVector(dir, f);
                    b.velocity.addScaledVector(dir, -f);
                }
            }
        }

        // --- Integrate motion ---
        particles.forEach((p) => {
            p.velocity.multiplyScalar(DAMPING);
            p.position.addScaledVector(p.velocity, delta);

            // soft containment
            if (p.position.length() > RADIUS) {
                p.position.normalize().multiplyScalar(RADIUS);
                p.velocity.multiplyScalar(0.4);
            }
        });

        // --- Update points geometry ---
        if (pointsRef.current) {
            const pos = pointsRef.current.geometry.attributes.position
                .array as Float32Array;

            particles.forEach((p, i) => {
                pos[i * 3] = p.position.x;
                pos[i * 3 + 1] = p.position.y;
                pos[i * 3 + 2] = p.position.z;
            });

            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // --- Build filaments (local structure) ---
        if (linesRef.current) {
            const linePositions: number[] = [];
            let count = 0;

            for (let i = 0; i < particles.length && count < MAX_FILAMENTS; i++) {
                for (let j = i + 1; j < particles.length && count < MAX_FILAMENTS; j++) {
                    const a = particles[i].position;
                    const b = particles[j].position;
                    const d = a.distanceTo(b);

                    if (d < FILAMENT_RADIUS) {
                        linePositions.push(
                            a.x, a.y, a.z,
                            b.x, b.y, b.z
                        );
                        count++;
                    }
                }
            }

            linesRef.current.geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(linePositions, 3)
            );
            linesRef.current.geometry.computeBoundingSphere();
        }
    });

    /* ---------- Render ---------- */
    return (
        <group visible={visible}>
            {/* ===== EMERGENT PARTICLES ===== */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={new Float32Array(POINT_COUNT * 3)}
                        count={POINT_COUNT}
                        itemSize={3}
                        args={[new Float32Array(POINT_COUNT * 3), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.028}
                    sizeAttenuation
                    color="#cfe1ff"
                    transparent
                    opacity={0.32}
                    depthWrite={false}
                />
            </points>

            {/* ===== FILAMENTS ===== */}
            <lineSegments ref={linesRef}>
                <bufferGeometry />
                <lineBasicMaterial
                    color="#a8bfff"
                    transparent
                    opacity={0.18}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}
