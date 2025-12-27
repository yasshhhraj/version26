"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- Config ---------- */
const POINT_COUNT = 220;
const BASE_RADIUS = 0.7;
const PULSE_AMPLITUDE = 0.06;
const PULSE_SPEED = 2;

const MAX_SPIKES = 8;
const SPIKE_LIFE = 0.18;

/* ---------- Types ---------- */
type Spike = {
    origin: THREE.Vector3;
    direction: THREE.Vector3;
    life: number;
};

export default function ReactivePointFieldSpikes({
                                                     visible,
                                                 }: {
    visible: boolean;
}) {
    const pointsRef = useRef<THREE.Points>(null);
    const spikeLinesRef = useRef<THREE.LineSegments>(null);

    /* ---------- Point Cloud ---------- */
    const basePositions = useMemo(() => {
        const arr = new Float32Array(POINT_COUNT * 3);

        for (let i = 0; i < POINT_COUNT; i++) {
            const dir = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1)
            ).normalize();

            const r = BASE_RADIUS * THREE.MathUtils.randFloat(0.85, 1);
            dir.multiplyScalar(r);

            arr[i * 3] = dir.x;
            arr[i * 3 + 1] = dir.y;
            arr[i * 3 + 2] = dir.z;
        }

        return arr;
    }, []);

    /* ---------- Spikes ---------- */
    const spikes = useRef<Spike[]>([]);

    useFrame(({ clock }, delta) => {
        if (!visible) return;

        const t = clock.elapsedTime;

        /* ----- Pulsation (thinking / readiness) ----- */
        if (pointsRef.current) {
            const scale =
                1 + Math.sin(t * PULSE_SPEED) * PULSE_AMPLITUDE;
            pointsRef.current.scale.setScalar(scale);
        }

        /* ----- Spike generation (reflex) ----- */
        if (
            Math.random() < 0.05 &&
            spikes.current.length < MAX_SPIKES
        ) {
            const dir = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1)
            ).normalize();

            spikes.current.push({
                origin: dir.clone().multiplyScalar(BASE_RADIUS),
                direction: dir,
                life: SPIKE_LIFE,
            });
        }

        /* ----- Spike update ----- */
        spikes.current.forEach((s) => (s.life -= delta));
        spikes.current = spikes.current.filter((s) => s.life > 0);

        /* ----- Build spike geometry ----- */
        if (spikeLinesRef.current) {
            const positions: number[] = [];

            spikes.current.forEach((s) => {
                const length = s.life * 1.4;

                positions.push(
                    s.origin.x,
                    s.origin.y,
                    s.origin.z,
                    s.origin.x + s.direction.x * length,
                    s.origin.y + s.direction.y * length,
                    s.origin.z + s.direction.z * length
                );
            });

            spikeLinesRef.current.geometry.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(positions, 3)
            );
            spikeLinesRef.current.geometry.computeBoundingSphere();
        }
    });

    return (
        <group visible={visible}>
            {/* ===== Thinking Field (Point Cloud) ===== */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={basePositions}
                        count={POINT_COUNT}
                        itemSize={3}
                        args={[new Float32Array(POINT_COUNT * 3), 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.03}
                    color="#ffdcdc"
                    transparent
                    opacity={1}
                    depthWrite={false}
                />
            </points>

            {/* ===== Reflex Spikes ===== */}
            <lineSegments ref={spikeLinesRef}>
                <bufferGeometry />
                <lineBasicMaterial
                    color="#ff6b6b"
                    transparent
                    opacity={0.85}
                    depthWrite={false}
                />
            </lineSegments>
        </group>
    );
}
