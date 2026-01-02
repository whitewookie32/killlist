/**
 * Haptic Pattern Definitions
 */
export const HapticPatterns = {
  Light: 10,       // UI Taps
  Medium: 40,      // Accept Contract
  Heavy: [50, 50, 50] // Kill Confirmed
} as const;

export type HapticPattern = number | number[] | readonly number[];

/**
 * Trigger haptic feedback (vibration)
 * Safely fails if navigator.vibrate is not supported
 */
export function vibrate(pattern: HapticPattern): void {
  if (typeof window === 'undefined') return;

  // Debug: Temporary check to see if function is called on mobile
  // alert(`Vibrate called: ${JSON.stringify(pattern)}. Supported: ${!!navigator.vibrate}`);

  if (!navigator.vibrate) return;

  try {
    // Cast readonly arrays to mutable for the API
    const p = Array.isArray(pattern) ? [...pattern] : pattern;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigator.vibrate(p as any);
    // console.log('Vibration result:', result);
  } catch (e) {
    // console.error('Vibration failed:', e);
  }
}
