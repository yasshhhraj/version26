"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const SHELL_COUNT = 4;

export default function WorldModelShells({
                                             visible,
                                         }: {
    visible: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current || !visible) return;

        const t = clock.elapsedTime * 0.15;

        groupRef.current.children.forEach((child, i) => {
            child.rotation.y = t * (0.3 + i * 0.15);
            child.rotation.x = t * (0.15 + i * 0.1);
        });
    });

    return (
        <group ref={groupRef} visible={visible}>
            {Array.from({ length: SHELL_COUNT }).map((_, i) => {
                const radius = 0.45 + i * 0.18;

                const colors = ["#4cc9f0", "#4895ef", "#4361ee", "#3f37c9"];
                const color = colors[i % colors.length];

                return (
                    <mesh key={i}>
                        <sphereGeometry args={[radius, 64, 64]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.2}
                            transparent
                            opacity={0.1 + i * 0.05}
                            roughness={0.3}
                            metalness={0.2}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
