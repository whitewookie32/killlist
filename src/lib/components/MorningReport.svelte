<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { browser } from "$app/environment";
    import { getKilledContracts, getClientTodayISODate } from "$lib/db";
    import { playLoad } from "$lib/audio";

    // Props
    // None needed, it manages its own state

    // State
    let visible = $state(false);
    let logText = $state("");
    let showButton = $state(false);

    // Stats
    let killCount = 0;
    let rating = "";
    let dateString = "";

    const TYPE_SPEED = 30; // ms per char

    onMount(async () => {
        if (!browser) return;

        const today = getClientTodayISODate();
        const lastReportDate = localStorage.getItem("last_report_date");

        // If report already shown today, skip
        if (lastReportDate === today) {
            return;
        }

        // Determine "Yesterday"
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);

        // Normalize yesterday to start/end of day checks
        const yesterdayStart = new Date(
            yesterday.setHours(0, 0, 0, 0),
        ).getTime();
        const yesterdayEnd = new Date(
            yesterday.setHours(23, 59, 59, 999),
        ).getTime();

        // Fetch stats
        const allKilled = await getKilledContracts();

        const yesterdayKills = allKilled.filter((c) => {
            if (!c.killedAt) return false;
            const kTime = new Date(c.killedAt).getTime();
            return kTime >= yesterdayStart && kTime <= yesterdayEnd;
        });

        killCount = yesterdayKills.length;

        // Rating Logic
        if (killCount === 0) rating = "DORMANT";
        else if (killCount < 3) rating = "ADEQUATE";
        else rating = "LETHAL";

        dateString = now
            .toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\//g, "-"); // YYYY-MM-DD format preference or standard locale? Prompt uses [CURRENT DATE]

        // Construct the message
        const lines = [
            `SYSTEM: ONLINE...`,
            `DATE: ${dateString}`,
            `PREVIOUS CYCLE: [${killCount}] TARGETS ELIMINATED.`,
            `PERFORMANCE: ${rating}.`,
            ``,
            `AWAITING DIRECTIVES.`,
        ];

        const fullMessage = lines.join("\n");

        // Show the modal
        visible = true;

        // Start Typewriter
        let i = 0;
        const interval = setInterval(() => {
            logText += fullMessage.charAt(i);
            i++;
            if (i >= fullMessage.length) {
                clearInterval(interval);
                showButton = true;
            }
        }, TYPE_SPEED);
    });

    function handleInitialize() {
        playLoad();
        const today = getClientTodayISODate();
        localStorage.setItem("last_report_date", today);
        visible = false;
    }
</script>

{#if visible}
    <div
        class="fixed inset-0 z-50 bg-neutral-950 flex items-center justify-center p-6"
        style="font-family: 'JetBrains Mono', monospace;"
        transition:fade={{ duration: 300 }}
    >
        <div class="max-w-2xl w-full">
            <!-- Terminal Output -->
            <div
                class="text-kl-gold text-lg md:text-xl leading-relaxed whitespace-pre-wrap min-h-[200px]"
            >
                {logText}
                <span
                    class="animate-pulse inline-block w-3 h-5 bg-kl-gold align-middle ml-1"
                ></span>
            </div>

            <!-- Action Button -->
            {#if showButton}
                <div
                    class="mt-12 flex justify-center"
                    in:fade={{ duration: 500 }}
                >
                    <button
                        class="px-8 py-4 bg-kl-gold text-neutral-950 font-bold tracking-widest hover:bg-yellow-400 transition-colors uppercase border border-transparent hover:border-kl-gold"
                        onclick={handleInitialize}
                    >
                        [ INITIALIZE ]
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
