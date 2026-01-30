import { w as writable, i as derived } from "./exports.js";
import { p as public_env } from "./shared-server.js";
function getClientTodayISODate(d = /* @__PURE__ */ new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
const DEFAULT_SETTINGS = {
  id: "settings",
  onboardingComplete: false,
  vaultCount: 0
};
public_env.PUBLIC_STORAGE_MODE ?? "local";
const db = {
  contracts: {
    async add(contract) {
      return;
    },
    async update(id, changes) {
      return;
    },
    async delete(id) {
      return;
    },
    async bulkDelete(ids) {
      return;
    }
  }
};
const contracts = writable([]);
const settings = writable(DEFAULT_SETTINGS);
const isLoading = writable(true);
const todayDate = writable(getClientTodayISODate());
const morningReportOpen = writable(false);
const morningReportBurned = writable([]);
const registryContracts = derived(
  contracts,
  ($contracts) => $contracts.filter((c) => c.status === "registry" && (!c.frozenUntil || new Date(c.frozenUntil) <= /* @__PURE__ */ new Date())).sort((a, b) => {
    if (a.priority === "highTable" && b.priority !== "highTable") return -1;
    if (a.priority !== "highTable" && b.priority === "highTable") return 1;
    if (a.order !== void 0 && b.order !== void 0) {
      return a.order - b.order;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })
);
const registryCount = derived(registryContracts, ($registry) => $registry.length);
const todayActiveContracts = derived(
  [contracts, todayDate],
  ([$contracts, $today]) => $contracts.filter((c) => c.targetDate === $today && c.status === "active" && (!c.frozenUntil || new Date(c.frozenUntil) <= /* @__PURE__ */ new Date())).sort((a, b) => {
    if (a.priority === "highTable" && b.priority !== "highTable") return -1;
    if (a.priority !== "highTable" && b.priority === "highTable") return 1;
    if (a.order !== void 0 && b.order !== void 0) {
      return a.order - b.order;
    }
    const aTime = a.terminusTime || "23:59";
    const bTime = b.terminusTime || "23:59";
    return aTime.localeCompare(bTime);
  })
);
derived(
  contracts,
  ($contracts) => $contracts.filter((c) => c.status === "killed").sort((a, b) => {
    const aTime = a.killedAt || a.createdAt;
    const bTime = b.killedAt || b.createdAt;
    return new Date(bTime).getTime() - new Date(aTime).getTime();
  })
);
const vaultCount = derived(settings, ($settings) => $settings.vaultCount);
const openCount = derived(todayActiveContracts, ($active) => $active.length);
function abortContractOptimistic(id) {
  contracts.update(
    (list) => list.map(
      (c) => c.id === id ? { ...c, status: "registry", targetDate: void 0, terminusTime: void 0, acceptedAt: void 0 } : c
    )
  );
  db.contracts.update(id, {
    status: "registry",
    targetDate: void 0,
    terminusTime: void 0,
    acceptedAt: void 0
  }).catch((err) => {
    console.error("Failed to abort contract:", err);
  });
}
export {
  morningReportBurned as a,
  abortContractOptimistic as b,
  registryContracts as c,
  isLoading as i,
  morningReportOpen as m,
  openCount as o,
  registryCount as r,
  todayActiveContracts as t,
  vaultCount as v
};
