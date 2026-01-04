"use client";

import { useFrame } from "@react-three/fiber";
import {JSX, useEffect, useRef, useState} from "react";
import * as THREE from "three";

type Node = {
    radius: number;
    speed: number;
    phase: number;
    inclination: number;
};

const NODE_COUNT = 8;

export default function OrganizationNodes({
                                              visible,
                                          }: {
    visible: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);

    const [random] = useState(()=>Math.random())
    const nodes = useRef<Node[]>(
        Array.from({ length: NODE_COUNT }, () => ({
            radius: THREE.MathUtils.randFloat(0.6, 1.1),
            speed: THREE.MathUtils.randFloat(0.2, 0.6),
            phase: random * Math.PI * 2,
            inclination: THREE.MathUtils.randFloat(-0.6, 0.6),
        }))
    );

    useFrame(({ clock }) => {
        if (!groupRef.current || !visible) return;

        const t = clock.elapsedTime;

        groupRef.current.children.forEach((child, i) => {
            const n = nodes.current[i];
            const angle = t * n.speed + n.phase;

            child.position.set(
                Math.cos(angle) * n.radius,
                Math.sin(angle) * n.inclination,
                Math.sin(angle) * n.radius
            );
        });
    });

    const [groupitems, setGroupItems] = useState<JSX.Element[]>([])

    useEffect(() => {
        const items = nodes.current.map((_, i) => (
            <mesh key={i}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <meshStandardMaterial
                    color="#00f2ff"
                    emissive="#004e52"
                    emissiveIntensity={2}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.9}
                />
            </mesh>
        ))

        setGroupItems(items)
    }, []);


    return (
        <group ref={groupRef} visible={visible}>
            {groupitems}
        </group>
    );
}
