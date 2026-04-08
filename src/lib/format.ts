/**
 * Parse a user-entered balance string into a number.
 * Handles German format (1.234,56) and English format (1,234.56).
 */
export function parseBalanceNumber(input: string): number {
  const cleaned = input.replace(/[^\d.,]/g, "");
  if (!cleaned) return 0;
  // If both . and , exist, determine format by last separator
  if (cleaned.includes(",") && cleaned.includes(".")) {
    if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
      // German: 1.234,56
      return parseFloat(cleaned.replace(/\./g, "").replace(",", "."));
    }
    // English: 1,234.56
    return parseFloat(cleaned.replace(/,/g, ""));
  }
  if (cleaned.includes(",")) {
    // Could be German decimal: 1234,56
    return parseFloat(cleaned.replace(",", "."));
  }
  return parseFloat(cleaned);
}

/**
 * Format a balance string into German number format with € suffix.
 * "55555" → "55.555€", "1250.50" → "1.250,50€"
 */
export function formatBalance(input: string): string {
  const num = parseBalanceNumber(input);
  if (isNaN(num)) return input;
  const formatted = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(num);
  return `${formatted}€`;
}

/**
 * Format an IBAN string into groups of 4 characters.
 * "AT683505300026037697" → "AT68 3505 3000 2603 7697"
 */
export function formatIBAN(input: string): string {
  const cleaned = input.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
}
