/**
 * Hook to handle values that need to be consistent between server and client
 * Prevents hydration mismatches by returning a default value on initial render
 * and the actual value after hydration
 */

import { useEffect, useState } from 'react';

export function useIsomorphicValue<T>(serverValue: T, clientValue: T): T {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? clientValue : serverValue;
}

/**
 * Hook specifically for demo values that should be static
 */
export function useDemoValue<T>(value: T): T {
  return useIsomorphicValue(value, value);
}

/**
 * Hook for handling dates that might differ between server and client
 */
export function useConsistentDate(date?: Date): Date {
  // Use a fixed date for demos to prevent hydration issues
  const fixedDate = new Date('2024-12-08T10:30:00Z');
  return useIsomorphicValue(fixedDate, date || fixedDate);
}
