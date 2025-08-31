/**
 * Date formatting utilities to prevent hydration mismatches
 * All dates are formatted consistently between server and client
 */

export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC'
  });
};

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });
};

export const formatKenyaDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Kenya uses DD/MM/YYYY format
  return dateObj.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Africa/Nairobi'
  });
};

export const formatKenyaTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Nairobi'
  });
};

/**
 * Get a consistent date string for demo purposes
 * This prevents hydration issues by always returning the same date
 */
export const getDemoDate = (): string => {
  // Use a fixed date for demos to prevent hydration issues
  const demoDate = new Date('2024-12-08T10:30:00Z');
  return formatDate(demoDate);
};

export const getDemoTime = (): string => {
  // Use a fixed time for demos to prevent hydration issues
  const demoDate = new Date('2024-12-08T10:30:00Z');
  return formatTime(demoDate);
};

export const getDemoDateTime = (): string => {
  // Use a fixed datetime for demos to prevent hydration issues
  const demoDate = new Date('2024-12-08T10:30:00Z');
  return formatDateTime(demoDate);
};

/**
 * Format currency consistently to prevent hydration issues
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatKES = (amount: number): string => {
  return formatCurrency(amount, 'KES', 'en-KE');
};

/**
 * Static demo values to prevent hydration mismatches
 * These are fixed values that remain consistent between server and client
 */
export const getDemoTransactionId = (): string => {
  return 'TXN-2024-001247';
};

export const getDemoReceiptId = (): string => {
  return 'RCP-2024-001247';
};
