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

                return (
                    <mesh key={i}>
                        <sphereGeometry args={[radius, 32, 32]} />
                        <meshStandardMaterial
                            color="#cfd9ff"
                            transparent
                            opacity={0.08 + i * 0.04}
                            roughness={0.6}
                            metalness={0.05}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
