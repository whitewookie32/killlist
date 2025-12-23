<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import TriggerIndicator from '$lib/components/TriggerIndicator.svelte';
  import MissionReportModal from '$lib/components/MissionReportModal.svelte';
  import {
    initializeStores,
    todayActiveContracts,
    killContractOptimistic,
    runBurnProtocolOnStart,
    morningReportOpen,
    morningReportBurned,
    startDeadlineMonitoring,
    stopDeadlineMonitoring
  } from '$lib/stores/contracts';
  import { playChargeUp, playKillConfirm } from '$lib/audio';

  let { children } = $props();

  // Spacebar trigger state
  let isCharging = $state(false);
  let chargeProgress = $state(0);
  let chargeStartTime = 0;
  let chargeAnimationFrame: number | null = null;

  const CHARGE_DURATION = 800; // ms to fully charge

  // Initialize stores and run burn protocol on mount
  onMount(async () => {
    await initializeStores();
    await runBurnProtocolOnStart();
    
    // Start real-time deadline monitoring (checks every 30s)
    startDeadlineMonitoring();

    // Keyboard event listeners for spacebar trigger
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger on spacebar, not when typing in inputs
      if (e.code !== 'Space') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (isCharging) return;

      e.preventDefault();
      startCharge();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code !== 'Space') return;
      if (!isCharging) return;

      e.preventDefault();
      releaseCharge();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      stopDeadlineMonitoring();
      if (chargeAnimationFrame) {
        cancelAnimationFrame(chargeAnimationFrame);
      }
    };
  });

  function startCharge() {
    isCharging = true;
    chargeStartTime = Date.now();
    playChargeUp();
    animateCharge();
  }

  function animateCharge() {
    if (!isCharging) return;

    const elapsed = Date.now() - chargeStartTime;
    chargeProgress = Math.min(1, elapsed / CHARGE_DURATION);

    if (chargeProgress < 1) {
      chargeAnimationFrame = requestAnimationFrame(animateCharge);
    }
  }

  function releaseCharge() {
    if (chargeAnimationFrame) {
      cancelAnimationFrame(chargeAnimationFrame);
      chargeAnimationFrame = null;
    }

    // If fully charged, execute kill on top contract
    if (chargeProgress >= 1) {
      const topContract = $todayActiveContracts[0];
      if (topContract) {
        playKillConfirm();
        killContractOptimistic(topContract.id);
      }
    }

    isCharging = false;
    chargeProgress = 0;
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#DC2626" />
</svelte:head>

<!-- Mission Report Modal (Burn Protocol) -->
{#if $morningReportOpen}
  <MissionReportModal
    burnedContracts={$morningReportBurned}
    onClose={() => morningReportOpen.set(false)}
  />
{/if}

<!-- Spacebar Trigger Indicator -->
<TriggerIndicator
  isVisible={isCharging}
  chargeProgress={chargeProgress}
  onKill={() => {
    const topContract = $todayActiveContracts[0];
    if (topContract) {
      killContractOptimistic(topContract.id);
    }
  }}
/>

{@render children()}
