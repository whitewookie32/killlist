<script lang="ts">
  import { addContract } from '$lib/stores/contracts';
  import { playUpload, unlockAudio } from '$lib/audio';
  import { trackDeadDropUsed } from '$lib/analytics';

  // Props
  let {
    onAdd
  }: {
    onAdd?: (title: string) => void;
  } = $props();

  // State
  let inputValue = $state('');
  let isScrambling = $state(false);
  let scrambledText = $state('');
  let flyingItem = $state<{ text: string; visible: boolean } | null>(null);

  // Scramble characters for the encryption effect
  const SCRAMBLE_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function getRandomChar(): string {
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }

  function generateScrambledText(length: number): string {
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
      result.push(getRandomChar());
    }
    return result.join('');
  }

  async function handleSubmit() {
    const title = inputValue.trim();
    if (!title || isScrambling) return;

    // Phase 1: LOCK - Freeze the input
    isScrambling = true;
    scrambledText = title; // Start with original text visible in overlay

    // Phase 2: SCRAMBLE - Rapidly change characters for 0.4s
    const scrambleDuration = 400;
    const scrambleInterval = 40; // Change every 40ms for rapid effect
    const scrambleIterations = scrambleDuration / scrambleInterval;

    for (let i = 0; i < scrambleIterations; i++) {
      scrambledText = generateScrambledText(title.length);
      await new Promise((resolve) => setTimeout(resolve, scrambleInterval));
    }

    // Phase 3: UPLOAD - Text fades out + slides up
    flyingItem = { text: title, visible: true };
    
    // Play sound immediately when upload animation starts
    unlockAudio();
    playUpload();

    // Phase 4: CLEAR - Input clears and unlocks
    inputValue = '';
    scrambledText = '';
    isScrambling = false;

    // Add to store
    addContract(title);
    onAdd?.(title);
    
    // Track analytics
    trackDeadDropUsed();

    // Wait for fly animation to complete, then hide
    await new Promise((resolve) => setTimeout(resolve, 500));
    flyingItem = null;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }
</script>

<!-- Dead Drop Input Container -->
<div class="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2" style="font-family: 'JetBrains Mono', monospace;">
  <!-- Flying Item Animation -->
  {#if flyingItem?.visible}
    <div
      class="absolute left-4 right-4 bottom-full mb-2 pointer-events-none"
    >
      <div
        class="bg-neutral-800 border border-kl-gold/40 px-4 py-3 text-kl-gold text-sm
          animate-fly-up opacity-0"
      >
        <span class="text-kl-gold/50 mr-2">+</span>
        {flyingItem.text}
      </div>
    </div>
  {/if}

  <!-- Input Field -->
  <div class="relative">
    <!-- Scramble overlay -->
    {#if isScrambling && scrambledText}
      <div
        class="absolute inset-0 bg-neutral-900 border border-kl-gold/30 px-4 py-3
          flex items-center text-kl-gold text-sm pointer-events-none z-10"
      >
        <span class="text-kl-gold/50 mr-2 animate-pulse">⟩</span>
        <span class="text-green-400 font-mono tracking-wider">{scrambledText}</span>
        <span class="animate-blink ml-1">_</span>
      </div>
    {/if}

    <!-- Actual input -->
    <div class="flex items-center bg-neutral-900 border border-neutral-700 focus-within:border-kl-gold/50 transition-colors">
      <span class="text-kl-gold/40 pl-4 text-sm">⟩</span>
      <input
        type="text"
        bind:value={inputValue}
        onkeydown={handleKeyDown}
        placeholder="Input Objective..."
        disabled={isScrambling}
        class="flex-1 bg-transparent px-3 py-3 text-white text-sm placeholder:text-neutral-600
          focus:outline-none disabled:opacity-50"
      />
      <button
        type="button"
        onclick={handleSubmit}
        disabled={!inputValue.trim() || isScrambling}
        class="px-4 py-3 text-kl-gold/50 hover:text-kl-gold transition-colors disabled:opacity-30"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
            d="M12 4v16m0-16l-4 4m4-4l4 4" />
        </svg>
      </button>
    </div>
  </div>
</div>

<style>
  @keyframes fly-up {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 1;
      transform: translateY(-50px) scale(0.95);
    }
    100% {
      opacity: 0;
      transform: translateY(-100px) scale(0.9);
    }
  }

  .animate-fly-up {
    animation: fly-up 0.5s ease-out forwards;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  .animate-blink {
    animation: blink 0.8s infinite;
  }
</style>

