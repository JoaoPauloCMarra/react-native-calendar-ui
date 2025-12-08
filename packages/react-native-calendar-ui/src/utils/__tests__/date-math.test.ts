import {
  addDays,
  addMonths,
  addYears,
  isWeekend,
  getFirstDayOfWeek,
  getWeekNumber,
  isLeapYear,
} from "../date-math";

describe("Date Math Utilities", () => {
  describe("addDays", () => {
    it("should add positive days correctly", () => {
      const date = new Date(2024, 0, 1);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
      expect(result.getMonth()).toBe(0);
      expect(result.getFullYear()).toBe(2024);
    });

    it("should add negative days correctly", () => {
      const date = new Date(2024, 0, 10);
      const result = addDays(date, -5);
      expect(result.getDate()).toBe(5);
      expect(result.getMonth()).toBe(0);
    });

    it("should handle month transitions", () => {
      const date = new Date(2024, 0, 30);
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(4);
      expect(result.getMonth()).toBe(1);
    });

    it("should not mutate original date", () => {
      const date = new Date(2024, 0, 1);
      const original = date.getTime();
      addDays(date, 5);
      expect(date.getTime()).toBe(original);
    });
  });

  describe("addMonths", () => {
    it("should add positive months correctly", () => {
      const date = new Date(2024, 0, 15);
      const result = addMonths(date, 3);
      expect(result.getMonth()).toBe(3);
      expect(result.getFullYear()).toBe(2024);
    });

    it("should add negative months correctly", () => {
      const date = new Date(2024, 5, 15);
      const result = addMonths(date, -3);
      expect(result.getMonth()).toBe(2);
    });

    it("should handle year transitions", () => {
      const date = new Date(2024, 10, 15);
      const result = addMonths(date, 3);
      expect(result.getMonth()).toBe(1);
      expect(result.getFullYear()).toBe(2025);
    });

    it("should not mutate original date", () => {
      const date = new Date(2024, 0, 1);
      const original = date.getTime();
      addMonths(date, 3);
      expect(date.getTime()).toBe(original);
    });
  });

  describe("addYears", () => {
    it("should add positive years correctly", () => {
      const date = new Date(2024, 5, 15);
      const result = addYears(date, 2);
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it("should add negative years correctly", () => {
      const date = new Date(2024, 5, 15);
      const result = addYears(date, -2);
      expect(result.getFullYear()).toBe(2022);
    });

    it("should not mutate original date", () => {
      const date = new Date(2024, 0, 1);
      const original = date.getTime();
      addYears(date, 2);
      expect(date.getTime()).toBe(original);
    });
  });

  describe("isWeekend", () => {
    it("should return true for Saturday", () => {
      const saturday = new Date(2024, 0, 6);
      expect(isWeekend(saturday)).toBe(true);
    });

    it("should return true for Sunday", () => {
      const sunday = new Date(2024, 0, 7);
      expect(isWeekend(sunday)).toBe(true);
    });

    it("should return false for weekdays", () => {
      const monday = new Date(2024, 0, 1);
      const wednesday = new Date(2024, 0, 3);
      const friday = new Date(2024, 0, 5);

      expect(isWeekend(monday)).toBe(false);
      expect(isWeekend(wednesday)).toBe(false);
      expect(isWeekend(friday)).toBe(false);
    });
  });

  describe("getFirstDayOfWeek", () => {
    it("should return Sunday for a date in the middle of the week", () => {
      const wednesday = new Date(2024, 0, 3);
      const result = getFirstDayOfWeek(wednesday);
      expect(result.getDay()).toBe(0);
      expect(result.getDate()).toBe(31);
    });

    it("should return the same date if already Sunday", () => {
      const sunday = new Date(2024, 0, 7);
      const result = getFirstDayOfWeek(sunday);
      expect(result.getDay()).toBe(0);
      expect(result.getDate()).toBe(7);
    });

    it("should not mutate original date", () => {
      const date = new Date(2024, 0, 3);
      const original = date.getTime();
      getFirstDayOfWeek(date);
      expect(date.getTime()).toBe(original);
    });
  });

  describe("getWeekNumber", () => {
    it("should return 1 for first week of year", () => {
      const weekNum = getWeekNumber(2024, 0, 1);
      expect(weekNum).toBeGreaterThanOrEqual(1);
      expect(weekNum).toBeLessThanOrEqual(2);
    });

    it("should return higher week numbers for later dates", () => {
      const week1 = getWeekNumber(2024, 0, 1);
      const week26 = getWeekNumber(2024, 5, 15);
      expect(week26).toBeGreaterThan(week1);
    });

    it("should return approximately 52 for end of year", () => {
      const weekNum = getWeekNumber(2024, 11, 31);
      expect(weekNum).toBeGreaterThanOrEqual(52);
      expect(weekNum).toBeLessThanOrEqual(54);
    });
  });

  describe("isLeapYear", () => {
    it("should return true for leap years divisible by 4", () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2016)).toBe(true);
    });

    it("should return false for non-leap years", () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2021)).toBe(false);
      expect(isLeapYear(2019)).toBe(false);
    });

    it("should return false for years divisible by 100 but not 400", () => {
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });

    it("should return true for years divisible by 400", () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(2400)).toBe(true);
    });
  });
});
