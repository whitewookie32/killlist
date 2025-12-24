/**
 * Haptic Pattern Definitions
 */
export const HapticPatterns = {
  Light: 10,       // UI Taps
  Medium: 40,      // Accept Contract
  Heavy: [50, 50, 50] // Kill Confirmed
} as const;

export type HapticPattern = number | number[];

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
    const result = navigator.vibrate(pattern);
    // console.log('Vibration result:', result);
  } catch (e) {
    // console.error('Vibration failed:', e);
  }
}
