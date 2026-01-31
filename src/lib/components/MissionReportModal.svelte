<script lang="ts">
  import type { Contract } from '$lib/db';
  import { cleanHouse } from '$lib/stores/contracts';

  interface Props {
    burnedContracts: Contract[];
    onClose: () => void;
  }

  let { burnedContracts, onClose }: Props = $props();

  async function handleCleanHouse() {
    await cleanHouse();
    onClose();
  }
</script>

<div class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6">
  <div class="w-full max-w-md">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-kl-crimson/50 mb-4">
        <svg class="w-8 h-8 text-kl-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 class="text-2xl tracking-widest text-kl-crimson mb-2" style="font-family: 'JetBrains Mono', monospace;">
        MISSION REPORT
      </h2>
      
      <p class="text-sm text-kl-gold/50" style="font-family: 'JetBrains Mono', monospace;">
        {burnedContracts.length} contract{burnedContracts.length === 1 ? '' : 's'} burned
      </p>
    </div>

    <!-- Burned Contracts List -->
    <div class="space-y-2 mb-8 max-h-64 overflow-y-auto">
      {#each burnedContracts as contract (contract.id)}
        <div 
          class="relative p-4 border border-neutral-700/50 bg-neutral-900/50"
          style="
            background: linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(20, 20, 20, 0.6) 100%);
            border-left: 3px solid rgba(153, 0, 0, 0.5);
          "
        >
          <!-- Burn texture overlay -->
          <div 
            class="absolute inset-0 pointer-events-none opacity-20"
            style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%270 0 100 100%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 /%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27 /%3E%3C/svg%3E');"
          ></div>
          
          <div class="relative">
            <h3 
              class="text-base line-through text-neutral-500"
              style="font-family: 'JetBrains Mono', monospace; opacity: 0.6;"
            >
              {contract.title}
            </h3>
            
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-neutral-600" style="font-family: 'JetBrains Mono', monospace;">
                {contract.targetDate}
              </span>
              
              {#if contract.priority === 'highTable'}
                <span class="text-xs text-kl-crimson/50 uppercase tracking-wider" style="font-family: 'JetBrains Mono', monospace;">
                  EXECUTIVE ORDER
                </span>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Action Button -->
    <button
      type="button"
      class="w-full py-4 bg-kl-crimson/20 border border-kl-crimson text-kl-crimson text-sm tracking-widest uppercase transition-colors hover:bg-kl-crimson/30"
      style="font-family: 'JetBrains Mono', monospace;"
      onclick={handleCleanHouse}
    >
      Clean House
    </button>

    <!-- Disclaimer -->
    <p class="text-center text-xs text-neutral-600 mt-4" style="font-family: 'JetBrains Mono', monospace;">
      These contracts will be permanently deleted
    </p>
  </div>
</div>

