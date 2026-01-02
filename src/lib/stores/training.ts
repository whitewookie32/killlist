import { writable } from "svelte/store";

export type TrainingPhase =
    | "idle" // Not started
    | "secureComms" // Phase 1: Registry - Spotlight Secure Comms
    | "acquisition" // Phase 2: Registry - Input target
    | "activation" // Phase 3: Registry - Swipe Accept
    | "executionExpand" // Phase 4: Active - Expand contract
    | "execution" // Phase 5: Active - Swipe Kill
    | "debrief" // Phase 6: Morgue - Animation
    | "complete"; // Done

function createTrainingStore() {
    const { subscribe, set, update } = writable<{
        phase: TrainingPhase;
        contractId: string | null;
    }>({
        phase: "idle",
        contractId: null,
    });

    return {
        subscribe,
        start: () => update((s) => ({ ...s, phase: "secureComms" })),
        advanceToAcquisition: () => update((s) => ({ ...s, phase: "acquisition" })),
        advanceToActivation: (id: string) =>
            update((s) => ({ ...s, phase: "activation", contractId: id })),
        advanceToExecutionExpand: () =>
            update((s) => ({ ...s, phase: "executionExpand" })),
        advanceToExecution: () => update((s) => ({ ...s, phase: "execution" })),
        advanceToDebrief: () => update((s) => ({ ...s, phase: "debrief" })),
        complete: () => update((s) => ({ ...s, phase: "complete" })),
        reset: () => set({ phase: "idle", contractId: null }),
    };
}

export const trainingStore = createTrainingStore();
