import { a as attr_class, b as attr, s as stringify } from "./index.js";
import "./contracts.js";
function DeadDrop($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { onAdd, forceActive = false } = $$props;
    let inputValue = "";
    let isScrambling = false;
    let isExecutiveOrder = false;
    $$renderer2.push(`<div class="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 svelte-1g7p11h" style="font-family: 'JetBrains Mono', monospace;">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="relative svelte-1g7p11h">`);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(
      `flex items-center bg-neutral-900 border transition-colors duration-300 ${stringify("border-neutral-700 focus-within:border-kl-gold/50")}`,
      "svelte-1g7p11h"
    )}><span class="text-kl-gold/40 pl-4 text-sm svelte-1g7p11h">⟩</span> <input type="text"${attr("value", inputValue)} placeholder="Input Objective..."${attr("disabled", isScrambling, true)} class="flex-1 bg-transparent px-3 py-3 text-white text-sm placeholder:text-neutral-600 focus:outline-none disabled:opacity-50 pr-10 svelte-1g7p11h"/> <button type="button" class="absolute right-12 top-1/2 -translate-y-1/2 p-2 transition-colors duration-300 svelte-1g7p11h"${attr("disabled", isScrambling, true)} aria-label="Toggle executive order"${attr("aria-pressed", isExecutiveOrder)}><svg xmlns="http://www.w3.org/2000/svg"${attr_class(`w-4 h-4 transition-colors duration-300 ${stringify("text-[#555555]")}`, "svelte-1g7p11h")} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" class="svelte-1g7p11h"></path></svg></button> <button type="button"${attr("disabled", !inputValue.trim() || isScrambling, true)} class="px-4 py-3 text-kl-gold/50 hover:text-kl-gold transition-colors disabled:opacity-30 border-l border-neutral-800 svelte-1g7p11h" aria-label="Submit objective"><svg class="w-5 h-5 svelte-1g7p11h" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m0-16l-4 4m4-4l4 4" class="svelte-1g7p11h"></path></svg></button></div></div></div>`);
  });
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var FEATURE_FLAG_NAMES = Object.freeze({
  // This flag exists as a workaround for issue 454 (basically a browser bug) - seems like these rect values take time to update when in grid layout. Setting it to true can cause strange behaviour in the REPL for non-grid zones, see issue 470
  USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT: "USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT"
});
_defineProperty({}, FEATURE_FLAG_NAMES.USE_COMPUTED_STYLE_INSTEAD_OF_BOUNDING_RECT, false);
var _ID_TO_INSTRUCTION;
var INSTRUCTION_IDs$1 = {
  DND_ZONE_ACTIVE: "dnd-zone-active",
  DND_ZONE_DRAG_DISABLED: "dnd-zone-drag-disabled"
};
_ID_TO_INSTRUCTION = {}, _defineProperty(_ID_TO_INSTRUCTION, INSTRUCTION_IDs$1.DND_ZONE_ACTIVE, "Tab to one the items and press space-bar or enter to start dragging it"), _defineProperty(_ID_TO_INSTRUCTION, INSTRUCTION_IDs$1.DND_ZONE_DRAG_DISABLED, "This is a disabled drag and drop list"), _ID_TO_INSTRUCTION;
export {
  DeadDrop as D
};
