import {
  isSameDate,
  isDateBefore,
  isDateAfter,
  isDateBetween,
  normalizeDate,
  isValidDate,
} from "../date-comparison";

describe("Date Comparison Utilities", () => {
  describe("isSameDate", () => {
    it("should return true for same dates", () => {
      const date1 = new Date(2024, 0, 15, 10, 30);
      const date2 = new Date(2024, 0, 15, 14, 45);
      expect(isSameDate(date1, date2)).toBe(true);
    });

    it("should return false for different dates", () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 16);
      expect(isSameDate(date1, date2)).toBe(false);
    });
  });

  describe("isDateBefore", () => {
    it("should return true when first date is before second", () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 16);
      expect(isDateBefore(date1, date2)).toBe(true);
    });

    it("should return false when first date is after second", () => {
      const date1 = new Date(2024, 0, 16);
      const date2 = new Date(2024, 0, 15);
      expect(isDateBefore(date1, date2)).toBe(false);
    });
  });

  describe("isDateAfter", () => {
    it("should return true when first date is after second", () => {
      const date1 = new Date(2024, 0, 16);
      const date2 = new Date(2024, 0, 15);
      expect(isDateAfter(date1, date2)).toBe(true);
    });

    it("should return false when first date is before second", () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 0, 16);
      expect(isDateAfter(date1, date2)).toBe(false);
    });
  });

  describe("isDateBetween", () => {
    it("should return true when date is between start and end", () => {
      const date = new Date(2024, 0, 15);
      const start = new Date(2024, 0, 10);
      const end = new Date(2024, 0, 20);
      expect(isDateBetween(date, start, end)).toBe(true);
    });

    it("should return false when date is outside range", () => {
      const date = new Date(2024, 0, 25);
      const start = new Date(2024, 0, 10);
      const end = new Date(2024, 0, 20);
      expect(isDateBetween(date, start, end)).toBe(false);
    });

    it("should include boundary dates", () => {
      const start = new Date(2024, 0, 10);
      const end = new Date(2024, 0, 20);
      expect(isDateBetween(start, start, end)).toBe(true);
      expect(isDateBetween(end, start, end)).toBe(true);
    });
  });

  describe("normalizeDate", () => {
    it("should remove time component from date", () => {
      const date = new Date(2024, 0, 15, 14, 30, 45);
      const normalized = normalizeDate(date);
      expect(normalized.getHours()).toBe(0);
      expect(normalized.getMinutes()).toBe(0);
      expect(normalized.getSeconds()).toBe(0);
    });
  });

  describe("isValidDate", () => {
    it("should return true for valid dates", () => {
      expect(isValidDate(new Date())).toBe(true);
      expect(isValidDate(new Date(2024, 0, 15))).toBe(true);
    });

    it("should return false for invalid dates", () => {
      expect(isValidDate(new Date("invalid"))).toBe(false);
      expect(isValidDate("2024-01-15")).toBe(false);
      expect(isValidDate(null)).toBe(false);
      expect(isValidDate(undefined)).toBe(false);
    });
  });
});
