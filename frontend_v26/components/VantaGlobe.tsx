'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import GLOBE from 'vanta/dist/vanta.globe.min'

export default function VantaGlobe({
                                       children, classname
                                   }: {
    children?: React.ReactNode, classname?: string
}) {
    const vantaRef = useRef<HTMLDivElement | null>(null)
    const [vantaEffect, setVantaEffect] = useState<any>(null)

    useEffect(() => {
        if (!vantaEffect && vantaRef.current) {
            setVantaEffect(
                GLOBE({
                    el: vantaRef.current,
                    THREE: THREE,

                    // 🌌 Globe tuning
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,

                    color: 0x4fd1ff,          // globe wire color
                    color2: 0x8b5cf6,         // secondary highlights
                    backgroundColor: (0xffffbb),
                    backgroundOpacity: 40,


                    size: 1.2,
                })
            )
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    return (
        <div ref={vantaRef} className={classname}>
            {/* Foreground content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    )
}
