"use client";

import OrganizationNodes from "./OrganizationNodes";
import WorldModelShells from "@/components/three/inner/WorldModelShells";
import WorldModelPrimitives from "@/components/three/inner/WorldModelPrimitives";
import ReactiveImpulseSpikes from "@/components/three/inner/ReactiveImpulseSpikes";
import ReactivePointFieldSpikes from "@/components/three/inner/ReactivePointFieldSpikes";
import QuantumSubstrateLattice from "@/components/three/inner/QuantumSubstrateLattice";
import EmergenceClusters from "@/components/three/inner/EmergenceClusters";

export default function InnerObjectSwitcher({
                                                activeIndex,
                                            }: {
    activeIndex: number;
}) {
    return (
        <group>
            {/* Face 1 — Organization */}
            <OrganizationNodes visible={activeIndex === 1} />

            {/* Face 2 — Reactivity */}
            {/*<ReactiveImpulseSpikes visible={activeIndex === 2} />*/}
            <ReactivePointFieldSpikes visible={activeIndex==2}/>

            {/* Face 3 — World Models */}
            <WorldModelPrimitives visible={activeIndex==3} />

            {/* Face — Substrate */}
            <QuantumSubstrateLattice visible={activeIndex === 4} />

            {/* Face — Emergence */}
            <EmergenceClusters visible={activeIndex === 5} />

        </group>
    );
}
