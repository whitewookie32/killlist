import type { Contract } from '$lib/db';

/**
 * Format date to ICS timestamp format: YYYYMMDDTHHMMSS
 */
function formatICSSTimestamp(date: Date): string {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generate and download a tactical .ics mission order
 */
export function downloadMissionICS(contract: Contract): void {
    // 1. Determine Timestamps
    const now = new Date();
    const createdAt = formatICSSTimestamp(now);

    // Construct Deadline Date
    // If targetDate + terminusTime exists, use that.
    // Otherwise default to end of today (though typically active contracts have this).
    let deadlineDate = new Date();
    if (contract.targetDate) {
        deadlineDate = new Date(contract.targetDate);
        if (contract.terminusTime) {
            const [hours, minutes] = contract.terminusTime.split(':').map(Number);
            deadlineDate.setHours(hours, minutes, 0, 0);
        } else {
            deadlineDate.setHours(23, 59, 0, 0);
        }
    } else {
        // Registry contract fallback (shouldn't happen for active, but safe default)
        deadlineDate.setHours(23, 59, 0, 0);
    }

    const startTimestamp = formatICSSTimestamp(deadlineDate);
    const endTimestamp = formatICSSTimestamp(deadlineDate); // 0-duration event (deadline)

    // 2. Construct Tactical Description
    // Note: CRLF (\r\n) is required by ICS spec
    const description = [
        `// MISSION ORDER: ${contract.id}`,
        `// STATUS: ACTIVE`,
        `OBJECTIVE: ${contract.title}`,
        ``,
        `FAILURE CONSEQUENCES:`,
        `- Contract Voided`,
        `- Reputation Hit: -500`, // Hardcoded bounty proxy for now
        `- Identity Burn Risk: HIGH`,
        ``,
        `EXECUTE IMMEDIATELY: https://killlist.app`
    ].join('\\n'); // Scaped newline for ICS content

    // 3. Build ICS Content
    const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Kill List//Mission Order//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${contract.id}@killlist.app`,
        `DTSTAMP:${createdAt}`,
        `DTSTART:${startTimestamp}`,
        `DTEND:${endTimestamp}`,
        `SUMMARY:⚠ DEADLINE: ${contract.title}`,
        `DESCRIPTION:${description}`,
        `URL:https://killlist.app`,
        'BEGIN:VALARM',
        'TRIGGER:-PT1H',
        'ACTION:DISPLAY',
        'DESCRIPTION:MISSION DEADLINE APPROACHING',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ];

    const icsContent = icsLines.join('\r\n');

    // 4. Trigger Download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MISSION_${contract.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
