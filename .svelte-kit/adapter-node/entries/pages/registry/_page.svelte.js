<<<<<<< HEAD
import { d as store_get, h as head, e as ensure_array_like, g as attr_style, s as stringify, a as attr_class, u as unsubscribe_stores } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import { U as escape_html } from "../../../chunks/utils2.js";
import "clsx";
=======
import { d as store_get, h as head, e as ensure_array_like, b as attr, g as attr_style, s as stringify, a as attr_class, u as unsubscribe_stores } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { B as BottomNav } from "../../../chunks/BottomNav.js";
import { D as DeadDrop } from "../../../chunks/index2.js";
import { c as registryContracts, i as isLoading } from "../../../chunks/contracts.js";
import { t as trainingStore } from "../../../chunks/training.js";
<<<<<<< HEAD
=======
import { U as escape_html } from "../../../chunks/utils2.js";
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const isSecureComms = store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "secureComms";
    const isAcquisition = store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "acquisition";
    const isActivation = store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "activation";
    const DUMMY_CONTRACTS = [
      {
        id: "dummy1",
        title: "OPERATION: BLACKOUT",
        priority: "normal",
        terminusTime: "23:59",
        createdAt: /* @__PURE__ */ new Date()
      },
      {
        id: "dummy2",
        title: "TARGET: UNKNOWN",
        priority: "highTable",
        terminusTime: "00:00",
        createdAt: /* @__PURE__ */ new Date()
      }
    ];
    const visibleContracts = isSecureComms || isAcquisition || isActivation ? [
      ...DUMMY_CONTRACTS,
      ...store_get($$store_subs ??= {}, "$registryContracts", registryContracts)
    ] : store_get($$store_subs ??= {}, "$registryContracts", registryContracts);
    let expandedId = null;
    let deleteConfirmId = null;
    let editingId = null;
    let editValue = "";
    let items = [];
    let swipeStates = {};
    function handleDeadDropAdd(title) {
      if (isAcquisition) {
        setTimeout(
          () => {
            const contract = store_get($$store_subs ??= {}, "$registryContracts", registryContracts).find((c) => c.title === title);
            if (contract) {
              trainingStore.advanceToActivation(contract.id);
            }
          },
          100
        );
      }
    }
    function getSwipeProgress(id) {
      const state = swipeStates[id];
      if (!state) return 0;
      return Math.min(1, state.x / 100);
    }
    head("1wf5eb0", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>THE REGISTRY | KILL LIST</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-kl-black flex flex-col pb-36" style="font-family: 'JetBrains Mono', monospace;"><header class="px-6 py-6 border-b border-neutral-700/30 bg-neutral-900/50"><div class="flex items-center justify-between mb-4"><h1 class="text-sm tracking-widest text-neutral-500 uppercase">The Registry <span class="text-xs text-neutral-600 ml-2 animate-pulse">[SWIPE TO ACCEPT]</span></h1> <div class="flex items-center gap-4"><button type="button" class="text-kl-gold/60 hover:text-kl-gold transition-colors p-1" title="HQ Direct Connection"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></button> <button type="button" class="w-10 h-10 rounded-full border border-kl-gold/40 flex items-center justify-center text-kl-gold hover:border-kl-gold hover:bg-kl-gold/10 transition-colors" title="Add Contract"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"></path></svg></button></div></div> <div class="flex items-baseline gap-3"><span class="text-5xl font-bold text-kl-gold tabular-nums tracking-tight">${escape_html(visibleContracts.length)}</span> <span class="text-xs tracking-widest text-kl-gold/50 uppercase">Pending Bounties</span></div></header> <div class="px-6 py-3 border-b border-neutral-800"><p class="text-[10px] tracking-widest text-neutral-600 uppercase">Cold Storage • Swipe Right to Accept</p></div> <main class="flex-1 px-4 py-4">`);
    if (store_get($$store_subs ??= {}, "$isLoading", isLoading)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-2 mt-4"><!--[-->`);
      const each_array = ensure_array_like([1, 2, 3, 4]);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        each_array[$$index];
        $$renderer2.push(`<div class="h-12 bg-neutral-900 animate-pulse"></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (visibleContracts.length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex flex-col items-center justify-center pt-20"><svg class="w-16 h-16 text-neutral-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg> <p class="text-neutral-600 text-sm tracking-widest text-center">NO PENDING DOSSIERS</p> <p class="text-neutral-700 text-xs tracking-wider mt-2 text-center">Add contracts to the registry</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="space-y-1"><!--[-->`);
        const each_array_1 = ensure_array_like(items);
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let contract = each_array_1[i];
          const swipeProgress = getSwipeProgress(contract.id);
          const isHighTableOrder = contract.priority === "highTable";
          const isExpanded = expandedId === contract.id;
<<<<<<< HEAD
          $$renderer2.push(`<div><div class="relative overflow-hidden bg-neutral-900 border border-neutral-800 group cursor-pointer transition-colors hover:border-neutral-700">`);
=======
          $$renderer2.push(`<div><div class="relative overflow-hidden bg-neutral-900 border border-neutral-800 group cursor-pointer transition-colors hover:border-neutral-700" role="button" tabindex="0"${attr("aria-expanded", isExpanded)}>`);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
          if (isActivation && i === visibleContracts.length - 1) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center gap-2 animate-pulse text-kl-gold"><span class="text-xs tracking-widest bg-black/80 px-2 py-1 border border-kl-gold/30 shadow-[0_0_10px_rgba(212,175,55,0.2)]">SWIPE RIGHT</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> <div class="absolute inset-y-0 left-0 bg-green-900/50 flex items-center pl-4 transition-all"${attr_style(`width: ${stringify(swipeProgress * 100)}%;`)}>`);
          if (swipeProgress > 0.5) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="text-green-400 text-xs tracking-widest">ACCEPT</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="relative transition-transform"${attr_style(`transform: translateX(${stringify(swipeStates[contract.id]?.x || 0)}px);`)}><div class="flex items-center gap-3 p-3 pl-7"><div class="flex-shrink-0">`);
          if (isHighTableOrder) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="w-2 h-2 rounded-full bg-kl-crimson"></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<div class="w-2 h-2 rounded-full bg-neutral-600"></div>`);
          }
          $$renderer2.push(`<!--]--></div> <div class="flex-1 min-w-0">`);
          if (editingId === contract.id) {
            $$renderer2.push("<!--[-->");
<<<<<<< HEAD
            $$renderer2.push(`<div class="relative"><textarea class="w-full bg-neutral-800 border-b border-kl-gold text-white text-sm p-1 focus:outline-none resize-none overflow-hidden block" style="field-sizing: content; min-height: 1.5em;" rows="1" autofocus>`);
=======
            $$renderer2.push(`<div class="relative"><textarea class="w-full bg-neutral-800 border-b border-kl-gold text-white text-sm p-1 focus:outline-none resize-none overflow-hidden block" style="field-sizing: content; min-height: 1.5em;" rows="1">`);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
            const $$body = escape_html(editValue);
            if ($$body) {
              $$renderer2.push(`${$$body}`);
            }
            $$renderer2.push(`</textarea></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<span${attr_class(`text-sm block ${stringify(isExpanded ? "text-white whitespace-pre-wrap break-words" : "text-neutral-300 truncate")}`)}>${escape_html(contract.title)}</span>`);
          }
<<<<<<< HEAD
          $$renderer2.push(`<!--]--></div> <span class="text-[10px] text-neutral-600 tracking-wider flex-shrink-0">${escape_html(contract.terminusTime || "23:59")}</span> <div${attr_class(`hidden md:flex items-center gap-2 ${stringify(isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100")} transition-opacity`)}><button type="button" class="px-2 py-1 border border-green-700 text-green-500 text-[10px] tracking-widest hover:bg-green-900/30 transition-colors">SIGN</button> <button type="button" class="px-2 py-1 border border-neutral-700 text-neutral-500 text-[10px] tracking-widest hover:bg-neutral-800 transition-colors">✕</button></div></div> <div class="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move text-neutral-600 hover:text-neutral-400 z-10"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 19v-2h2v2H7zm0-6v-2h2v2H7zm0-6V5h2v2H7zm4 4h10v2H11v-2zm0 6h10v2H11v-2zm0-12h10v2H11V5z"></path></svg></div> `);
=======
          $$renderer2.push(`<!--]--></div> <span class="text-[10px] text-neutral-600 tracking-wider flex-shrink-0">${escape_html(contract.terminusTime || "23:59")}</span> <div${attr_class(`hidden md:flex items-center gap-2 ${stringify(isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100")} transition-opacity`)}><button type="button" class="px-2 py-1 border border-green-700 text-green-500 text-[10px] tracking-widest hover:bg-green-900/30 transition-colors">SIGN</button> <button type="button" class="px-2 py-1 border border-neutral-700 text-neutral-500 text-[10px] tracking-widest hover:bg-neutral-800 transition-colors">✕</button></div></div> <button type="button" class="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move text-neutral-600 hover:text-neutral-400 z-10" aria-label="Drag to reorder"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 19v-2h2v2H7zm0-6v-2h2v2H7zm0-6V5h2v2H7zm4 4h10v2H11v-2zm0 6h10v2H11v-2zm0-12h10v2H11V5z"></path></svg></button> `);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
          if (isExpanded) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="px-3 pb-3"><div class="pt-3 border-t border-neutral-800 flex flex-col gap-4"><div class="flex items-center justify-between text-[10px] tracking-widest text-neutral-500"><span>Created: ${escape_html(new Date(contract.createdAt).toLocaleDateString())}</span> `);
            if (isHighTableOrder) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<span class="text-kl-crimson font-bold">EXECUTIVE ORDER</span>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></div> <div class="flex items-center justify-between"><div class="flex items-center gap-2"><button type="button" class="w-10 h-10 flex items-center justify-center border border-neutral-700 text-neutral-500 hover:text-kl-gold hover:border-kl-gold/50 hover:bg-kl-gold/5 transition-colors" title="Add to Calendar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></button> <button type="button" class="w-10 h-10 flex items-center justify-center border border-neutral-700 text-neutral-500 hover:text-white hover:border-neutral-500 hover:bg-neutral-800 transition-colors" title="Assign Agent"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg></button> <button type="button" class="w-10 h-10 flex items-center justify-center border border-neutral-700 text-neutral-500 hover:text-kl-gold hover:border-kl-gold/50 hover:bg-kl-gold/5 transition-colors" title="Amend Intel"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button> <button type="button"${attr_class(`w-10 h-10 flex items-center justify-center border transition-all duration-200 ${stringify(deleteConfirmId === contract.id ? "border-red-600 bg-red-900/20 text-red-500 w-24" : "border-neutral-700 text-neutral-500 hover:text-red-500 hover:border-red-900/50 hover:bg-red-900/10")}`)} title="Delete">`);
            if (deleteConfirmId === contract.id) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<span class="text-[10px] uppercase font-bold tracking-widest leading-none">SHRED</span>`);
            } else {
              $$renderer2.push("<!--[!-->");
              $$renderer2.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`);
            }
            $$renderer2.push(`<!--]--></button></div> <button type="button" class="px-6 py-2.5 border border-kl-gold text-kl-gold text-xs font-bold tracking-widest hover:bg-kl-gold/10 transition-colors uppercase bg-kl-gold/5">[ACCEPT]</button></div></div></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></main> `);
    if (isAcquisition) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed bottom-36 left-0 right-0 flex justify-center z-50 pointer-events-none"><div class="flex flex-col items-center gap-2 animate-bounce"><span class="text-kl-gold text-xs tracking-widest bg-black/80 px-3 py-1 border border-kl-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]">INPUT TARGET</span> <svg class="w-4 h-4 text-kl-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    DeadDrop($$renderer2, { onAdd: handleDeadDropAdd });
    $$renderer2.push(`<!----> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    BottomNav($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
