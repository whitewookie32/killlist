<<<<<<< HEAD
import { g as attr_style, s as stringify, a as attr_class, h as head, d as store_get, e as ensure_array_like, u as unsubscribe_stores } from "../../chunks/index.js";
=======
import { g as attr_style, s as stringify, a as attr_class, b as attr, h as head, d as store_get, e as ensure_array_like, u as unsubscribe_stores } from "../../chunks/index.js";
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import { U as escape_html } from "../../chunks/utils2.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { D as DeadDrop } from "../../chunks/index2.js";
import { B as BottomNav } from "../../chunks/BottomNav.js";
import { i as isLoading, v as vaultCount, o as openCount, t as todayActiveContracts, r as registryCount, b as abortContractOptimistic } from "../../chunks/contracts.js";
import { t as trainingStore } from "../../chunks/training.js";
function OathScreen($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let holdProgress = 0;
    $$renderer2.push(`<div class="fixed inset-0 bg-kl-black flex flex-col items-center justify-center z-50" role="button" tabindex="0"><h1 class="font-body text-xl tracking-widest mb-16 transition-opacity duration-300"${attr_style(`color: rgba(212, 175, 55, ${stringify(0.6 + holdProgress * 0.4)}); font-family: 'JetBrains Mono', monospace;`)}>THE ORDER.</h1> <div class="relative w-32 h-32 mb-16"><div class="absolute inset-0 rounded-lg overflow-hidden border transition-all duration-300"${attr_style(` background: linear-gradient(135deg, rgba(80, 20, 20, ${stringify(0.3 + holdProgress * 0.4)}) 0%, rgba(40, 10, 10, ${stringify(0.2 + holdProgress * 0.3)}) 100%); border-color: rgba(153, 0, 0, ${stringify(0.3 + holdProgress * 0.4)}); box-shadow: 0 0 ${stringify(holdProgress * 40)}px rgba(153, 0, 0, ${stringify(holdProgress * 0.5)}); `)}><div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(100, 100, 100, 0.3) 2px, rgba(100, 100, 100, 0.3) 3px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(100, 100, 100, 0.3) 2px, rgba(100, 100, 100, 0.3) 3px);"></div></div> <svg viewBox="0 0 512 512" class="absolute inset-0 m-auto w-16 h-16"${attr_style(`filter: drop-shadow(0 0 ${stringify(holdProgress * 20)}px rgba(220, 38, 38, ${stringify(holdProgress * 0.8)}));`)}><path${attr_style(`fill: rgba(220, 60, 60, ${stringify(0.7 + holdProgress * 0.3)});`)} d="M390.42,75.28a10.45,10.45,0,0,1-5.32-1.44C340.72,50.08,302.35,40,256.35,40c-45.77,0-89.23,11.28-128.76,33.84C122,77,115.11,74.8,111.87,69a12.4,12.4,0,0,1,4.63-16.32A281.81,281.81,0,0,1,256.35,16c49.23,0,92.23,11.28,139.39,36.48a12,12,0,0,1,4.85,16.08A11.3,11.3,0,0,1,390.42,75.28Zm-330.79,126a11.73,11.73,0,0,1-6.7-2.16,12.26,12.26,0,0,1-2.78-16.8c22.89-33.6,52-60,86.69-78.48C209.42,65,302.35,64.72,375.16,103.6c34.68,18.48,63.8,44.64,86.69,78a12.29,12.29,0,0,1-2.78,16.8,11.26,11.26,0,0,1-16.18-2.88c-20.8-30.24-47.15-54-78.36-70.56-66.34-35.28-151.18-35.28-217.29.24-31.44,16.8-57.79,40.8-78.59,71A10,10,0,0,1,59.63,201.28ZM204.1,491a10.66,10.66,0,0,1-8.09-3.6C175.9,466.48,165,453,149.55,424c-16-29.52-24.27-65.52-24.27-104.16,0-71.28,58.71-129.36,130.84-129.36S387,248.56,387,319.84a11.56,11.56,0,1,1-23.11,0c0-58.08-48.32-105.36-107.72-105.36S148.4,261.76,148.4,319.84c0,34.56,7.39,66.48,21.49,92.4,14.8,27.6,25,39.36,42.77,58.08a12.67,12.67,0,0,1,0,17A12.44,12.44,0,0,1,204.1,491Zm165.75-44.4c-27.51,0-51.78-7.2-71.66-21.36a129.1,129.1,0,0,1-55-105.36,11.57,11.57,0,1,1,23.12,0,104.28,104.28,0,0,0,44.84,85.44c16.41,11.52,35.6,17,58.72,17a147.41,147.41,0,0,0,24-2.4c6.24-1.2,12.25,3.12,13.4,9.84a11.92,11.92,0,0,1-9.47,13.92A152.28,152.28,0,0,1,369.85,446.56ZM323.38,496a13,13,0,0,1-3-.48c-36.76-10.56-60.8-24.72-86-50.4-32.37-33.36-50.16-77.76-50.16-125.28,0-38.88,31.9-70.56,71.19-70.56s71.2,31.68,71.2,70.56c0,25.68,21.5,46.56,48.08,46.56s48.08-20.88,48.08-46.56c0-90.48-75.13-163.92-167.59-163.92-65.65,0-125.75,37.92-152.79,96.72-9,19.44-13.64,42.24-13.64,67.2,0,18.72,1.61,48.24,15.48,86.64,2.32,6.24-.69,13.2-6.7,15.36a11.34,11.34,0,0,1-14.79-7,276.39,276.39,0,0,1-16.88-95c0-28.8,5.32-55,15.72-77.76,30.75-67,98.94-110.4,173.6-110.4,105.18,0,190.71,84.24,190.71,187.92,0,38.88-31.9,70.56-71.2,70.56s-71.2-31.68-71.2-70.56C303.5,293.92,282,273,255.42,273s-48.08,20.88-48.08,46.56c0,41,15.26,79.44,43.23,108.24,22,22.56,43,35,75.59,44.4,6.24,1.68,9.71,8.4,8.09,14.64A11.39,11.39,0,0,1,323.38,496Z"></path></svg> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <p class="font-body text-sm tracking-wider transition-opacity duration-300"${attr_style(`color: rgba(139, 115, 85, ${stringify(0.5 + holdProgress * 0.5)}); font-family: 'JetBrains Mono', monospace;`)}>`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`Press and hold to confirm`);
    }
    $$renderer2.push(`<!--]--></p></div>`);
  });
}
function ContractCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      contract,
      onAbort
    } = $$props;
    let offsetX = 0;
    let isCompleting = false;
<<<<<<< HEAD
=======
    let isExpanded = false;
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
    const isExecutiveOrder = contract.priority === "highTable";
    $$renderer2.push(`<div class="relative overflow-hidden" style="touch-action: pan-y;"><div class="absolute inset-0 flex items-center justify-center transition-colors duration-200"${attr_style(`background: ${stringify(`linear-gradient(to left, rgba(59, 130, 246, ${0.3 * Math.min(1, Math.abs(offsetX) / 150)}), rgba(147, 197, 253, ${0.2 * Math.min(1, Math.abs(offsetX) / 150)}))`)};`)}>`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
<<<<<<< HEAD
    $$renderer2.push(`<!--]--></div> <div${attr_class(`relative bg-neutral-800 transition-[opacity] duration-200 cursor-grab active:cursor-grabbing gpu-accelerated ${stringify(isExecutiveOrder ? "border-l-4 border-l-kl-gold border-y border-r border-neutral-700" : "border border-neutral-700")} ${stringify("")}`)}${attr_style(`transform: translate3d(${stringify(offsetX)}px, 0, 0); will-change: transform; ${stringify("transition: transform 0.3s ease-out;")}`)}><div class="p-4"><div class="flex items-start justify-between gap-3 mb-2"><div class="flex-1 min-w-0 relative cursor-pointer select-none"><h3${attr_class(`text-base font-medium transition-all ${stringify(isExecutiveOrder ? "text-kl-gold" : "text-white")} ${stringify("truncate")}`, void 0, { "line-through": isCompleting, "opacity-50": isCompleting })} style="font-family: 'JetBrains Mono', monospace;">${escape_html(contract.title)}</h3></div> `);
=======
    $$renderer2.push(`<!--]--></div>  <div${attr_class(`relative bg-neutral-800 transition-[opacity] duration-200 cursor-grab active:cursor-grabbing gpu-accelerated ${stringify(isExecutiveOrder ? "border-l-4 border-l-kl-gold border-y border-r border-neutral-700" : "border border-neutral-700")} ${stringify("")}`)}${attr_style(`transform: translate3d(${stringify(offsetX)}px, 0, 0); will-change: transform; ${stringify("transition: transform 0.3s ease-out;")}`)} role="article"${attr("aria-label", contract.title)}><div class="p-4"><div class="flex items-start justify-between gap-3 mb-2"><div class="flex-1 min-w-0 relative cursor-pointer select-none" role="button" tabindex="0"${attr("aria-expanded", isExpanded)}><h3${attr_class(`text-base font-medium transition-all ${stringify(isExecutiveOrder ? "text-kl-gold" : "text-white")} ${stringify("truncate")}`, void 0, { "line-through": isCompleting, "opacity-50": isCompleting })} style="font-family: 'JetBrains Mono', monospace;">${escape_html(contract.title)}</h3></div> `);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
    if (isExecutiveOrder) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex-shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-kl-crimson/10 border border-kl-crimson/30 text-kl-crimson" style="font-family: 'JetBrains Mono', monospace;">PRIORITY</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex items-center justify-between"><p class="text-xs text-neutral-500" style="font-family: 'JetBrains Mono', monospace;">DEADLINE: 23:59</p> `);
    if (onAbort) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="text-[10px] text-neutral-600 hover:text-kl-crimson tracking-widest transition-colors" style="font-family: 'JetBrains Mono', monospace;">[ABORT MISSION]</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
<<<<<<< HEAD
    $$renderer2.push(`<!--]--></div></div> <div${attr_class("absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move text-neutral-600 hover:text-neutral-400 z-10", void 0, { "hidden": isCompleting })}><span class="text-neutral-600 text-lg font-light select-none">»</span></div> `);
=======
    $$renderer2.push(`<!--]--></div></div> <button type="button"${attr_class("absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move text-neutral-600 hover:text-neutral-400 z-10", void 0, { "hidden": isCompleting })} aria-label="Drag to reorder"><span class="text-neutral-600 text-lg font-light select-none">»</span></button> `);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let items = [];
    function handleContractAbort(id) {
      abortContractOptimistic(id);
    }
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>KILL LIST</title>`);
      });
    });
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!store_get($$store_subs ??= {}, "$isLoading", isLoading)) {
      $$renderer2.push("<!--[-->");
      OathScreen($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="min-h-screen bg-kl-black flex flex-col pb-20" style="font-family: 'JetBrains Mono', monospace;"><header class="flex items-center justify-between px-6 py-5 border-b border-kl-gold/10"><h1 class="text-xl tracking-widest text-kl-gold">KILL LIST</h1> <div class="flex items-center gap-3"><button class="border border-kl-gold/30 text-kl-gold/70 text-[10px] uppercase px-3 py-1.5 hover:bg-kl-gold/10 hover:border-kl-gold hover:text-kl-gold transition-colors tracking-wider mr-2">[ Recruit ]</button> <span class="text-kl-gold text-lg">${escape_html(store_get($$store_subs ??= {}, "$vaultCount", vaultCount))}</span></div></header>  <div class="flex items-center justify-between px-6 py-4"><div class="flex flex-col"><span class="text-sm tracking-widest text-kl-gold/70">TODAY'S CONTRACTS</span> `);
    if (store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase !== "executionExpand" && store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase !== "execution") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs text-neutral-600 animate-pulse mt-0.5">[SWIPE TO EXECUTE]</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <span class="text-sm tracking-wider text-kl-gold whitespace-nowrap">${escape_html(store_get($$store_subs ??= {}, "$openCount", openCount))} OPEN</span></div> <main class="flex-1 px-6">`);
    if (store_get($$store_subs ??= {}, "$isLoading", isLoading)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-3 mt-8"><!--[-->`);
      const each_array = ensure_array_like([1, 2, 3]);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        each_array[$$index];
        $$renderer2.push(`<div class="h-16 bg-kl-gunmetal/50 animate-pulse"></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (store_get($$store_subs ??= {}, "$todayActiveContracts", todayActiveContracts).length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex flex-col items-center justify-center pt-20"><div class="text-neutral-700 text-6xl mb-6">⊘</div> <p class="text-kl-gold text-sm tracking-widest text-center mb-2 uppercase">No Active Contracts</p> <p class="text-neutral-600 text-xs tracking-wider text-center mb-8 max-w-xs">You are idle. That is dangerous.</p> <a href="/registry" class="px-6 py-3 bg-kl-gold/10 border border-kl-gold/40 text-kl-gold text-sm tracking-widest hover:bg-kl-gold/20 transition-colors uppercase" style="font-family: 'JetBrains Mono', monospace;">Access Registry `);
        if (store_get($$store_subs ??= {}, "$registryCount", registryCount) > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="ml-2 text-kl-gold/60">(${escape_html(store_get($$store_subs ??= {}, "$registryCount", registryCount))})</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></a></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="space-y-3"><!--[-->`);
        const each_array_1 = ensure_array_like(items);
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          let contract = each_array_1[i];
          $$renderer2.push(`<div${attr_class("relative", void 0, {
            "ring-2": store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "executionExpand" || store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "execution",
            "ring-kl-gold": store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "executionExpand" || store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "execution"
          })}>`);
          if (store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "executionExpand" && i === 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="absolute -top-12 left-0 right-0 flex justify-center z-20 pointer-events-none"><div class="flex flex-col items-center gap-1 animate-bounce"><span class="text-kl-gold text-xs tracking-widest bg-black/80 px-2 py-1 border border-kl-gold shadow-[0_0_10px_rgba(212,175,55,0.3)]">TAP TO EXPAND</span> <svg class="w-4 h-4 text-kl-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg></div></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "execution" && i === 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="absolute top-8 right-6 z-20 pointer-events-none flex items-center gap-2 animate-pulse text-kl-gold"><span class="text-xs tracking-widest bg-black/80 px-2 py-1 border border-kl-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.3)]">SWIPE RIGHT</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          ContractCard($$renderer2, {
            contract,
            onAbort: handleContractAbort
          });
          $$renderer2.push(`<!----></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></main> `);
    DeadDrop($$renderer2, { forceActive: true });
    $$renderer2.push(`<!----></div> `);
    BottomNav($$renderer2);
    $$renderer2.push(`<!----> <div class="fixed bottom-20 left-4 hidden md:flex items-center gap-2 text-kl-gold/30 text-xs" style="font-family: 'JetBrains Mono', monospace;"><kbd class="px-2 py-1 border border-kl-gold/20 text-kl-gold/50">SPACE</kbd> <span>Hold to execute top contract</span></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
