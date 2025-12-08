export type RecurrencePattern = "daily" | "weekly" | "monthly" | "yearly";

export interface RecurrenceRule {
  pattern: RecurrencePattern;
  interval?: number;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
  monthsOfYear?: number[];
  count?: number;
  until?: Date;
}

export interface RecurringDateOptions {
  start: Date;
  end?: Date;
  rule: RecurrenceRule;
}
