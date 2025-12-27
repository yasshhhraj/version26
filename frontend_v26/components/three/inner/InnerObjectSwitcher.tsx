"use client";

import OrganizationNodes from "./OrganizationNodes";
import WorldModelShells from "@/components/three/inner/WorldModelShells";
import WorldModelPrimitives from "@/components/three/inner/WorldModelPrimitives";
import ReactiveImpulseSpikes from "@/components/three/inner/ReactiveImpulseSpikes";
import ReactivePointFieldSpikes from "@/components/three/inner/ReactivePointFieldSpikes";
import QuantumSubstrateLattice from "@/components/three/inner/QuantumSubstrateLattice";
import EmergenceClusters from "@/components/three/inner/EmergenceClusters";

export default function InnerObjectSwitcher({
                                                activeFace,
                                            }: {
    activeFace: number;
}) {
    return (
        <>
            {/* Face 1 — Organization */}
            <OrganizationNodes visible={activeFace === 1} />

            {/* Face 2 — Reactivity */}
            {/*<ReactiveImpulseSpikes visible={activeFace === 2} />*/}
            <ReactivePointFieldSpikes visible={activeFace==2}/>

            {/* Face 3 — World Models */}
            <WorldModelPrimitives visible={activeFace==3} />

            {/* Face — Substrate */}
            <QuantumSubstrateLattice visible={activeFace === 4} />

            {/* Face — Emergence */}
            <EmergenceClusters visible={activeFace === 5} />

        </>
    );
}
