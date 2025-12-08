import type { RecurringDateOptions, RecurrenceRule } from "../types/recurring";
import { addDays, addMonths, addYears } from "./date-math";

export function getRecurringDates(options: RecurringDateOptions): Date[] {
  const { start, end, rule } = options;
  const dates: Date[] = [];
  const maxDate = end || addYears(start, 1);
  const interval = rule.interval || 1;

  let currentDate = new Date(start);
  let count = 0;
  const maxCount = rule.count || Infinity;

  while (currentDate <= maxDate && count < maxCount) {
    if (shouldIncludeDate(currentDate, rule)) {
      dates.push(new Date(currentDate));
      count++;
    }

    currentDate = getNextDate(currentDate, rule.pattern, interval);

    if (rule.until && currentDate > rule.until) {
      break;
    }
  }

  return dates;
}

function shouldIncludeDate(date: Date, rule: RecurrenceRule): boolean {
  if (rule.daysOfWeek && rule.daysOfWeek.length > 0) {
    if (!rule.daysOfWeek.includes(date.getDay())) {
      return false;
    }
  }

  if (rule.daysOfMonth && rule.daysOfMonth.length > 0) {
    if (!rule.daysOfMonth.includes(date.getDate())) {
      return false;
    }
  }

  if (rule.monthsOfYear && rule.monthsOfYear.length > 0) {
    if (!rule.monthsOfYear.includes(date.getMonth())) {
      return false;
    }
  }

  return true;
}

function getNextDate(date: Date, pattern: string, interval: number): Date {
  switch (pattern) {
    case "daily":
      return addDays(date, interval);
    case "weekly":
      return addDays(date, interval * 7);
    case "monthly":
      return addMonths(date, interval);
    case "yearly":
      return addYears(date, interval);
    default:
      return addDays(date, 1);
  }
}

export function isRecurringDate(
  date: Date,
  options: RecurringDateOptions
): boolean {
  const recurringDates = getRecurringDates(options);
  return recurringDates.some(
    (d) =>
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
  );
}
