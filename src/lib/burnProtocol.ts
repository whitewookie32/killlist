import { browser } from '$app/environment';
import { getDb, getClientTodayISODate, type Contract } from '$lib/db';

/**
 * The "Cleaner" - Burns any task from previous days that is still 'active'.
 * 
 * This runs on app start (onMount) and:
 * 1. Finds all contracts where targetDate < today AND status === 'active'
 * 2. Bulk-updates them to status: 'burned'
 * 3. Returns the list of burned tasks for the Mission Report modal
 * 
 * @returns Array of contracts that were burned in this run
 */
export async function checkBurnProtocol(): Promise<Contract[]> {
  if (!browser) return [];

  try {
    const db = await getDb();
    const today = getClientTodayISODate();

    // Find stale active contracts (from previous days)
    const allContracts = await db.contracts.toArray();
    const staleActive = allContracts.filter(
      (c: Contract) => c.targetDate < today && c.status === 'active'
    );

    if (staleActive.length === 0) {
      return [];
    }

    // Bulk update: mark as burned
    const ids = staleActive.map((c: Contract) => c.id);
    
    // Use modify for bulk update
    await db.contracts
      .where('id')
      .anyOf(ids)
      .modify({ status: 'burned' });

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
    const db = await getDb();
    await db.contracts.bulkDelete(ids);
  } catch (error) {
    console.error('Failed to delete burned contracts:', error);
  }
}

