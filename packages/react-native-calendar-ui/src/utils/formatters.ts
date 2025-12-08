/**
 * Format a date using Intl.DateTimeFormat
 * @param date - Date to format
 * @param options - Intl.DateTimeFormat options
 * @param locale - Locale string (defaults to 'en-US')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string {
  return date.toLocaleDateString(
    locale ?? "en-US",
    options ?? {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );
}
