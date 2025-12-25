export function ReasoningCore() {
    return (
        <mesh>
            <boxGeometry args={[0.9, 0.9, 0.9]} />
            <meshStandardMaterial color="#4f9cff" />
        </mesh>
    );
}

export function MemoryCore() {
    return (
        <mesh>
            <sphereGeometry args={[0.7, 48, 48]} />
            <meshStandardMaterial color="#8ddf9c" />
        </mesh>
    );
}

export function ImaginationCore() {
    return (
        <mesh>
            <torusKnotGeometry args={[0.45, 0.15, 160, 32]} />
            <meshStandardMaterial color="#c77dff" />
        </mesh>
    );
}

export function PlanningCore() {
    return (
        <mesh>
            <octahedronGeometry args={[0.85]} />
            <meshStandardMaterial color="#ffd166" />
        </mesh>
    );
}

export function InnerObjectSwitcher({ face }: { face: number }) {
    return (
        <group>
            {face === 0 && <ReasoningCore />}
            {face === 1 && <MemoryCore />}
            {face === 2 && <ImaginationCore />}
            {face === 3 && <PlanningCore />}
            {face === 4 && <ImaginationCore />}
            {face === 5 && <PlanningCore />}
        </group>
    );
}
