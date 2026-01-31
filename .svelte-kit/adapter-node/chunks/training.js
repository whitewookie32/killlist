import { w as writable } from "./exports.js";
function createTrainingStore() {
  const { subscribe, set, update } = writable({
    phase: "idle",
    contractId: null
  });
  return {
    subscribe,
    start: () => update((s) => ({ ...s, phase: "secureComms" })),
    advanceToAcquisition: () => update((s) => ({ ...s, phase: "acquisition" })),
    advanceToActivation: (id) => update((s) => ({ ...s, phase: "activation", contractId: id })),
    advanceToExecutionExpand: () => update((s) => ({ ...s, phase: "executionExpand" })),
    advanceToExecution: () => update((s) => ({ ...s, phase: "execution" })),
    advanceToDebrief: () => update((s) => ({ ...s, phase: "debrief" })),
    complete: () => update((s) => ({ ...s, phase: "complete" })),
    reset: () => set({ phase: "idle", contractId: null })
  };
}
const trainingStore = createTrainingStore();
export {
  trainingStore as t
};
