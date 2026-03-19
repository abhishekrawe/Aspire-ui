/**
 * Format card number with masked digits
 * e.g., "4532 8912 3456 2020" -> "●●●● ●●●● ●●●● 2020"
 */
export function formatCardNumber(cardNumber: string, showFull: boolean = false): string {
  const cleaned = cardNumber.replace(/\s/g, '');
  if (showFull) {
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  }
  const lastFour = cleaned.slice(-4);
  return `●●●● ●●●● ●●●● ${lastFour}`;
}

/**
 * Format card number for display in groups
 * e.g., "4532891234562020" -> ["4532", "8912", "3456", "2020"]
 */
export function getCardNumberGroups(cardNumber: string): string[] {
  const cleaned = cardNumber.replace(/\s/g, '');
  return cleaned.match(/.{1,4}/g) || [];
}

/**
 * Format currency amount
 */
export function formatCurrency(
  amount: number,
  currencySymbol: string = 'S$',
  showSign: boolean = false
): string {
  const formatted = new Intl.NumberFormat('en-SG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  if (showSign && amount !== 0) {
    const sign = amount > 0 ? '+' : '-';
    return `${sign} ${currencySymbol} ${formatted}`;
  }
  
  return `${currencySymbol} ${formatted}`;
}

/**
 * Format date
 */
export function formatDate(dateString: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateString);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

