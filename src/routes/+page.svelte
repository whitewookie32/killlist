<script lang="ts">
  import OathScreen from '$lib/components/OathScreen.svelte';
  import ContractCard from '$lib/components/ContractCard.svelte';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import {
    todayActiveContracts,
    vaultCount,
    settings,
    isLoading,
    addContract,
    killContractOptimistic,
    completeOnboardingOptimistic,
    openCount,
    registryCount
  } from '$lib/stores/contracts';

  // UI State
  let showOath = $state(true);
  let showCreateForm = $state(false);
  let newContractTitle = $state('');
  let newContractTime = $state('23:59');
  let isHighTable = $state(false);

  // Check if onboarding is complete
  $effect(() => {
    if ($settings.onboardingComplete) {
      showOath = false;
    }
  });

  function handleOathComplete() {
    completeOnboardingOptimistic();
    showOath = false;
  }

  function handleContractKill(id: string) {
    killContractOptimistic(id);
  }

  function handleCreateContract(e: Event) {
    e.preventDefault();
    if (!newContractTitle.trim()) return;

    // Creates in Registry - user must accept to start timer
    addContract(
      newContractTitle.trim(),
      newContractTime || '23:59',
      isHighTable ? 'highTable' : 'normal'
    );

    // Reset form
    newContractTitle = '';
    newContractTime = '23:59';
    isHighTable = false;
    showCreateForm = false;
  }

  function openCreateForm() {
    showCreateForm = true;
    newContractTime = '23:59';
  }
</script>

<svelte:head>
  <title>KILL LIST</title>
</svelte:head>

<!-- Oath Screen Overlay -->
{#if showOath && !$isLoading}
  <OathScreen onComplete={handleOathComplete} />
{/if}

<!-- Main App -->
<div class="min-h-screen bg-kl-black flex flex-col pb-20" style="font-family: 'JetBrains Mono', monospace;">
  <!-- Header -->
  <header class="flex items-center justify-between px-6 py-5 border-b border-kl-gold/10">
    <h1 class="text-xl tracking-widest text-kl-gold">
      KILL LIST
    </h1>

    <div class="flex items-center gap-3">
      <!-- Add button -->
      <button
        type="button"
        class="w-10 h-10 rounded-full border border-kl-gold/40 flex items-center justify-center text-kl-gold hover:border-kl-gold transition-colors"
        onclick={openCreateForm}
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <!-- Vault counter -->
      <span class="text-kl-gold text-lg">
        {$vaultCount}
      </span>
    </div>
  </header>

  <!-- Section Header - Today's Contracts -->
  <div class="flex items-center justify-between px-6 py-4">
    <span class="text-sm tracking-widest text-kl-gold/70">
      TODAY'S CONTRACTS
    </span>
    <span class="text-sm tracking-wider text-kl-gold">
      {$openCount} OPEN
    </span>
  </div>

  <!-- Content -->
  <main class="flex-1 px-6">
    {#if $isLoading}
      <!-- Loading skeleton -->
      <div class="space-y-3 mt-8">
        {#each [1, 2, 3] as _}
          <div class="h-16 bg-kl-gunmetal/50 animate-pulse"></div>
        {/each}
      </div>
    {:else if $todayActiveContracts.length === 0}
      <!-- Empty state -->
      <div class="flex flex-col items-center justify-center pt-16">
        <p class="text-kl-gold/40 text-sm tracking-widest text-center mb-4">
          NO ACTIVE CONTRACTS
        </p>
        {#if $registryCount > 0}
          <a
            href="/registry"
            class="text-kl-gold/60 text-xs tracking-wider border border-kl-gold/20 px-4 py-2 hover:border-kl-gold/40 transition-colors"
          >
            {$registryCount} PENDING IN REGISTRY →
          </a>
        {:else}
          <p class="text-kl-gold/30 text-xs tracking-wider text-center">
            Add contracts to the Registry
          </p>
        {/if}
      </div>
    {:else}
      <!-- Contract list -->
      <div class="space-y-3">
        {#each $todayActiveContracts as contract (contract.id)}
          <ContractCard {contract} onComplete={handleContractKill} />
        {/each}
      </div>
    {/if}
  </main>

  <!-- FAB: Create Contract (adds to Registry) -->
  <button
    type="button"
    class="fixed bottom-20 right-6 w-14 h-14 bg-kl-gold text-kl-black flex items-center justify-center z-40 active:scale-95 transition-transform"
    onclick={openCreateForm}
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
  </button>

  <!-- Create Contract Modal -->
  {#if showCreateForm}
    <div class="fixed inset-0 bg-black/90 z-50 flex items-end">
      <div class="w-full bg-kl-gunmetal max-h-[90vh] overflow-y-auto pb-20">
        <div class="p-6">
          <!-- Top indicator -->
          <div class="flex justify-center mb-4">
            <div class="w-12 h-1 bg-kl-gold/60 rounded-full"></div>
          </div>

          <form onsubmit={handleCreateContract}>
            <h3 class="text-xl tracking-widest text-kl-gold mb-2">
              NEW DOSSIER
            </h3>
            
            <p class="text-xs text-kl-gold/50 mb-6">
              Added to Registry • Accept to start 24h timer
            </p>

            <div class="space-y-5">
              <!-- Target Name -->
              <div>
                <label class="block text-xs text-kl-gold/50 mb-2 tracking-widest">
                  TARGET NAME
                </label>
                <input
                  type="text"
                  bind:value={newContractTitle}
                  placeholder="Enter Target Name..."
                  class="w-full bg-kl-black border border-kl-gold/20 p-4 text-white placeholder:text-kl-gold/30 focus:border-kl-gold focus:outline-none"
                  autofocus
                />
              </div>

              <!-- Terminus Time -->
              <div>
                <label class="block text-xs text-kl-gold/50 mb-2 tracking-widest">
                  TERMINUS TIME (when accepted)
                </label>
                <input
                  type="time"
                  bind:value={newContractTime}
                  class="w-full bg-kl-black border border-kl-gold/20 p-4 text-white focus:border-kl-gold focus:outline-none"
                  style="color-scheme: dark;"
                />
              </div>

              <!-- High Table Order Toggle -->
              <div class="flex items-center justify-between p-4 border transition-colors {isHighTable ? 'bg-kl-crimson/20 border-kl-crimson' : 'bg-kl-black border-kl-gold/20'}">
                <span class="text-sm tracking-widest transition-colors {isHighTable ? 'text-kl-crimson' : 'text-kl-gold/70'}">
                  HIGH TABLE ORDER
                </span>
                <button
                  type="button"
                  class="w-12 h-6 rounded-full transition-colors relative {isHighTable ? 'bg-kl-crimson' : 'bg-kl-gold/20'}"
                  onclick={() => (isHighTable = !isHighTable)}
                >
                  <div
                    class="absolute top-1 w-4 h-4 rounded-full bg-white transition-all {isHighTable ? 'left-7' : 'left-1'}"
                  ></div>
                </button>
              </div>
            </div>

            <div class="flex gap-3 mt-6">
              <button
                type="button"
                class="flex-1 py-4 border border-kl-gold/30 text-kl-gold/70 text-sm tracking-widest"
                onclick={() => (showCreateForm = false)}
              >
                [ABORT]
              </button>
              <button
                type="submit"
                class="flex-1 py-4 bg-kl-gold text-kl-black text-sm tracking-widest font-semibold"
              >
                FILE DOSSIER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  {/if}
</div>

<!-- Bottom Navigation -->
<BottomNav />

<!-- Desktop hint -->
<div class="fixed bottom-20 left-4 hidden md:flex items-center gap-2 text-kl-gold/30 text-xs" style="font-family: 'JetBrains Mono', monospace;">
  <kbd class="px-2 py-1 border border-kl-gold/20 text-kl-gold/50">SPACE</kbd>
  <span>Hold to execute top contract</span>
</div>
