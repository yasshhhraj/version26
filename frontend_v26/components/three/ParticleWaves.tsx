'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
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
  void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    gl_FragColor = vec4( color, 1.0 );
  }
`

function WavePoints() {
    const meshRef = useRef<THREE.Points>(null!)
    const count = useRef(0)

    // Store active ripples. Each ripple has: x, z, start time (t when clicked)
    // We use a Ref so we don't trigger React re-renders on every click/frame
    const ripples = useRef<Array<{ x: number, z: number, start: number }>>([])

    const [positions, scales] = useMemo(() => {
        const numParticles = AMOUNTX * AMOUNTY
        const positions = new Float32Array(numParticles * 3)
        const scales = new Float32Array(numParticles)

        let i = 0, j = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
                positions[i + 1] = 0
                positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
                scales[j] = 1
                i += 3
                j++
            }
        }
        return [positions, scales]
    }, [])

    useFrame((state, delta) => {
        const points = meshRef.current
        if (!points) return

        const posAttr = points.geometry.attributes.position
        const scaleAttr = points.geometry.attributes.scale
        const t = count.current

        // Clean up old ripples (older than 5 seconds) to save performance
        ripples.current = ripples.current.filter(r => t - r.start < 5)

        let i = 0, j = 0
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                // Get particle positions
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

                // 1. Base Wave (The gentle idle movement)
                let y = Math.sin((ix + t) * 0.3) * 50 + Math.sin((iy + t) * 0.5) * 50

                // 2. Ripple Logic (Sum up active ripples)
                ripples.current.forEach(ripple => {
                    const dx = x - ripple.x
                    const dz = z - ripple.z
                    const dist = Math.sqrt(dx * dx + dz * dz)

                    // Time since this specific click
                    const elapsed = t - ripple.start

                    // Ripple Parameters
                    const speed = 30      // How fast the wave spreads
                    const wavelength = 200 // Distance between rings
                    const amplitude = 50  // Height of the ripple
                    const decay = 2.0      // How fast it fades over time

                    // Only calculate if the wave has reached this particle
                    // (dist < elapsed * speed) creates the expanding circle effect
                    if (dist < elapsed * speed + 500) {

                        // Calculate a wave that moves outward: sin(dist - time)
                        // Add damping: fades as it gets older (elapsed) and further out (dist)
                        const rippleY = Math.sin(dist / wavelength * Math.PI * 2 - elapsed * 5)
                            * amplitude
                            * Math.exp(-elapsed * decay) // Fade with time
                            * Math.max(0, 1 - dist / 3000) // Fade with distance

                        y += rippleY
                    }
                })

                // Update Position and Scale
                posAttr.array[i + 1] = y

                // Scale effect follows the height slightly for visual pop
                scaleAttr.array[j] =
                    (Math.sin((ix + t) * 0.3) + 1) * 20 +
                    (Math.sin((iy + t) * 0.5) + 1) * 20

                i += 3
                j++
            }
        }

        posAttr.needsUpdate = true
        scaleAttr.needsUpdate = true
        count.current += 0.05 // Slower time step for smoother waves
    })

    const handlePointerDown = (e: any) => {
        // e.point contains the Vector3 where the user clicked
        // We push a new ripple to the array using the current 'count' time
        ripples.current.push({
            x: e.point.x,
            z: e.point.z,
            start: count.current
        })
    }

    return (
        <group>
            {/* The Particles */}
            <points ref={meshRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-scale"
                        count={scales.length}
                        array={scales}
                        itemSize={1}
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <shaderMaterial
                    blending={THREE.AdditiveBlending}
                    depthTest={false}
                    transparent={true}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={{
                        color: { value: new THREE.Color('rgba(75,56,142,0.74)') },
                    }}
                />
            </points>

            {/* Invisible Interaction Plane */}
            <mesh
                visible={false}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                // Changed from onPointerMove to onClick (or onPointerDown for instant response)
                onPointerDown={handlePointerDown}
            >
                <planeGeometry args={[AMOUNTX * SEPARATION * 2, AMOUNTY * SEPARATION * 2]} />
                <meshBasicMaterial />
            </mesh>
        </group>
    )
}

export default function ParticleWaves() {
    return (
        <div
            className="h-full w-full bg-transparent  z-50"
            style={{
                // 1. Create a gradient mask:
                // Visible (black) from top to 80% down, then fades to Transparent at 100%
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',

                // 2. Webkit prefix for Safari/Chrome compatibility
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
            }}
        >
            <Canvas fallback={fallback()} camera={{ position: [0, 200, 2500], rotation: [0,0,-0.1], fov: 60 }} resize={{ scroll: false }}>
                <WavePoints />
            </Canvas>
        </div>
    )
}

const fallback = () =>{
    return (
        <div className={'absolute h-full w-full bottom-0 bg-[url("/Assets/background.png")]'}/>
    )
}