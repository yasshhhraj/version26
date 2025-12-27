"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function WorldModelPrimitives({
                                                 visible,
                                             }: {
    visible: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current || !visible) return;

        const t = clock.elapsedTime;

        groupRef.current.children.forEach((child, i) => {
            child.rotation.x = t * (0.06 + i * 0.04);
            child.rotation.y = t * (0.09 + i * 0.03);
        });
    });

    /**
     * Safe layout (no intersections):
     *
     * Sphere radius ≈ 0.55
     * Cone bounding radius ≈ 0.55
     * Torus outer radius ≈ 0.46
     *
     * Minimum separation ≈ 0.75
     */

    return (
        <group ref={groupRef} visible={visible}>
            {/* === CONTINUITY (Sphere) === */}
            <mesh position={[-0.7, 0.15, 0]}>
                <sphereGeometry args={[0.55, 12, 12]} />
                <meshBasicMaterial
                    color="#cfd9ff"
                    wireframe
                    transparent
                    opacity={0.18}
                />
            </mesh>

            {/* === PERSPECTIVE (Cone) === */}
            <mesh
                position={[0.7, -0.1, 0.15]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <coneGeometry args={[0.45, 0.8, 12, 1, true]} />
                <meshBasicMaterial
                    color="#ffd9b3"
                    wireframe
                    transparent
                    opacity={0.16}
                />
            </mesh>

            {/* === RECURRENCE (Torus) === */}
            <mesh position={[0, 0.65, -0.25]} rotation={[0.6, 0.2, 0]}>
                <torusGeometry args={[0.38, 0.08, 8, 24]} />
                <meshBasicMaterial
                    color="#e3b3ff"
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>
        </group>
    );
}
