import { getDaysBetween, getDateRange } from "../date-range";

describe("Date Range Utilities", () => {
  describe("getDaysBetween", () => {
    it("should return 0 for the same date", () => {
      const date = new Date(2024, 0, 1);
      const result = getDaysBetween(date, date);
      expect(result).toBe(0);
    });

    it("should calculate days between dates in same month", () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 10);
      const result = getDaysBetween(start, end);
      expect(result).toBe(9);
    });

    it("should calculate days between dates across months", () => {
      const start = new Date(2024, 0, 25);
      const end = new Date(2024, 1, 5);
      const result = getDaysBetween(start, end);
      expect(result).toBe(11);
    });

    it("should calculate days between dates across years", () => {
      const start = new Date(2023, 11, 25);
      const end = new Date(2024, 0, 5);
      const result = getDaysBetween(start, end);
      expect(result).toBe(11);
    });

    it("should return negative for reversed dates", () => {
      const start = new Date(2024, 0, 10);
      const end = new Date(2024, 0, 1);
      const result = getDaysBetween(start, end);
      expect(result).toBe(-9);
    });

    it("should ignore time components", () => {
      const start = new Date(2024, 0, 1, 10, 30, 0);
      const end = new Date(2024, 0, 2, 15, 45, 30);
      const result = getDaysBetween(start, end);
      expect(result).toBe(1);
    });

    it("should handle leap year correctly", () => {
      const start = new Date(2024, 1, 1);
      const end = new Date(2024, 2, 1);
      const result = getDaysBetween(start, end);
      expect(result).toBe(29);
    });

    it("should handle non-leap year correctly", () => {
      const start = new Date(2023, 1, 1);
      const end = new Date(2023, 2, 1);
      const result = getDaysBetween(start, end);
      expect(result).toBe(28);
    });

    it("should calculate large date ranges", () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 11, 31);
      const result = getDaysBetween(start, end);
      expect(result).toBe(365);
    });
  });

  describe("getDateRange", () => {
    it("should return single date for same start and end", () => {
      const date = new Date(2024, 0, 1);
      const result = getDateRange(date, date);
      expect(result).toHaveLength(1);
      expect(result[0].getTime()).toBe(date.getTime());
    });

    it("should return all dates in range", () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 5);
      const result = getDateRange(start, end);

      expect(result).toHaveLength(5);
      expect(result[0].getDate()).toBe(1);
      expect(result[4].getDate()).toBe(5);
    });

    it("should include both start and end dates", () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 3);
      const result = getDateRange(start, end);

      expect(result[0].getDate()).toBe(1);
      expect(result[result.length - 1].getDate()).toBe(3);
    });

    it("should handle ranges across months", () => {
      const start = new Date(2024, 0, 30);
      const end = new Date(2024, 1, 2);
      const result = getDateRange(start, end);

      expect(result).toHaveLength(4);
      expect(result[0].getDate()).toBe(30);
      expect(result[0].getMonth()).toBe(0);
      expect(result[3].getDate()).toBe(2);
      expect(result[3].getMonth()).toBe(1);
    });

    it("should handle ranges across years", () => {
      const start = new Date(2023, 11, 30);
      const end = new Date(2024, 0, 2);
      const result = getDateRange(start, end);

      expect(result).toHaveLength(4);
      expect(result[0].getFullYear()).toBe(2023);
      expect(result[3].getFullYear()).toBe(2024);
    });

    it("should return dates in chronological order", () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 10);
      const result = getDateRange(start, end);

      for (let i = 1; i < result.length; i++) {
        expect(result[i].getTime()).toBeGreaterThan(result[i - 1].getTime());
      }
    });

    it("should create new Date objects", () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 3);
      const result = getDateRange(start, end);

      result[0].setDate(15);
      expect(start.getDate()).toBe(1);
    });

    it("should handle leap year February", () => {
      const start = new Date(2024, 1, 27);
      const end = new Date(2024, 2, 2);
      const result = getDateRange(start, end);

      expect(result).toHaveLength(5);
      expect(result[2].getDate()).toBe(29);
    });

    it("should handle large date ranges", () => {
      const start = new Date(2024, 0, 1);
      const end = new Date(2024, 0, 31);
      const result = getDateRange(start, end);

      expect(result).toHaveLength(31);
    });

    it("should return empty array for reversed dates", () => {
      const start = new Date(2024, 0, 10);
      const end = new Date(2024, 0, 1);
      const result = getDateRange(start, end);

      expect(result).toHaveLength(0);
    });
  });
});
