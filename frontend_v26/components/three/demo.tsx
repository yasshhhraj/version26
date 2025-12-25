'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // 1. Setup Scene, Camera, Renderer
        const scene = new THREE.Scene();
        // distinct dark background color similar to the demo
        scene.background = new THREE.Color(0x1d1d1d);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 300;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const container = mountRef.current;
        container.appendChild(renderer.domElement);

        // 2. Generate the Texture Programmatically (No external assets needed)
        const createCircleTexture = () => {
            const size = 64;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        };

        // 3. Shaders (Extracted from your HTML)
        const vertexShader = `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 300.0 / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

        const fragmentShader = `
      varying vec3 vColor;
      uniform sampler2D pointTexture;
      void main(){
        vec4 textureColor = texture2D( pointTexture, gl_PointCoord );
        if ( textureColor.a < 0.3 ) discard;
        vec4 color = vec4(vColor.xyz, 1.0) * textureColor;
        gl_FragColor = color;
      }
    `;

        // 4. Create Particles
        const particleCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color1 = new THREE.Color(0x40E0D0); // Turquoise
        const color2 = new THREE.Color(0xFF0080); // Pinkish

        for (let i = 0; i < particleCount; i++) {
            // Position: Random spread
            positions[i * 3] = (Math.random() * 2 - 1) * 500;
            positions[i * 3 + 1] = (Math.random() * 2 - 1) * 500;
            positions[i * 3 + 2] = (Math.random() * 2 - 1) * 500;

            // Color: Mix between two colors
            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            // Size: Random variation
            sizes[i] = Math.random() * 2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: createCircleTexture() },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // 5. Animation Loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Rotate the entire particle system slowly
            points.rotation.x += 0.0005;
            points.rotation.y += 0.001;

            renderer.render(scene, camera);
        };
        animate();

        // 6. Handle Resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // 7. Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            // Dispose resources to prevent memory leaks
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1, // Ensures it stays behind content
                overflow: 'hidden'
            }}
        />
    );
};

export default WebGLBackground;