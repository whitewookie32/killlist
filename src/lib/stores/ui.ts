import { writable } from 'svelte/store';

export const secureUplinkOpen = writable(false);
export const settingsOpen = writable(false);

export function openUplink() {
    secureUplinkOpen.set(true);
}

export function closeUplink() {
    secureUplinkOpen.set(false);
}

export function openSettings() {
    settingsOpen.set(true);
}

export function closeSettings() {
    settingsOpen.set(false);
}
