"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { createNoise3D } from 'simplex-noise'


export default function AGIField() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mountRef.current) return

        /* ---------------- SCENE ---------------- */
        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        )
        camera.position.z = 8

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountRef.current.appendChild(renderer.domElement)

        /* ---------------- NOISE ---------------- */
        const noise3d =  createNoise3D();

        /* ---------------- PARTICLES ---------------- */
        const PARTICLE_COUNT = 1200
        const positions = new Float32Array(PARTICLE_COUNT * 3)

        for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10
        }

        const particleGeo = new THREE.BufferGeometry()
        particleGeo.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        )

        const particleMat = new THREE.PointsMaterial({
            color: 0x6ee7ff,
            size: 0.025,
            transparent: true,
            opacity: 0.6,
            depthWrite: false,
        })

        const particles = new THREE.Points(particleGeo, particleMat)
        scene.add(particles)

        /* ---------------- LINES ---------------- */
        const lineGeo = new THREE.BufferGeometry()
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.15,
        })
        const lines = new THREE.LineSegments(lineGeo, lineMat)
        scene.add(lines)

        /* ---------------- INTERACTION ---------------- */
        const mouse = new THREE.Vector2(999, 999)
        const raycaster = new THREE.Raycaster()
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

        window.addEventListener("mousemove", (e) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
        })

        let pulseStrength = 0
        window.addEventListener("click", () => {
            pulseStrength = 1
        })

        /* ---------------- ANIMATION LOOP ---------------- */
        const animate = () => {
            requestAnimationFrame(animate)

            const time = performance.now() * 0.0003
            const pos = particleGeo.attributes.position.array as Float32Array

            /* ---- Organic motion ---- */
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3
                pos[i3] += noise3d(pos[i3], pos[i3 + 1], time) * 0.002
                pos[i3 + 1] += noise3d(pos[i3 + 1], pos[i3 + 2], time) * 0.002
                pos[i3 + 2] += noise3d(pos[i3 + 2], pos[i3], time) * 0.002
            }

            particleGeo.attributes.position.needsUpdate = true

            /* ---- Mouse proximity ---- */
            raycaster.setFromCamera(mouse, camera)
            const intersection = new THREE.Vector3()
            raycaster.ray.intersectPlane(plane, intersection)

            /* ---- Build neural connections ---- */
            const linePositions: number[] = []
            const MAX_DIST = 0.75

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                    const dx = pos[i * 3] - pos[j * 3]
                    const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
                    const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

                    if (dist < MAX_DIST) {
                        linePositions.push(
                            pos[i * 3],
                            pos[i * 3 + 1],
                            pos[i * 3 + 2],
                            pos[j * 3],
                            pos[j * 3 + 1],
                            pos[j * 3 + 2]
                        )
                    }
                }
            }

            lineGeo.setAttribute(
                "position",
                new THREE.Float32BufferAttribute(linePositions, 3)
            )

            /* ---- Pulse decay ---- */
            pulseStrength *= 0.95
            particleMat.opacity = 0.6 + pulseStrength * 0.4
            lineMat.opacity = 0.15 + pulseStrength * 0.25

            renderer.render(scene, camera)
        }

        animate()

        /* ---------------- CLEANUP ---------------- */
        return () => {
            renderer.dispose()
            mountRef.current?.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div ref={mountRef} className={'absolute inset-0 w-full h-full overflow-clip'}
        />
    )
}
