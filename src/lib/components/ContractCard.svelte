<script lang="ts">
  import type { Contract } from '$lib/db';
  import { playExecute, playCoin } from '$lib/audio';

  // Props
  interface Props {
    contract: Contract;
    onComplete: (id: string) => void;
  }

  let { contract, onComplete }: Props = $props();

  // State
  let offsetX = $state(0);
  let isCompleting = $state(false);
  let showCoin = $state(false);
  let isDragging = $state(false);

  // Touch tracking refs
  let startX = 0;
  let startTime = 0;

  const SWIPE_THRESHOLD = 120; // px to trigger completion
  const VELOCITY_THRESHOLD = 0.5; // px/ms

  // Derived
  const isHighTable = $derived(contract.priority === 'highTable');
  const terminusDisplay = $derived(contract.terminusTime || '23:59');

  // Touch handlers
  function handleTouchStart(e: TouchEvent) {
    if (isCompleting) return;

    isDragging = true;
    startX = e.touches[0].clientX;
    startTime = Date.now();
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isDragging || isCompleting) return;

    const deltaX = e.touches[0].clientX - startX;
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
      triggerCompletion();
    } else {
      // Spring back
      offsetX = 0;
    }
  }

  function triggerCompletion() {
    isCompleting = true;
    playExecute();

    // Show slash animation briefly
    setTimeout(() => {
      showCoin = true;
      playCoin();

      // Trigger completion after coin animation
      setTimeout(() => {
        onComplete(contract.id);
      }, 600);
    }, 200);
  }

  // Compute lethal intent opacity (red overlay when swiping past 50%)
  const lethalOpacity = $derived(Math.min(1, Math.max(0, (offsetX - SWIPE_THRESHOLD * 0.5) / (SWIPE_THRESHOLD * 0.5))));
</script>

<div class="relative overflow-hidden" style="touch-action: pan-y;">
  <!-- Swipe reveal background -->
  <div
    class="absolute inset-0 flex items-center pl-4 transition-colors duration-200"
    style="background: linear-gradient(to right, rgba(212, 175, 55, {0.2 * (1 - lethalOpacity)}), rgba(212, 175, 55, {0.05 * (1 - lethalOpacity)})), linear-gradient(to right, rgba(220, 38, 38, {0.4 * lethalOpacity}), rgba(220, 38, 38, {0.2 * lethalOpacity}));"
  >
    <svg viewBox="0 0 24 24" class="w-6 h-6" style="color: {lethalOpacity > 0.5 ? '#DC2626' : '#D4AF37'};" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  </div>

  <!-- Card - GPU Accelerated -->
  <div
    class="relative bg-kl-gunmetal border transition-[border-color,box-shadow,opacity] duration-200 cursor-grab active:cursor-grabbing gpu-accelerated {isHighTable ? 'border-kl-crimson' : 'border-kl-gold/20 hover:border-kl-gold/40'} {isCompleting ? 'opacity-50' : ''}"
    style="transform: translate3d({offsetX}px, 0, 0); will-change: transform; {isDragging ? '' : 'transition: transform 0.3s ease-out;'} {isHighTable ? 'box-shadow: 0 0 10px rgba(153, 0, 0, 0.2);' : ''}"
    ontouchstart={handleTouchStart}
    ontouchmove={handleTouchMove}
    ontouchend={handleTouchEnd}
    ontouchcancel={() => { isDragging = false; offsetX = 0; }}
  >
    <div class="p-4 flex items-center gap-4">
      <!-- Status icon -->
      <div
        class="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border {isHighTable ? 'bg-kl-crimson/20 border-kl-crimson' : 'bg-kl-gold/10 border-kl-gold/30'}"
      >
        <!-- Coin icon -->
        <svg
          viewBox="0 0 24 24"
          class="w-5 h-5 {isHighTable ? 'text-kl-crimson' : 'text-kl-gold'}"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M12 6v12M6 12h12" stroke-width="1.5" stroke="currentColor" />
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="relative">
          <h3
            class="text-base font-medium truncate {isHighTable ? 'text-kl-crimson' : 'text-white'}"
            class:line-through={isCompleting}
            class:opacity-50={isCompleting}
            style="font-family: 'JetBrains Mono', monospace;"
          >
            {contract.title}
          </h3>

          <!-- Slash animation overlay -->
          {#if isCompleting && !showCoin}
            <div class="absolute top-1/2 left-0 h-0.5 bg-kl-gold animate-slash"></div>
          {/if}
        </div>

        <!-- Terminus Time -->
        <p
          class="text-sm mt-1 {isHighTable ? 'text-kl-crimson/70' : 'text-kl-gold-dim'}"
          style="font-family: 'JetBrains Mono', monospace;"
        >
          TERMINUS: {terminusDisplay}
        </p>
      </div>

      <!-- Priority badge -->
      {#if isHighTable}
        <div
          class="px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-kl-crimson/10"
          style="color: var(--color-kl-crimson); font-family: 'JetBrains Mono', monospace;"
        >
          High Table
        </div>
      {/if}
    </div>
  </div>

  <!-- Flying coin animation -->
  {#if showCoin}
    <div
      class="absolute left-1/2 top-1/2 w-10 h-10 rounded-full flex items-center justify-center animate-coin-fly pointer-events-none z-50"
      style="background: linear-gradient(to bottom right, var(--color-kl-gold), var(--color-kl-gold-dim));"
    >
      <svg viewBox="0 0 24 24" class="w-6 h-6 text-kl-black" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.5" />
        <path d="M12 6v12M6 12h12" stroke-width="1.5" stroke="currentColor" />
      </svg>
    </div>
  {/if}
</div>
