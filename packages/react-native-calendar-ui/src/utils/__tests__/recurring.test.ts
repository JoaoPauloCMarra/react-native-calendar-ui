import { getRecurringDates, isRecurringDate } from "../recurring";
import type { RecurringDateOptions } from "../../types/recurring";

describe("Recurring Date Utilities", () => {
  describe("getRecurringDates", () => {
    it("should generate daily recurring dates", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 5),
        rule: { pattern: "daily", interval: 1 },
      };
      const dates = getRecurringDates(options);
      expect(dates).toHaveLength(5);
    });

    it("should generate weekly recurring dates", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 29),
        rule: { pattern: "weekly", interval: 1 },
      };
      const dates = getRecurringDates(options);
      expect(dates).toHaveLength(5);
    });

    it("should respect interval for weekly pattern", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 29),
        rule: { pattern: "weekly", interval: 2 },
      };
      const dates = getRecurringDates(options);
      expect(dates).toHaveLength(3);
    });

    it("should filter by days of week", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
        rule: { pattern: "daily", interval: 1, daysOfWeek: [1, 3, 5] },
      };
      const dates = getRecurringDates(options);
      dates.forEach((date) => {
        expect([1, 3, 5]).toContain(date.getDay());
      });
    });

    it("should filter by days of month", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 2, 31),
        rule: { pattern: "daily", interval: 1, daysOfMonth: [1, 15, 30] },
      };
      const dates = getRecurringDates(options);
      dates.forEach((date) => {
        expect([1, 15, 30]).toContain(date.getDate());
      });
    });

    it("should filter by months of year", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 11, 31),
        rule: { pattern: "monthly", interval: 1, monthsOfYear: [0, 5, 11] },
      };
      const dates = getRecurringDates(options);
      dates.forEach((date) => {
        expect([0, 5, 11]).toContain(date.getMonth());
      });
    });

    it("should respect count limit", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        rule: { pattern: "daily", interval: 1, count: 10 },
      };
      const dates = getRecurringDates(options);
      expect(dates).toHaveLength(10);
    });

    it("should respect until date", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        rule: { pattern: "daily", interval: 1, until: new Date(2024, 0, 5) },
      };
      const dates = getRecurringDates(options);
      expect(dates.length).toBeLessThanOrEqual(5);
    });

    it("should handle monthly recurring dates", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 11, 31),
        rule: { pattern: "monthly", interval: 1 },
      };
      const dates = getRecurringDates(options);
      expect(dates).toHaveLength(12);
    });

    it("should handle yearly recurring dates", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2026, 11, 31),
        rule: { pattern: "yearly", interval: 1 },
      };
      const dates = getRecurringDates(options);
      expect(dates).toHaveLength(3);
    });

    it("should handle unknown pattern as daily", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 5),
        rule: { pattern: "unknown" as any, interval: 1 },
      };
      const dates = getRecurringDates(options);
      expect(dates).toHaveLength(5);
    });
  });

  describe("isRecurringDate", () => {
    it("should identify recurring dates", () => {
      const options: RecurringDateOptions = {
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 10),
        rule: { pattern: "daily", interval: 2 },
      };
      expect(isRecurringDate(new Date(2024, 0, 1), options)).toBe(true);
      expect(isRecurringDate(new Date(2024, 0, 3), options)).toBe(true);
      expect(isRecurringDate(new Date(2024, 0, 2), options)).toBe(false);
    });
  });
});
