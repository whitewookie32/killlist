<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { addContract } from "$lib/stores/contracts";
    import { trackContractHit } from "$lib/analytics";
    import { playLoad, playLock } from "$lib/audio";
    import { fade, fly } from "svelte/transition";

    let target = $state("");
    let deadline = $state("");
    let priority = $state("normal");
    let isNewUser = $state(false);

    onMount(() => {
        // Parse query params
        const params = $page.url.searchParams;
        target = params.get("target") || "Unidentified Target";
        deadline = params.get("deadline") || "";
        priority = params.get("priority") || "normal";

        // Check Recruits (Oath) status
        if (typeof localStorage !== "undefined") {
            isNewUser = localStorage.getItem("oath_signed") !== "true";
        }
    });

    function acceptMission() {
        // 1. Add to Store (Optimistic)
        // If priority comes in as boolean string or other format, normalize it
        const priorityLevel =
            priority === "high" || priority === "highTable"
                ? "highTable"
                : "normal";

        // Add to registry (backlog) or active?
        // "Contract Hit" implies immediate assignment, so let's put it in Registry for them to process,
        // OR if we want to be aggressive, put it in Active.
        // Let's stick to Registry to follow the "Do you accept?" flow in the main app,
        // BUT since they just accepted here, maybe we put it in Registry so they can slot it?
        // User requirement: "Animate task being added to Registry".
        const newContract = addContract(target, priorityLevel, "registry");

        // 2. Track Event
        trackContractHit(newContract.id, isNewUser);

        // 3. Audio
        playLoad();

        // 4. Redirect
        if (isNewUser) {
            // Send to Active tab (Home) where Oath is, but maybe pass a param to say "Welcome Recruit"
            goto("/?recruit=true");
        } else {
            goto("/registry");
        }
    }

    function declineMission() {
        playLock(); // Reject sound
        goto("/registry");
    }
</script>

<div
    class="min-h-screen bg-black text-neutral-200 font-mono flex items-center justify-center p-6 relative overflow-hidden"
>
    <!-- Background Ambience -->
    <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]"
    ></div>
    <div
        class="absolute inset-0 opacity-10"
        style="background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, transparent 2px); background-size: 100% 4px;"
    ></div>

    <!-- Briefing Card -->
    <div
        class="relative w-full max-w-md bg-neutral-900 border border-kl-gold p-8 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
        in:fly={{ y: 20, duration: 800 }}
    >
        <!-- Header -->
        <div class="flex flex-col items-center mb-8 space-y-2">
            <div
                class="w-16 h-16 border-2 border-kl-gold rounded-full flex items-center justify-center mb-2 animate-pulse"
            >
                <span class="text-3xl">⚠️</span>
            </div>
            <h1
                class="text-kl-gold text-xl tracking-[0.2em] font-bold text-center"
            >
                {isNewUser ? "AGENCY DIRECTIVE" : "CONTRACT INTERCEPTED"}
            </h1>
            <div class="h-px w-24 bg-kl-gold/50"></div>
        </div>

        <!-- Body -->
        <div class="space-y-6 mb-10 text-center">
            <p class="text-sm text-neutral-400 uppercase tracking-widest">
                {isNewUser
                    ? "RECRUITMENT PROTOCOL INITIATED"
                    : "INCOMING TRANSMISSION"}
            </p>

            <div class="bg-black/50 p-6 border border-neutral-800">
                <h2
                    class="text-2xl text-white font-bold mb-2 break-words leading-tight"
                >
                    {target}
                </h2>
                {#if priority === "high" || priority === "highTable"}
                    <span
                        class="inline-block px-2 py-1 bg-red-900/30 text-red-500 text-xs tracking-wider border border-red-900/50"
                        >HIGH PRIORITY</span
                    >
                {/if}
            </div>

            <p class="text-neutral-400 text-sm leading-relaxed">
                {isNewUser
                    ? "This objective has been assigned to you. Review the parameters. Execution is mandatory upon acceptance."
                    : "A new contract is available for your registry. Do you accept this mission?"}
            </p>
        </div>

        <!-- Actions -->
        <div class="grid grid-cols-2 gap-4">
            <button
                onclick={declineMission}
                class="py-4 border border-neutral-700 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300 transition-colors uppercase tracking-widest text-xs"
            >
                {isNewUser ? "IGNORE" : "DECLINE"}
            </button>

            <button
                onclick={acceptMission}
                class="py-4 bg-kl-gold text-black font-bold hover:bg-yellow-500 transition-colors uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
                {isNewUser ? "JOIN AGENCY" : "ACCEPT CONTRACT"}
            </button>
        </div>

        <!-- Decorative Corners -->
        <div
            class="absolute top-0 left-0 w-2 h-2 border-t border-l border-kl-gold"
        ></div>
        <div
            class="absolute top-0 right-0 w-2 h-2 border-t border-r border-kl-gold"
        ></div>
        <div
            class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-kl-gold"
        ></div>
        <div
            class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-kl-gold"
        ></div>
    </div>
</div>
