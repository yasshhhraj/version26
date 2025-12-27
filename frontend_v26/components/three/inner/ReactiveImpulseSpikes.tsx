"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Spike = {
    position: THREE.Vector3;
    direction: THREE.Vector3;
    life: number;
};

const MAX_SPIKES = 8;

export default function ReactiveImpulseSpikes({
                                                  visible,
                                              }: {
    visible: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const spikes = useRef<Spike[]>([]);

    useFrame((_, delta) => {
        if (!visible || !groupRef.current) return;

        // Random spike generation (threshold event)
        if (Math.random() < 0.04 && spikes.current.length < MAX_SPIKES) {
            const dir = new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1),
                THREE.MathUtils.randFloatSpread(1)
            ).normalize();

            spikes.current.push({
                position: dir.clone().multiplyScalar(0.2),
                direction: dir,
                life: 0.25, // very short-lived
            });
        }

        // Update spikes
        spikes.current.forEach((spike) => {
            spike.life -= delta;
        });

        // Cull dead spikes
        spikes.current = spikes.current.filter((s) => s.life > 0);

        // Apply transforms
        groupRef.current.children.forEach((mesh, i) => {
            const spike = spikes.current[i];
            if (!spike) return;

            const scale = spike.life * 4;

            mesh.position.copy(spike.position);
            mesh.scale.set(0.02, 0.02, scale);
            mesh.lookAt(
                spike.position.clone().add(spike.direction)
            );
        });
    });

    return (
        <group ref={groupRef} visible={visible}>
            {Array.from({ length: MAX_SPIKES }).map((_, i) => (
                <mesh key={i}>
                    <sphereGeometry args={[0.6]} />
                    <meshBasicMaterial
                        color="blue"
                        transparent
                        opacity={0.85}
                    />
                </mesh>
            ))}
        </group>
    );
}
