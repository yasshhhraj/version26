'use client'

import React, { useRef, useMemo, useState, Suspense } from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import * as THREE from 'three'

const SEPARATION = 100
const AMOUNTX = 50
const AMOUNTY = 50

const vertexShader = `
  attribute float scale;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = scale * ( 300.0 / - mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 color;
  uniform float opacity;
  void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    gl_FragColor = vec4( color, opacity );
  }
`

function WavePoints() {
    const meshRef = useRef<THREE.Points>(null!)
    const count = useRef(0)
    const ripples = useRef<Array<{ x: number, z: number, start: number }>>([])

    const [positions, scales] = useMemo(() => {
        const numParticles = AMOUNTX * AMOUNTY
        const pos = new Float32Array(numParticles * 3)
        const scl = new Float32Array(numParticles)

        let i = 0, j = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                pos[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
                pos[i + 1] = 0
                pos[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
                scl[j] = 1
                i += 3
                j++
            }
        }
        return [pos, scl]
    }, [])

    useFrame(() => {
        const points = meshRef.current
        if (!points) return

        const posAttr = points.geometry.attributes.position
        const scaleAttr = points.geometry.attributes.scale
        const t = count.current

        ripples.current = ripples.current.filter(r => t - r.start < 5)

        let i = 0, j = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

                let y = Math.sin((ix + t) * 0.3) * 50 + Math.sin((iy + t) * 0.5) * 50

                ripples.current.forEach(ripple => {
                    const dx = x - ripple.x
                    const dz = z - ripple.z
                    const dist = Math.sqrt(dx * dx + dz * dz)
                    const elapsed = t - ripple.start
                    const speed = 30, wavelength = 200, amplitude = 50, decay = 2.0

                    if (dist < elapsed * speed + 500) {
                        const rippleY = Math.sin(dist / wavelength * Math.PI * 2 - elapsed * 5)
                            * amplitude
                            * Math.exp(-elapsed * decay)
                            * Math.max(0, 1 - dist / 3000)
                        y += rippleY
                    }
                })

                // Update arrays directly
                posAttr.array[i + 1] = y
                scaleAttr.array[j] = (Math.sin((ix + t) * 0.3) + 1) * 20 + (Math.sin((iy + t) * 0.5) + 1) * 20

                i += 3
                j++
            }
        }

        posAttr.needsUpdate = true
        scaleAttr.needsUpdate = true
        count.current += 0.05
    })

    interface MeshPointerEvent extends PointerEvent {
        point: THREE.Vector3; // Assuming you use Three.js
        // Other custom properties like 'intersections', 'delta', etc.
    }

    return (
        <group>
            <points ref={meshRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} args={[positions, 3]} />
                    <bufferAttribute attach="attributes-scale" count={scales.length} array={scales} itemSize={1} args={[scales, 1]} />
                </bufferGeometry>
                <shaderMaterial
                    blending={THREE.AdditiveBlending}
                    depthTest={false}
                    transparent={true}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{
                        color: { value: new THREE.Color('rgb(75,56,142)') },
                        opacity: { value: 0.74 }
                    }}
                />
            </points>
            <mesh visible={false} rotation={[-Math.PI / 2, 0, 0]}  >
                <planeGeometry args={[AMOUNTX * SEPARATION * 2, AMOUNTY * SEPARATION * 2]} />
                <meshBasicMaterial />
            </mesh>
        </group>
    )
}

export default function ParticleWaves() {
    const [ready, setReady] = useState(false);

    return (
        <div className="relative h-full w-full z-50 bg-transparent">
            <div
                className="absolute inset-0 z-10 bg-transparent"
                style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
                }}
            >
                <Canvas
                    camera={{ position: [0, 200, 2500], rotation: [0, 0, -0.1], fov: 60 }}
                    resize={{ scroll: false }}
                    gl={{ alpha: true, preserveDrawingBuffer: true }}
                    onCreated={() => setReady(true)}
                    className={`transition-opacity duration-1000 ease-in-out ${ready ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Suspense fallback={null}>
                        <WavePoints />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}