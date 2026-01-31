import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

declare global {
    interface Window {
        updateHoverRotation?: (hovering: boolean) => void;
        setParticleRotation?: (x: number, y: number) => void;
    }
}

export default function RingInfinity() {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<THREE.Group | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [ready, setReady] = useState(false);

    // Optimization: Track visibility to pause rendering
    const isInView = useInView(containerRef, { amount: 0.1 });
    const isInViewRef = useRef(isInView);

    useEffect(() => {
        isInViewRef.current = isInView;
    }, [isInView]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 3, 10);

        const width = container.clientWidth || 1;
        const height = container.clientHeight || 1;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        
        // Optimization 1 & 2: Disable antialias and limit pixel ratio for performance
        const renderer = new THREE.WebGLRenderer({ 
            antialias: false, 
            alpha: true,
            powerPreference: 'high-performance'
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // Calculate initial camera distance to fit width (0.75 factor)
        const fovRad = (camera.fov * Math.PI) / 180;
        const initialDist = 2.2 / (0.75 * Math.tan(fovRad / 2) * (width / height));
        camera.position.set(0, 0, Math.max(initialDist, 1.5));

        // Create main particle system
        const particleCount = 400;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        // Optimization 3: Use 'progress' attribute for GPU-based coloring instead of CPU updates
        const progresses = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const t = (i / particleCount) * Math.PI * 2;

            const radius = 2;
            const x = radius * Math.cos(t);
            const y = radius * Math.sin(t);
            const z = -0.8 * Math.cos(t) * Math.sin(t);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            // Varied sizes for depth
            sizes[i] = 0.01;
            progresses[i] = i / particleCount;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute('progress', new THREE.BufferAttribute(progresses, 1));

        // Custom shader for flowing effect with GPU-based coloring
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: renderer.getPixelRatio() }
            },
            vertexShader: `
                attribute float size;
                attribute float progress;
                varying vec3 vColor;
                varying float vAlpha;
                uniform float time;
                
                // Helper function to convert HSL to RGB directly in shader
                vec3 hsl2rgb(vec3 c) {
                    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
                    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
                }

                void main() {
                    // Calculate hue based on time and particle progress (replaces CPU loop)
                    // Original logic: hue = 0.55 + sin(time * 0.15) * 0.15
                    // Plus progress * 0.1 offset
                    float hueBase = 0.55 + sin(time * 0.15) * 0.15;
                    float finalHue = hueBase + progress * 0.15; // 0.15 matches original range
                    
                    vColor = hsl2rgb(vec3(finalHue, 0.8, 0.6));

                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Flowing wave effect along the path
                    float wave = sin(position.x * 2.0 + position.y * 2.0 + time * 2.0) * 0.5 + 0.5;
                    vAlpha = wave * 0.8 + 0.2;
                    
                    gl_PointSize = size * 8.0 * (1.0 + wave * 0.3) * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    // Circular particle shape with soft edges
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    if (dist > 0.5) discard;
                    
                    float alpha = (1.0 - dist * 2.0) * vAlpha;
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);

        // Create a group to hold all elements
        const loopGroup = new THREE.Group();
        loopGroup.add(particles);
        scene.add(loopGroup);
        particlesRef.current = loopGroup;

        // Create "thinking nodes" - brighter pulses that travel along the path
        const nodeCount = 25;
        const nodeGeometry = new THREE.BufferGeometry();
        const nodePositions = new Float32Array(nodeCount * 3);
        const nodeSizes = new Float32Array(nodeCount);
        const nodePhases: number[] = [];

        for (let i = 0; i < nodeCount; i++) {
            nodePhases.push(Math.random() * Math.PI * 2);
            nodeSizes[i] = 0.15 + Math.random() * 0.1;
        }

        nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        nodeGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

        // Utility function for creating textures
        function createTexture(stops: [number, string][]) {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            if (!ctx) return new THREE.Texture();
            const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
            stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 32, 32);
            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        const nodeMaterial = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x00ffff,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            map: createTexture([
                [0, 'rgba(255,255,255,1)'],
                [0.2, 'rgba(0,255,255,0.8)'],
                [0.5, 'rgba(0,200,255,0.3)'],
                [1, 'rgba(0,150,255,0)']
            ])
        });

        const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
        loopGroup.add(nodes);

        // Create glow trails
        const trailGeometry = new THREE.BufferGeometry();
        const trailPositions = new Float32Array(particleCount * 3);
        const trailColors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            trailPositions[i * 3] = positions[i * 3];
            trailPositions[i * 3 + 1] = positions[i * 3 + 1];
            trailPositions[i * 3 + 2] = positions[i * 3 + 2];

            const color = new THREE.Color(0x00aaff);
            trailColors[i * 3] = color.r * 0.3;
            trailColors[i * 3 + 1] = color.g * 0.3;
            trailColors[i * 3 + 2] = color.b * 0.3;
        }

        trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
        trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

        const trailMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        const trail = new THREE.Line(trailGeometry, trailMaterial);
        loopGroup.add(trail);

        // Create electric sparks/impulses
        const sparkCount = 5;
        const sparkGeometry = new THREE.BufferGeometry();
        const sparkPositions = new Float32Array(sparkCount * 3);
        const sparkSizes = new Float32Array(sparkCount);
        const sparkLifetimes: number[] = [];
        const sparkAngles: number[] = [];

        for (let i = 0; i < sparkCount; i++) {
            sparkLifetimes.push(Math.random());
            sparkAngles.push(Math.random() * Math.PI * 2);
            sparkSizes[i] = Math.random() * 0.02 + 0.01;
        }

        sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
        sparkGeometry.setAttribute('size', new THREE.BufferAttribute(sparkSizes, 1));

        const sparkMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xffffff,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending,
            map: createTexture([
                [0, 'rgba(255,255,255,1)'],
                [0.3, 'rgba(255,200,100,0.9)'],
                [0.6, 'rgba(100,200,255,0.4)'],
                [1, 'rgba(0,150,255,0)']
            ])
        });

        const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
        loopGroup.add(sparks);

        // Handle resize
        const onResize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            if (width === 0 || height === 0) return;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            material.uniforms.pixelRatio.value = renderer.getPixelRatio();

            const dist = 2.2 / (0.75 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
            camera.position.z = Math.max(dist, 1.5);
        };
        
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        // Target rotations
        let targetRotationX = Math.PI / 2;
        let targetRotationY = 0;

        // Update rotation based on hover state
        window.updateHoverRotation = (hovering: boolean) => {
            if (hovering) {
                targetRotationX = 0;
                targetRotationY = 0;
            } else {
                targetRotationX = Math.PI / 2;
                targetRotationY = 0;
            }
        };

        // Animation
        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            // Optimization 3: Skip rendering if not in view
            if (!isInViewRef.current) return;

            const time = clock.getElapsedTime();

            // Update shader time
            material.uniforms.time.value = time;

            // REMOVED: CPU-side color update loop (now handled in vertexShader)

            // Update thinking nodes positions - they travel along the path
            const nodePositions = nodes.geometry.attributes.position.array as Float32Array;
            for (let i = 0; i < nodeCount; i++) {
                const speed = 0.5 + (i % 3) * 0.2;
                const t = (time * speed + nodePhases[i]) % (Math.PI * 2);
                const radius = 2;
                const x = radius * Math.cos(t);
                const y = radius * Math.sin(t);
                const z = -0.8 * Math.cos(t) * Math.sin(t);

                nodePositions[i * 3] = x;
                nodePositions[i * 3 + 1] = y;
                nodePositions[i * 3 + 2] = z;
            }
            (nodes.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

            // Update electric sparks - random impulses
            const sparkPositions = sparks.geometry.attributes.position.array as Float32Array;
            const sparkSizes = sparks.geometry.attributes.size.array as Float32Array;
            for (let i = 0; i < sparkCount; i++) {
                // Update lifetime faster
                sparkLifetimes[i] -= 0.05;

                // Respawn spark at random position
                if (sparkLifetimes[i] <= 0) {
                    sparkLifetimes[i] = 0.6 + Math.random() * 0.4; // Shorter lifetime
                    sparkAngles[i] = Math.random() * Math.PI * 2;
                }

                const t = sparkAngles[i];
                const radius = 2;
                const x = radius * Math.cos(t);
                const y = radius * Math.sin(t);
                const z = -0.8 * Math.cos(t) * Math.sin(t);

                // Add random jitter for electric effect
                const jitter = 0.15;
                sparkPositions[i * 3] = x + (Math.random() - 0.5) * jitter;
                sparkPositions[i * 3 + 1] = y + (Math.random() - 0.5) * jitter;
                sparkPositions[i * 3 + 2] = z + (Math.random() - 0.5) * jitter;

                // Fade out based on lifetime
                const life = sparkLifetimes[i];
                sparkSizes[i] = (0.015 + Math.random() * 0.025) * Math.sin(life * Math.PI * 2);
            }
            (sparks.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
            (sparks.geometry.attributes.size as THREE.BufferAttribute).needsUpdate = true;
            sparkMaterial.opacity = 0.9;

            // Pulse node sizes slightly
            const nodeSizes = nodes.geometry.attributes.size.array as Float32Array;
            for (let i = 0; i < nodeCount; i++) {
                nodeSizes[i] = 0.15 + Math.sin(time * 3 + i) * 0.05;
            }
            (nodes.geometry.attributes.size as THREE.BufferAttribute).needsUpdate = true;

            // Smooth rotation to target - rotate the entire group
            loopGroup.rotation.x += (targetRotationX - loopGroup.rotation.x) * 0.1;
            loopGroup.rotation.y += (targetRotationY - loopGroup.rotation.y) * 0.1;

            renderer.render(scene, camera);
        };

        animate();
        setTimeout(() => setReady(true), 0);

        // Expose rotation control
        window.setParticleRotation = (x: number, y: number) => {
            targetRotationX = x;
            targetRotationY = y;
        };

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
            
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }

            geometry.dispose();
            material.dispose();
            nodeGeometry.dispose();
            nodeMaterial.dispose();
            trailGeometry.dispose();
            trailMaterial.dispose();
            sparkGeometry.dispose();
            sparkMaterial.dispose();
            renderer.dispose();
            
            window.updateHoverRotation = undefined;
            window.setParticleRotation = undefined;
        };
    }, []);

    useEffect(() => {
        if (window.updateHoverRotation) {
            window.updateHoverRotation(isHovering);
        }
    }, [isHovering]);

    return (
        <div className="w-full h-full bg-transparent relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
             <div 
                ref={containerRef} 
                className={`w-full h-full transition-opacity duration-1000 ease-in-out ${ready ? 'opacity-100' : 'opacity-0'}`} 
            />
        </div>
    );
}