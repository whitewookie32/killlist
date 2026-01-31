import { U as escape_html } from "../../../chunks/utils2.js";
import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import "../../../chunks/contracts.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let target = "";
    $$renderer2.push(`<div class="min-h-screen bg-black text-neutral-200 font-mono flex items-center justify-center p-6 relative overflow-hidden"><div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]"></div> <div class="absolute inset-0 opacity-10" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, transparent 2px); background-size: 100% 4px;"></div> <div class="relative w-full max-w-md bg-neutral-900 border border-kl-gold p-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]"><div class="flex flex-col items-center mb-8 space-y-2"><div class="w-16 h-16 border-2 border-kl-gold rounded-full flex items-center justify-center mb-2 animate-pulse"><span class="text-3xl">⚠️</span></div> <h1 class="text-kl-gold text-xl tracking-[0.2em] font-bold text-center">${escape_html("CONTRACT INTERCEPTED")}</h1> <div class="h-px w-24 bg-kl-gold/50"></div></div> <div class="space-y-6 mb-10 text-center"><p class="text-sm text-neutral-400 uppercase tracking-widest">${escape_html("INCOMING TRANSMISSION")}</p> <div class="bg-black/50 p-6 border border-neutral-800"><h2 class="text-2xl text-white font-bold mb-2 break-words leading-tight">${escape_html(target)}</h2> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <p class="text-neutral-400 text-sm leading-relaxed">${escape_html("A new contract is available for your registry. Do you accept this mission?")}</p></div> <div class="grid grid-cols-2 gap-4"><button class="py-4 border border-neutral-700 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 transition-colors uppercase tracking-widest text-xs">${escape_html("DECLINE")}</button> <button class="py-4 bg-kl-gold text-black font-bold hover:bg-yellow-500 transition-colors uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(212,175,55,0.4)]">${escape_html("ACCEPT CONTRACT")}</button></div> <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-kl-gold"></div> <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-kl-gold"></div> <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-kl-gold"></div> <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-kl-gold"></div></div></div>`);
  });
}
export {
  _page as default
};
