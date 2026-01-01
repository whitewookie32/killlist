<script lang="ts">
  import { onMount } from "svelte"; // Add onMount
  import { slide } from "svelte/transition";
  import type { Contract } from "$lib/db";
  import { playExecuteSound, unlockAudio } from "$lib/audio";
  import { trackContractKilled, trackContractAborted } from "$lib/analytics";
  import { downloadMissionICS } from "$lib/ics";

  // Props
  interface Props {
    contract: Contract;
    onComplete: (id: string) => void;
    onAbort?: (id: string) => void;
  }

  let { contract, onComplete, onAbort }: Props = $props();

  // State
  let offsetX = $state(0);
  let isCompleting = $state(false);
  let showKilledStamp = $state(false);
  let isDragging = $state(false);
  let isExpanded = $state(false);
  let didSwipe = $state(false);

  // Touch tracking refs
  let startX = 0;
  let startTime = 0;

  const SWIPE_THRESHOLD = 120; // px to trigger completion
  const VELOCITY_THRESHOLD = 0.5; // px/ms
  const TAP_TOLERANCE = 10; // px - movement less than this is considered a tap
  const TEASE_AMOUNT = 15; // px to slide for tease

  // Tease Animation Check
  onMount(() => {
    // Check if we've already teased in this session
    const hasTeased = sessionStorage.getItem("swiped_tease_shown");

    if (!hasTeased) {
      // Small delay to ensure render
      setTimeout(() => {
        // Quick subtle slide right and back
        offsetX = TEASE_AMOUNT;

        setTimeout(() => {
          offsetX = 0;
          sessionStorage.setItem("swiped_tease_shown", "true");
        }, 300); // Duration of slide out
      }, 500); // Delay before starting
    }
  });

  // Derived
  const isExecutiveOrder = $derived(contract.priority === "highTable");

  // Toggle details expansion
  function toggleDetails() {
    if (didSwipe) {
      didSwipe = false;
      return;
    }
    isExpanded = !isExpanded;
  }

  // Format accepted timestamp
  function formatAcceptedTime(): string {
    const date = new Date(contract.acceptedAt || contract.createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `Accepted ${diffHours}h ago`;
    } else if (diffMinutes > 0) {
      return `Accepted ${diffMinutes}m ago`;
    } else {
      return "Accepted just now";
    }
  }

  // Touch handlers
  function handleTouchStart(e: TouchEvent) {
    if (isCompleting) return;

    isDragging = true;
    didSwipe = false;
    startX = e.touches[0].clientX;
    startTime = Date.now();
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isDragging || isCompleting) return;

    const deltaX = e.touches[0].clientX - startX;

    // Mark as swipe if movement exceeds tap tolerance
    if (Math.abs(deltaX) > TAP_TOLERANCE) {
      didSwipe = true;
    }

    // Only allow swipe right
    offsetX = Math.max(0, deltaX);
  }

  function handleTouchEnd() {
    if (!isDragging || isCompleting) return;

    isDragging = false;

    const elapsed = Date.now() - startTime;
    const velocity = offsetX / elapsed;

    // Check if swipe was aggressive enough
    if (offsetX > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      didSwipe = true;
      triggerCompletion();
    } else {
      // Spring back
      offsetX = 0;
    }
  }

  function triggerCompletion() {
    isCompleting = true;
    unlockAudio();
    playExecuteSound();

    // Show KILLED stamp
    showKilledStamp = true;

    // Track the kill via swipe
    const acceptedAt = contract.acceptedAt
      ? new Date(contract.acceptedAt).getTime()
      : null;
    const timeToKill = acceptedAt ? Date.now() - acceptedAt : undefined;

    // Calculate total lifespan (Creation -> Kill)
    const createdAt = new Date(contract.createdAt).getTime();
    const lifespanMinutes = (Date.now() - createdAt) / 60000;

    trackContractKilled({
      method: "swipe",
      time_to_kill_ms: timeToKill,
      lifespan_minutes: lifespanMinutes,
      is_executive_order: contract.priority === "highTable",
    });

    // Slide out and trigger completion
    setTimeout(() => {
      offsetX = 400; // Slide off screen
      setTimeout(() => {
        onComplete(contract.id);
      }, 300);
    }, 600);
  }

  function handleAbort(e: MouseEvent) {
    e.stopPropagation();
    trackContractAborted();
    onAbort?.(contract.id);
  }

  // Compute swipe progress (0-1)
  const swipeProgress = $derived(Math.min(1, offsetX / SWIPE_THRESHOLD));
</script>

<div class="relative overflow-hidden" style="touch-action: pan-y;">
  <!-- Swipe reveal background - KILLED stamp -->
  <div
    class="absolute inset-0 flex items-center justify-center transition-colors duration-200"
    style="background: linear-gradient(to right, rgba(34, 197, 94, {0.3 *
      swipeProgress}), rgba(212, 175, 55, {0.2 * swipeProgress}));"
  >
    {#if swipeProgress > 0.3}
      <div
        class="text-green-500 text-xl font-bold tracking-widest uppercase transform -rotate-12 border-2 border-green-500 px-4 py-1"
        style="opacity: {swipeProgress}; font-family: 'JetBrains Mono', monospace;"
      >
        KILLED
      </div>
    {/if}
  </div>

  <!-- Card - GPU Accelerated -->
  <div
    class="relative bg-neutral-800 transition-[opacity] duration-200 cursor-grab active:cursor-grabbing gpu-accelerated
      {isExecutiveOrder
      ? 'border-l-4 border-l-kl-gold border-y border-r border-neutral-700'
      : 'border border-neutral-700'}
      {isCompleting ? 'opacity-50' : ''}"
    style="transform: translate3d({offsetX}px, 0, 0); will-change: transform; {isDragging
      ? ''
      : 'transition: transform 0.3s ease-out;'}"
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
    ontouchcancel={() => {
      isDragging = false;
      offsetX = 0;
    }}
  >
    <div class="p-4">
      <!-- Header row: Title + Priority badge -->
      <div class="flex items-start justify-between gap-3 mb-2">
        <!-- Clickable title area (tap to expand) -->
        <div
          class="flex-1 min-w-0 relative cursor-pointer select-none"
          onclick={toggleDetails}
        >
          <h3
            class="text-base font-medium transition-all {isExecutiveOrder
              ? 'text-kl-gold'
              : 'text-white'}
              {isExpanded ? 'whitespace-pre-wrap break-words' : 'truncate'}"
            class:line-through={isCompleting}
            class:opacity-50={isCompleting}
            style="font-family: 'JetBrains Mono', monospace;"
          >
            {contract.title}
          </h3>
        </div>

        <!-- Priority badge -->
        {#if isExecutiveOrder}
          <div
            class="flex-shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest bg-kl-crimson/10 border border-kl-crimson/30 text-kl-crimson"
            style="font-family: 'JetBrains Mono', monospace;"
          >
            PRIORITY
          </div>
        {/if}
      </div>

      <!-- Expanded details panel -->
      {#if isExpanded}
        <div
          class="mb-2 pt-2 border-t border-neutral-700/50"
          transition:slide={{ duration: 200 }}
        >
          <p
            class="text-[10px] text-neutral-500 tracking-wider"
            style="font-family: 'JetBrains Mono', monospace;"
          >
            {formatAcceptedTime()}
          </p>
        </div>
      {/if}

      <!-- Footer row: Deadline + Abort -->
      <div class="flex items-center justify-between">
        <p
          class="text-xs text-neutral-500"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          DEADLINE: 23:59
        </p>

        <!-- Abort button -->
        {#if onAbort}
          <button
            type="button"
            class="text-[10px] text-neutral-600 hover:text-kl-crimson tracking-widest transition-colors"
            style="font-family: 'JetBrains Mono', monospace;"
            onclick={handleAbort}
          >
            [ABORT MISSION]
          </button>
        {/if}

        <!-- Mission Upload Button (Desktop/Mobile) -->
        {#if isExpanded}
          <button
            type="button"
            class="text-[10px] text-kl-gold/70 hover:text-kl-gold tracking-widest transition-colors flex items-center gap-1 ml-4"
            style="font-family: 'JetBrains Mono', monospace;"
            onclick={(e) => {
              e.stopPropagation();
              downloadMissionICS(contract);
            }}
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            [UPLOAD MISSION]
          </button>
        {/if}
      </div>
    </div>

    <!-- Grip Handle (Affordance) -->
    <div
      class="absolute left-0 top-0 bottom-0 w-6 flex items-center justify-center pointer-events-none opacity-50"
      class:hidden={isCompleting || isExecutiveOrder}
    >
      <span
        class="text-neutral-600 text-lg font-light select-none animate-pulse"
        >»</span
      >
    </div>

    <!-- KILLED stamp overlay -->
    {#if showKilledStamp}
      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          class="text-green-500 text-2xl font-bold tracking-widest uppercase transform -rotate-12 border-4 border-green-500 px-6 py-2 bg-black/50"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          KILLED
        </div>
      </div>
    {/if}
  </div>
</div>
