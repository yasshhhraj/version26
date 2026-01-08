import * as THREE from "three";


const FACE_COLORS = [
    "#4fd1ff", "#9cff6a", "#ffd166", "#c77dff", "#ff6ad5", "#ff9f1c",
];


export default function TesseractEdges({ faceGeometries, structuralGeometry }: {
    faceGeometries: THREE.BufferGeometry[];
    structuralGeometry: THREE.BufferGeometry;
}) {
    return (
        <>
            {FACE_COLORS.map((color, i) => (
                <group key={i}>
                    <lineSegments geometry={faceGeometries[i]} frustumCulled={false}>
                        <lineBasicMaterial color={color} transparent opacity={0.4} />
                    </lineSegments>
                    <lineSegments geometry={faceGeometries[i]} scale={1.01} frustumCulled={false}>
                        <lineBasicMaterial color={color} transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </lineSegments>
                    <lineSegments geometry={faceGeometries[i]} scale={1.025} frustumCulled={false}>
                        <lineBasicMaterial color={color} transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
                    </lineSegments>
                </group>
            ))}

            <group>
                <lineSegments geometry={structuralGeometry} frustumCulled={false}>
                    <lineBasicMaterial color="#3a86ff" transparent opacity={0.4} />
                </lineSegments>
                <lineSegments geometry={structuralGeometry} scale={1.01} frustumCulled={false}>
                    <lineBasicMaterial color="#3a86ff" transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} />
                </lineSegments>
                <lineSegments geometry={structuralGeometry} scale={1.025} frustumCulled={false}>
                    <lineBasicMaterial color="#3a86ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
                </lineSegments>
            </group>
        </>
    );
}
