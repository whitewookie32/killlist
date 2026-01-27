<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import TriggerIndicator from "$lib/components/TriggerIndicator.svelte";
  import MissionReportModal from "$lib/components/MissionReportModal.svelte";
  import SplashScreen from "$lib/components/SplashScreen.svelte";
  import MorningReport from "$lib/components/MorningReport.svelte";
  import SecureUplink from "$lib/components/SecureUplink.svelte";
  import SettingsModal from "$lib/components/SettingsModal.svelte";
  import {
    initializeStores,
    todayActiveContracts,
    killContractOptimistic,
    runBurnProtocolOnStart,
    morningReportOpen,
    morningReportBurned,
    startDeadlineMonitoring,
    stopDeadlineMonitoring,
  } from "$lib/stores/contracts";
  import { secureUplinkOpen, settingsOpen } from "$lib/stores/ui";
  import { playChargeUp, playExecuteSound, unlockAudio } from "$lib/audio";
  import { requestPermission, scheduleDailyBriefing } from "$lib/notifications";
  import {
    initAnalytics,
    trackContractKilled,
    trackContractsBurned,
  } from "$lib/analytics";
  import Manifesto from "$lib/components/Manifesto.svelte";
  import { trainingStore } from "$lib/stores/training";

  let { children } = $props();

  // Notification Permission State
  // Notification Permission State
  let showNotificationPrompt = $state(false);
  let showManifesto = $state(false);

  // Splash screen state
  let showSplash = $state(true);
  let splashVisible = $state(true);
  let appReady = $state(false);

  // Spacebar trigger state
  let isCharging = $state(false);
  let chargeProgress = $state(0);
  let chargeStartTime = 0;
  let chargeAnimationFrame: number | null = null;

  const CHARGE_DURATION = 800; // ms to fully charge
  const SPLASH_MIN_DURATION = 1500; // Minimum splash display time (1.5s)

  // Initialize stores and run burn protocol on mount
  onMount(() => {
    const splashStart = Date.now();

    // Keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger on spacebar, not when typing in inputs
      if (e.code !== "Space") return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (isCharging) return;

      e.preventDefault();
      startCharge();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      if (!isCharging) return;

      e.preventDefault();
      releaseCharge();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Async initialization
    (async () => {
      // Initialize analytics (privacy-first)
      await initAnalytics();

      // Initialize app
      await initializeStores();
      const burnedCount = await runBurnProtocolOnStart();

      // Track burned contracts if any
      if (burnedCount && burnedCount > 0) {
        trackContractsBurned(burnedCount);
      }

      // Start real-time deadline monitoring (checks every 30s)
      startDeadlineMonitoring();

      // Ensure splash shows for minimum duration
      const elapsed = Date.now() - splashStart;
      const remainingTime = Math.max(0, SPLASH_MIN_DURATION - elapsed);

      setTimeout(() => {
        // Start fade out
        splashVisible = false;
      }, remainingTime);
    })();

    // Check Notification Permission
    if ("Notification" in window) {
      const oathSigned = localStorage.getItem("oath_signed") === "true";
      if (
        (Notification.permission === "default" ||
          Notification.permission === "denied") &&
        oathSigned
      ) {
        showNotificationPrompt = true;
      } else if (Notification.permission === "granted") {
        scheduleDailyBriefing();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      stopDeadlineMonitoring();
      if (chargeAnimationFrame) {
        cancelAnimationFrame(chargeAnimationFrame);
      }
    };
  });

  function startCharge() {
    isCharging = true;
    chargeStartTime = Date.now();
    unlockAudio();
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
        playExecuteSound();
        killContractOptimistic(topContract.id);

        // Track the kill via spacebar
        const acceptedAt = topContract.acceptedAt
          ? new Date(topContract.acceptedAt).getTime()
          : null;
        const timeToKill = acceptedAt ? Date.now() - acceptedAt : undefined;

        // Calculate total lifespan (Creation -> Kill)
        const createdAt = new Date(topContract.createdAt).getTime();
        const lifespanMinutes = (Date.now() - createdAt) / 60000;

        trackContractKilled({
          method: "spacebar",
          time_to_kill_ms: timeToKill,
          lifespan_minutes: lifespanMinutes,
          is_executive_order: topContract.priority === "highTable",
        });
      }
    }

    isCharging = false;
    chargeProgress = 0;
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#DC2626" />
</svelte:head>

<!-- Splash Screen (Gatekeeper) -->
{#if showSplash}
  <SplashScreen
    visible={splashVisible}
    onFadeComplete={() => {
      showSplash = false;
      appReady = true;
    }}
  />
{/if}

<!-- Mission Report Modal (Burn Protocol) -->
{#if $morningReportOpen}
  <MissionReportModal
    burnedContracts={$morningReportBurned}
    onClose={() => morningReportOpen.set(false)}
  />
{/if}

<!-- Morning Report (Daily Performance) -->
<MorningReport />

<!-- Spacebar Trigger Indicator -->
<TriggerIndicator
  isVisible={isCharging}
  {chargeProgress}
  onKill={() => {
    const topContract = $todayActiveContracts[0];
    if (topContract) {
      killContractOptimistic(topContract.id);
    }
  }}
/>

<!-- Secure Comms Prompt -->
{#if showNotificationPrompt || $trainingStore.phase === "secureComms"}
  <div class="fixed bottom-36 right-4 z-[110]">
    {#if $trainingStore.phase === "secureComms"}
      <!-- Tooltip / Bubble -->
      <div
        class="absolute bottom-full right-0 mb-4 w-60 bg-neutral-800 text-neutral-300 text-xs p-4 border border-kl-gold/30 shadow-2xl rounded-sm"
        style="font-family: 'JetBrains Mono', monospace;"
      >
        <p class="mb-2 text-kl-gold font-bold tracking-widest">
          TACTICAL ALERTS
        </p>
        <p>
          Enable secure comms to receive mission activation signals in
          real-time.
        </p>
        <div
          class="absolute -bottom-2 right-6 w-4 h-4 bg-neutral-800 border-b border-r border-kl-gold/30 transform rotate-45"
        ></div>
      </div>
    {/if}

    <button
      class="bg-neutral-900 border border-kl-gold/30 text-kl-gold text-[10px] uppercase tracking-widest px-3 py-2 hover:bg-kl-gold/10 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.1)] relative"
      class:animate-pulse={$trainingStore.phase === "secureComms"}
      class:z-[110]={$trainingStore.phase === "secureComms"}
      style="font-family: 'JetBrains Mono', monospace;"
      onclick={async () => {
        if ($trainingStore.phase === "secureComms") {
          try {
            await requestPermission();
          } catch (e) {
            console.error(e);
          }
          // Hide variable to prevent "duplicate" button appearance
          showNotificationPrompt = false;
          trainingStore.advanceToAcquisition();
          return;
        }

        // Normal flow
        const granted = await requestPermission();
        showNotificationPrompt = false;
      }}
    >
      [ ENABLE SECURE COMMS ]
    </button>
  </div>
{/if}

<!-- Training Overlay (Dim Background) -->
{#if $trainingStore.phase === "secureComms"}
  <div
    class="fixed inset-0 bg-neutral-950/80 z-[100] transition-opacity duration-500 backdrop-blur-[2px]"
  ></div>
{/if}

<!-- Manifesto Overlay -->
{#if showManifesto}
  <Manifesto onClose={() => (showManifesto = false)} />
{/if}

<!-- Settings Modal -->
<SettingsModal
  bind:isOpen={$settingsOpen}
  onOpenUplink={() => ($secureUplinkOpen = true)}
/>

<!-- Secure Uplink Terminal -->
<SecureUplink bind:isOpen={$secureUplinkOpen} />

<!-- Global Settings Trigger (Gear Icon) removed from layout - moving to relevant headers if needed, or kept as a global but user wants list clean -->
<!-- I will keep it but remove the registry footer triggers specifically -->

{@render children()}
