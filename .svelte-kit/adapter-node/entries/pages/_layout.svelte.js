import { e as ensure_array_like, a as attr_class, s as stringify, b as attr, c as bind_props, h as head, d as store_get, f as store_set, u as unsubscribe_stores } from "../../chunks/index.js";
import "@sveltejs/kit/internal";
import { w as writable } from "../../chunks/exports.js";
import "../../chunks/utils.js";
import "clsx";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { m as morningReportOpen, a as morningReportBurned } from "../../chunks/contracts.js";
import { U as escape_html } from "../../chunks/utils2.js";
import { t as trainingStore } from "../../chunks/training.js";
function TriggerIndicator($$renderer, $$props) {
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function MissionReportModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { burnedContracts } = $$props;
    $$renderer2.push(`<div class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"><div class="w-full max-w-md"><div class="text-center mb-8"><div class="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-kl-crimson/50 mb-4"><svg class="w-8 h-8 text-kl-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div> <h2 class="text-2xl tracking-widest text-kl-crimson mb-2" style="font-family: 'JetBrains Mono', monospace;">MISSION REPORT</h2> <p class="text-sm text-kl-gold/50" style="font-family: 'JetBrains Mono', monospace;">${escape_html(burnedContracts.length)} contract${escape_html(burnedContracts.length === 1 ? "" : "s")} burned</p></div> <div class="space-y-2 mb-8 max-h-64 overflow-y-auto"><!--[-->`);
    const each_array = ensure_array_like(burnedContracts);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let contract = each_array[$$index];
      $$renderer2.push(`<div class="relative p-4 border border-neutral-700/50 bg-neutral-900/50" style="background: linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(20, 20, 20, 0.6) 100%); border-left: 3px solid rgba(153, 0, 0, 0.5);"><div class="absolute inset-0 pointer-events-none opacity-20" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 100 100%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 /%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 /%3E%3C/svg%3E');"></div> <div class="relative"><h3 class="text-base line-through text-neutral-500" style="font-family: 'JetBrains Mono', monospace; opacity: 0.6;">${escape_html(contract.title)}</h3> <div class="flex items-center justify-between mt-2"><span class="text-xs text-neutral-600" style="font-family: 'JetBrains Mono', monospace;">${escape_html(contract.targetDate)}</span> `);
      if (contract.priority === "highTable") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-xs text-kl-crimson/50 uppercase tracking-wider" style="font-family: 'JetBrains Mono', monospace;">EXECUTIVE ORDER</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div> <button type="button" class="w-full py-4 bg-kl-crimson/20 border border-kl-crimson text-kl-crimson text-sm tracking-widest uppercase transition-colors hover:bg-kl-crimson/30" style="font-family: 'JetBrains Mono', monospace;">Clean House</button> <p class="text-center text-xs text-neutral-600 mt-4" style="font-family: 'JetBrains Mono', monospace;">These contracts will be permanently deleted</p></div></div>`);
  });
}
function SplashScreen($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { visible = true } = $$props;
    let isFading = false;
    if (
      // Wait for fade animation to complete
      visible || isFading
    ) {
      $$renderer2.push("<!--[-->");
<<<<<<< HEAD
      $$renderer2.push(`<div${attr_class(`fixed inset-0 z-[100] transition-opacity duration-500 ${stringify("opacity-100")}`, "svelte-1yxrgyh")} style="background-image: url('/logo.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"><div class="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-3 svelte-1yxrgyh" style="font-family: 'JetBrains Mono', monospace;"><div class="flex gap-1 svelte-1yxrgyh"><div class="w-1.5 h-1.5 bg-kl-gold/60 rounded-full animate-bounce svelte-1yxrgyh" style="animation-delay: 0ms;"></div> <div class="w-1.5 h-1.5 bg-kl-gold/60 rounded-full animate-bounce svelte-1yxrgyh" style="animation-delay: 150ms;"></div> <div class="w-1.5 h-1.5 bg-kl-gold/60 rounded-full animate-bounce svelte-1yxrgyh" style="animation-delay: 300ms;"></div></div> <span class="text-kl-gold/40 text-xs tracking-widest uppercase svelte-1yxrgyh">Initializing</span></div></div>`);
=======
      $$renderer2.push(`<div${attr_class(`fixed inset-0 z-[100] transition-opacity duration-500 ${stringify("opacity-100")}`)} style="background-image: url('/logo.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"><div class="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-3" style="font-family: 'JetBrains Mono', monospace;"><div class="flex gap-1"><div class="w-1.5 h-1.5 bg-kl-gold/60 rounded-full animate-bounce" style="animation-delay: 0ms;"></div> <div class="w-1.5 h-1.5 bg-kl-gold/60 rounded-full animate-bounce" style="animation-delay: 150ms;"></div> <div class="w-1.5 h-1.5 bg-kl-gold/60 rounded-full animate-bounce" style="animation-delay: 300ms;"></div></div> <span class="text-kl-gold/40 text-xs tracking-widest uppercase">Initializing</span></div></div>`);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function MorningReport($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function SecureUplink($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = false } = $$props;
    let message = "";
    let status = "idle";
    if (isOpen) {
      $$renderer2.push("<!--[-->");
<<<<<<< HEAD
      $$renderer2.push(`<div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-kl-black/90 backdrop-blur-md svelte-1d1nr5s"><div class="w-full max-w-lg bg-kl-black border-2 border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden svelte-1d1nr5s"><div class="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex justify-between items-center svelte-1d1nr5s"><span class="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-mono svelte-1d1nr5s">HQ DIRECT CONNECTION</span> <button class="text-zinc-600 hover:text-white transition-colors p-1 svelte-1d1nr5s"><svg class="w-4 h-4 svelte-1d1nr5s" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="svelte-1d1nr5s"></path></svg></button></div> <div class="p-6 space-y-4 svelte-1d1nr5s"><div class="relative group svelte-1d1nr5s"><textarea placeholder="Describe malfunction or request intel..." class="w-full bg-zinc-950 border border-neutral-800 p-4 text-kl-gold font-mono text-sm focus:outline-none focus:border-kl-gold/50 transition-colors placeholder:text-zinc-800 scrollbar-hide resize-none min-h-[120px] svelte-1d1nr5s"${attr("disabled", status === "success", true)}>`);
=======
      $$renderer2.push(`<div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-kl-black/90 backdrop-blur-md svelte-1d1nr5s"><div class="w-full max-w-lg bg-kl-black border-2 border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden svelte-1d1nr5s"><div class="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex justify-between items-center svelte-1d1nr5s"><span class="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-mono svelte-1d1nr5s">HQ DIRECT CONNECTION</span> <button type="button" class="text-zinc-600 hover:text-white transition-colors p-1 svelte-1d1nr5s" aria-label="Close uplink"><svg class="w-4 h-4 svelte-1d1nr5s" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class="svelte-1d1nr5s"></path></svg></button></div> <div class="p-6 space-y-4 svelte-1d1nr5s"><div class="relative group svelte-1d1nr5s"><textarea placeholder="Describe malfunction or request intel..." class="w-full bg-zinc-950 border border-neutral-800 p-4 text-kl-gold font-mono text-sm focus:outline-none focus:border-kl-gold/50 transition-colors placeholder:text-zinc-800 scrollbar-hide resize-none min-h-[120px] svelte-1d1nr5s"${attr("disabled", status === "success", true)}>`);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
      const $$body = escape_html(message);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea> <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-neutral-700 svelte-1d1nr5s"></div> <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700 svelte-1d1nr5s"></div> <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neutral-700 svelte-1d1nr5s"></div> <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neutral-700 svelte-1d1nr5s"></div></div> <button${attr("disabled", !message.trim(), true)}${attr_class(
        `w-full py-4 font-mono font-bold tracking-[0.4em] uppercase text-xs transition-all duration-300 relative group overflow-hidden border ${stringify(
          "bg-kl-gold/5 border-kl-gold text-kl-gold hover:bg-kl-gold/10"
        )} ${stringify("")} ${stringify("")} ${stringify("")} `,
        "svelte-1d1nr5s"
      )}>`);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`[ TRANSMIT REPORT ]`);
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button> <div class="flex justify-between items-center text-[8px] tracking-widest text-zinc-600 font-mono uppercase svelte-1d1nr5s"><span class="svelte-1d1nr5s">FREQ: 433.92MHZ</span> <span class="svelte-1d1nr5s">ESTABLISHING SECURE TUNNEL...</span> <span class="svelte-1d1nr5s">RSA-4096 ACTIVE</span></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
function SettingsModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = false, onOpenUplink } = $$props;
    if (isOpen) {
      $$renderer2.push("<!--[-->");
<<<<<<< HEAD
      $$renderer2.push(`<div class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-kl-black/80 backdrop-blur-sm"><div class="w-full max-w-sm bg-kl-black border border-neutral-800 shadow-2xl overflow-hidden"><div class="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex justify-between items-center"><span class="text-[10px] text-kl-gold uppercase tracking-[0.2em] font-mono font-bold">Terminal Settings</span> <button class="text-zinc-600 hover:text-white transition-colors p-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="p-6 space-y-6"><div class="space-y-3"><div class="flex items-center gap-2"><div class="h-px flex-1 bg-neutral-800"></div> <span class="text-[9px] text-zinc-600 uppercase tracking-widest font-mono">Communications</span> <div class="h-px flex-1 bg-neutral-800"></div></div> <button class="w-full py-4 border-2 border-kl-gold bg-kl-gold/5 text-kl-gold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-kl-gold/10 group shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"><svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> <span class="text-xs font-mono font-bold tracking-widest uppercase">[ REPORT TO HQ ]</span></button></div> <div class="pt-4 text-center"><p class="text-[8px] text-zinc-700 font-mono uppercase tracking-[0.2em]">Build v0.3.0 // Encryption Active</p></div></div></div></div>`);
=======
      $$renderer2.push(`<div class="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-kl-black/80 backdrop-blur-sm"><div class="w-full max-w-sm bg-kl-black border border-neutral-800 shadow-2xl overflow-hidden"><div class="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex justify-between items-center"><span class="text-[10px] text-kl-gold uppercase tracking-[0.2em] font-mono font-bold">Terminal Settings</span> <button type="button" class="text-zinc-600 hover:text-white transition-colors p-1" aria-label="Close settings"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <div class="p-6 space-y-6"><div class="space-y-3"><div class="flex items-center gap-2"><div class="h-px flex-1 bg-neutral-800"></div> <span class="text-[9px] text-zinc-600 uppercase tracking-widest font-mono">Communications</span> <div class="h-px flex-1 bg-neutral-800"></div></div> <button class="w-full py-4 border-2 border-kl-gold bg-kl-gold/5 text-kl-gold flex items-center justify-center gap-3 transition-all duration-300 hover:bg-kl-gold/10 group shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"><svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> <span class="text-xs font-mono font-bold tracking-widest uppercase">[ REPORT TO HQ ]</span></button></div> <div class="pt-4 text-center"><p class="text-[8px] text-zinc-700 font-mono uppercase tracking-[0.2em]">Build v0.3.0 // Encryption Active</p></div></div></div></div>`);
>>>>>>> 8a1ef4ab116f305d0cf661c8f7d423614edd3ccb
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { isOpen });
  });
}
const secureUplinkOpen = writable(false);
const settingsOpen = writable(false);
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    let splashVisible = true;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("12qhfyh", $$renderer3, ($$renderer4) => {
        $$renderer4.push(`<meta name="theme-color" content="#DC2626"/>`);
      });
      {
        $$renderer3.push("<!--[-->");
        SplashScreen($$renderer3, {
          visible: splashVisible
        });
      }
      $$renderer3.push(`<!--]--> `);
      if (store_get($$store_subs ??= {}, "$morningReportOpen", morningReportOpen)) {
        $$renderer3.push("<!--[-->");
        MissionReportModal($$renderer3, {
          burnedContracts: store_get($$store_subs ??= {}, "$morningReportBurned", morningReportBurned)
        });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      MorningReport($$renderer3);
      $$renderer3.push(`<!----> `);
      TriggerIndicator($$renderer3);
      $$renderer3.push(`<!----> `);
      if (store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "secureComms") {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="fixed bottom-36 right-4 z-[110]">`);
        if (store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "secureComms") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="absolute bottom-full right-0 mb-4 w-60 bg-neutral-800 text-neutral-300 text-xs p-4 border border-kl-gold/30 shadow-2xl rounded-sm" style="font-family: 'JetBrains Mono', monospace;"><p class="mb-2 text-kl-gold font-bold tracking-widest">TACTICAL ALERTS</p> <p>Enable secure comms to receive mission activation signals in
          real-time.</p> <div class="absolute -bottom-2 right-6 w-4 h-4 bg-neutral-800 border-b border-r border-kl-gold/30 transform rotate-45"></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <button${attr_class("bg-neutral-900 border-2 border-kl-gold text-kl-gold text-[10px] uppercase tracking-widest px-4 py-3 hover:bg-kl-gold/10 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)] relative cursor-pointer active:scale-95", void 0, {
          "animate-pulse": store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "secureComms"
        })} style="font-family: 'JetBrains Mono', monospace;">[ ENABLE SECURE COMMS ]</button></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (store_get($$store_subs ??= {}, "$trainingStore", trainingStore).phase === "secureComms") {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="fixed inset-0 bg-neutral-950/80 z-[100] transition-opacity duration-500 backdrop-blur-[2px]"></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      SettingsModal($$renderer3, {
        onOpenUplink: () => store_set(secureUplinkOpen, true),
        get isOpen() {
          return store_get($$store_subs ??= {}, "$settingsOpen", settingsOpen);
        },
        set isOpen($$value) {
          store_set(settingsOpen, $$value);
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      SecureUplink($$renderer3, {
        get isOpen() {
          return store_get($$store_subs ??= {}, "$secureUplinkOpen", secureUplinkOpen);
        },
        set isOpen($$value) {
          store_set(secureUplinkOpen, $$value);
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      children($$renderer3);
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
