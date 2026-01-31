export function requestPermission(): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return Promise.resolve(false);
    }

    return Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            scheduleDailyBriefing();
            return true;
        }
        return false;
    });
}

export function sendNotification(title: string, body: string): void {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    if (Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon: '/icons/android-chrome-192x192.png', // Assuming icon path
            tag: 'killlist-secure-comms' // Prevent stacking
        });
    }
}

let notificationTimeout: ReturnType<typeof setTimeout> | null = null;

export function scheduleDailyBriefing(): void {
    if (typeof window === 'undefined') return;

    // Clear existing to avoid duplicates
    if (notificationTimeout) {
        clearTimeout(notificationTimeout);
    }

    const checkSchedule = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Morning Briefing: 08:00
        if (currentHour === 8 && currentMinute === 0) {
            sendNotification('SECURE COMMS', 'The Chamber is empty. Targets required.');
        }

        // Evening Warning: 22:00
        if (currentHour === 22 && currentMinute === 0) {
            sendNotification('SECURE COMMS', 'Burn Protocol imminent. Check status.');
        }

        // Check every minute
        // Calculate time to next minute for precision
        const seconds = now.getSeconds();
        const msUntilNextMinute = (60 - seconds) * 1000;

        notificationTimeout = setTimeout(checkSchedule, msUntilNextMinute);
    };

    // Start the loop
    checkSchedule();
}
