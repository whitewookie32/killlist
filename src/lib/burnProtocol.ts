import { browser } from '$app/environment';
import { burnContract, deleteContracts, getAllContracts, getClientTodayISODate, type Contract } from '$lib/db';

/**
 * The "Cleaner" - Burns any ACTIVE task from previous days.
 * 
 * This runs on app start (onMount) and:
 * 1. Finds all contracts where status === 'active' AND targetDate < today
 * 2. Bulk-updates them to status: 'burned'
 * 3. Returns the list of burned tasks for the Mission Report modal
 * 
 * NOTE: Registry contracts are NEVER burned - they have no targetDate
 * and are not subject to the 24h rule until accepted.
 * 
 * @returns Array of contracts that were burned in this run
 */
export async function checkBurnProtocol(): Promise<Contract[]> {
  if (!browser) return [];

  try {
    const today = getClientTodayISODate();

    // Find stale ACTIVE contracts (from previous days)
    // Registry contracts are excluded - they have no targetDate
    const allContracts = await getAllContracts();
    const staleActive = allContracts.filter(
      (c: Contract) => 
        c.status === 'active' && // Only active contracts can be burned
        c.targetDate && // Must have a targetDate (registry contracts don't)
        c.targetDate < today // And it must be before today
    );

    if (staleActive.length === 0) {
      return [];
    }

    // Bulk update: mark as burned
    const ids = staleActive.map((c: Contract) => c.id);
    
    await Promise.all(ids.map((id) => burnContract(id)));

    // Return the burned contracts (with updated status) for Mission Report
    return staleActive.map((c: Contract) => ({ 
      ...c, 
      status: 'burned' as const 
    }));
  } catch (error) {
    console.error('Burn Protocol failed:', error);
    return [];
  }
}

/**
 * Delete all burned contracts from the database.
 * Called when user presses "Clean House" on the Mission Report modal.
 * 
 * @param ids - Array of contract IDs to delete
 */
export async function deleteBurnedContracts(ids: string[]): Promise<void> {
  if (!browser || ids.length === 0) return;

  try {
    await deleteContracts(ids);
  } catch (error) {
    console.error('Failed to delete burned contracts:', error);
  }
}

