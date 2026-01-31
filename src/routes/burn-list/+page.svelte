<script lang="ts">
  import {
    burnedContracts,
    isLoading,
    restoreBurnedContract,
  } from "$lib/stores/contracts";
  import BottomNav from "$lib/components/BottomNav.svelte";

  function formatDate(dateStr: string | undefined): string {
    if (!dateStr) return "UNSPECIFIED";
    const [year, month, day] = dateStr.split("-").map(Number);
    const safeDate = new Date(year, month - 1, day);
    return safeDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
</script>

<svelte:head>
  <title>BURN LIST | KILL LIST</title>
</svelte:head>

<div
  class="min-h-screen bg-kl-black flex flex-col pb-20"
  style="font-family: 'JetBrains Mono', monospace;"
>
  <header
    class="flex items-center justify-between px-6 py-5 border-b border-kl-gold/10"
  >
    <h1 class="text-xl tracking-widest text-kl-crimson">BURN LIST</h1>
    <span class="text-xs tracking-widest text-kl-crimson/70 uppercase">
      Overdue
    </span>
  </header>

  <main class="flex-1 px-6">
    {#if $isLoading}
      <div class="space-y-3 mt-8">
        {#each [1, 2, 3] as _}
          <div class="h-16 bg-kl-gunmetal/50 animate-pulse"></div>
        {/each}
      </div>
    {:else if $burnedContracts.length === 0}
      <div class="flex flex-col items-center justify-center pt-20">
        <div class="text-neutral-700 text-6xl mb-6">â—</div>
        <p class="text-kl-crimson text-sm tracking-widest text-center mb-2 uppercase">
          No Burned Contracts
        </p>
        <p class="text-neutral-600 text-xs tracking-wider text-center mb-8 max-w-xs">
          Overdue contracts will appear here.
        </p>
        <a
          href="/"
          class="px-6 py-3 bg-kl-crimson/10 border border-kl-crimson/40 text-kl-crimson text-sm tracking-widest hover:bg-kl-crimson/20 transition-colors uppercase"
        >
          View Active Contracts
        </a>
      </div>
    {:else}
      <div class="space-y-2 mt-6">
        {#each $burnedContracts as contract (contract.id)}
          {@const deadlineLabel = `${formatDate(contract.targetDate)} ${contract.terminusTime || "23:59"}`}
          <div
            class="flex items-center gap-4 p-3 bg-kl-black/50 border border-kl-crimson/20 hover:border-kl-crimson/40 transition-colors"
          >
            <div class="flex-shrink-0">
              <div class="w-3 h-3 rounded-full bg-kl-crimson"></div>
            </div>
            <div class="flex-1 min-w-0">
              <span
                class="text-sm text-kl-crimson/80 line-through"
                style="text-decoration-thickness: 1px;"
              >
                {contract.title}
              </span>
            </div>
            <div class="text-[10px] text-kl-crimson/60 whitespace-nowrap">
              {deadlineLabel}
            </div>
            <button
              type="button"
              class="text-[9px] uppercase tracking-widest border border-kl-gold/30 text-kl-gold/80 px-2 py-1 hover:bg-kl-gold/10 hover:border-kl-gold/60 transition-colors"
              onclick={() => restoreBurnedContract(contract.id)}
            >
              Restore
            </button>
            <div
              class="flex-shrink-0 px-2 py-0.5 border border-kl-crimson/30 text-[9px] tracking-wider text-kl-crimson/70 uppercase"
            >
              BURNED
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </main>
</div>

<BottomNav />
