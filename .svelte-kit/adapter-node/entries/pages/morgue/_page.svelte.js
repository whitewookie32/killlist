import { d as store_get, h as head, b as attr, u as unsubscribe_stores } from "../../../chunks/index.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/contracts.js";
import { B as BottomNav } from "../../../chunks/BottomNav.js";
import { t as trainingStore } from "../../../chunks/training.js";
import "html-to-image";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "debrief";
    let sharing = false;
    head("167ew4i", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>THE MORGUE | KILL LIST</title>`);
      });
    });
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="min-h-screen bg-kl-black flex flex-col pb-20" style="font-family: 'JetBrains Mono', monospace;"><header class="flex items-center justify-center px-6 py-5 border-b border-kl-gold/10"><div class="flex items-center gap-4"><h1 class="text-xl tracking-widest text-kl-gold">THE MORGUE</h1> <button class="text-kl-gold/50 hover:text-kl-gold transition-colors"${attr("disabled", sharing, true)} title="Share Report">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button></div></header> <div class="fixed left-[-9999px] top-0 pointer-events-none z-[-1]">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <main class="flex-1 px-6">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6 mt-8"><div class="h-32 bg-kl-gunmetal/50 animate-pulse"></div> <div class="h-48 bg-kl-gunmetal/50 animate-pulse"></div></div>`);
    }
    $$renderer2.push(`<!--]--></main></div> `);
    BottomNav($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
