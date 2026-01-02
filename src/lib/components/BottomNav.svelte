<script lang="ts">
  import { page } from "$app/stores";
  import { registryCount, openCount, settings } from "$lib/stores/contracts";
  import { trainingStore } from "$lib/stores/training";
  import { browser } from "$app/environment";

  // Determine active route
  const currentPath = $derived($page.url.pathname);

  type NavItem = {
    path: string;
    label: string;
    icon: "registry" | "active" | "morgue";
  };

  const navItems = $derived.by(() => {
    const allItems: NavItem[] = [
      { path: "/registry", label: "REGISTRY", icon: "registry" },
      { path: "/", label: "ACTIVE", icon: "active" },
      { path: "/morgue", label: "MORGUE", icon: "morgue" },
    ];

    if (!$settings.onboardingComplete) {
      // Dynamic training navigation
      if (
        $trainingStore.phase === "acquisition" ||
        $trainingStore.phase === "activation" ||
        $trainingStore.phase === "secureComms"
      ) {
        return allItems.filter((i) => i.icon === "registry");
      }
      if (
        $trainingStore.phase === "executionExpand" ||
        $trainingStore.phase === "execution"
      ) {
        return allItems.filter((i) => i.icon === "active");
      }
      if ($trainingStore.phase === "debrief") {
        return allItems.filter((i) => i.icon === "morgue");
      }
      // Fallback
      return allItems.filter((i) => i.icon === "active");
    }

    return allItems;
  });

  function isActive(path: string): boolean {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  }
</script>

<nav
  class="fixed bottom-0 left-0 right-0 z-50 bg-kl-black border-t border-kl-gold/20"
  style="font-family: 'JetBrains Mono', monospace;"
>
  <div class="flex items-stretch justify-around h-16">
    {#each navItems as item (item.path)}
      {@const active = isActive(item.path)}
      <a
        href={item.path}
        class="flex-1 flex flex-col items-center justify-center gap-1 transition-colors relative
          {active ? 'text-kl-gold' : 'text-kl-gold/40 hover:text-kl-gold/70'}"
      >
        <!-- Icon -->
        <div class="relative">
          {#if item.icon === "registry"}
            <!-- Folder/Dossier icon -->
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
            <!-- Badge for registry count -->
            {#if $registryCount > 0}
              <span
                class="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-kl-gold/20 border border-kl-gold/40 text-[9px] text-kl-gold flex items-center justify-center rounded-full"
              >
                {$registryCount}
              </span>
            {/if}
          {:else if item.icon === "active"}
            <!-- Crosshair/Target icon -->
            <svg
              class="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
            <!-- Badge for active count -->
            {#if $openCount > 0}
              <span
                class="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-kl-crimson/80 text-[9px] text-white flex items-center justify-center rounded-full"
              >
                {$openCount}
              </span>
            {/if}
          {:else if item.icon === "morgue"}
            <!-- Skull icon -->
            <svg class="w-6 h-6" viewBox="0 0 318 412" fill="currentColor">
              <path
                d="M 171.00 318.50 L 164.00 318.50 L 162.50 317.00 L 161.50 300.00 L 160.00 298.50 L 158.50 301.00 L 158.50 317.00 L 157.00 318.50 L 144.50 316.00 L 143.00 300.50 L 141.00 316.50 L 130.50 314.00 L 129.00 298.50 L 127.00 314.50 L 119.50 311.00 L 117.00 295.50 L 115.00 310.50 L 109.50 308.00 L 108.00 293.50 L 105.50 297.00 L 105.50 307.00 L 103.00 306.50 L 101.50 305.00 L 101.50 290.00 L 99.50 281.00 L 92.50 266.00 L 80.00 255.50 L 65.00 253.50 L 53.00 247.50 L 48.50 242.00 L 45.50 234.00 L 46.50 221.00 L 56.50 202.00 L 55.50 180.00 L 45.50 157.00 L 41.50 141.00 L 41.50 123.00 L 48.50 97.00 L 61.50 73.00 L 82.00 51.50 L 104.00 38.50 L 130.00 31.50 L 192.00 31.50 L 210.00 35.50 L 231.00 44.50 L 244.00 53.50 L 262.50 74.00 L 271.50 92.00 L 278.50 116.00 L 278.50 147.00 L 264.50 185.00 L 265.50 206.00 L 275.50 225.00 L 275.50 234.00 L 272.50 242.00 L 265.00 249.50 L 256.00 253.50 L 241.00 255.50 L 235.00 258.50 L 227.50 266.00 L 220.50 282.00 L 219.50 304.00 L 218.00 305.50 L 215.50 305.00 L 215.50 295.00 L 214.00 294.50 L 212.50 308.00 L 207.00 310.50 L 205.50 309.00 L 206.50 300.00 L 204.00 296.50 L 202.50 311.00 L 195.00 313.50 L 194.50 302.00 L 192.00 298.50 L 190.50 314.00 L 181.00 317.50 L 179.50 316.00 L 179.50 302.00 L 178.00 300.50 L 176.50 316.00 L 171.00 318.50 Z M 110.00 240.50 L 100.00 240.50 L 87.00 236.50 L 77.50 229.00 L 73.50 222.00 L 71.50 213.00 L 73.50 197.00 L 79.50 186.00 L 87.00 180.50 L 96.00 178.50 L 106.00 178.50 L 107.00 179.50 L 117.00 179.50 L 126.00 181.50 L 135.00 185.50 L 142.50 193.00 L 144.50 197.00 L 145.50 202.00 L 144.50 214.00 L 136.50 229.00 L 128.00 235.50 L 110.00 240.50 Z M 221.00 240.50 L 211.00 240.50 L 198.00 237.50 L 188.00 232.50 L 181.50 225.00 L 176.50 214.00 L 175.50 202.00 L 178.50 193.00 L 186.00 185.50 L 192.00 182.50 L 204.00 179.50 L 225.00 178.50 L 236.00 181.50 L 241.50 186.00 L 245.50 192.00 L 249.50 207.00 L 248.50 219.00 L 245.50 226.00 L 240.00 232.50 L 234.00 236.50 L 221.00 240.50 Z M 176.00 280.50 L 170.00 280.50 L 161.00 274.50 L 151.00 280.50 L 145.00 280.50 L 142.00 279.50 L 138.50 275.00 L 139.50 263.00 L 150.50 240.00 L 155.00 234.50 L 165.00 234.50 L 168.50 237.00 L 181.50 263.00 L 182.50 275.00 L 179.00 279.50 L 176.00 280.50 Z"
                fill-rule="evenodd"
              />
            </svg>
          {/if}
        </div>

        <!-- Label -->
        <span class="text-[9px] tracking-widest">{item.label}</span>

        <!-- Active indicator -->
        {#if active}
          <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-kl-gold"
          ></div>
        {/if}
      </a>
    {/each}
  </div>
</nav>
