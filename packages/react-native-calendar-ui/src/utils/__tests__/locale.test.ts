import {
  getLocaleConfig,
  getLocalizedMonthName,
  getLocalizedDayName,
  getISOWeekNumber,
  adjustDaysForWeekStart,
} from "../locale";

describe("Locale Utilities", () => {
  describe("getLocaleConfig", () => {
    it("should return default locale config", () => {
      const config = getLocaleConfig();
      expect(config.locale).toBe("en-US");
      expect(config.firstDayOfWeek).toBe(0);
    });

    it("should cache locale configs", () => {
      const config1 = getLocaleConfig("en-US");
      const config2 = getLocaleConfig("en-US");
      expect(config1).toBe(config2);
    });

    it("should detect RTL for Arabic", () => {
      const config = getLocaleConfig("ar-SA");
      expect(config.direction).toBe("rtl");
    });

    it("should set Monday as first day for non-US locales", () => {
      const config = getLocaleConfig("pt-BR");
      expect(config.firstDayOfWeek).toBe(1);
    });
  });

  describe("getLocalizedMonthName", () => {
    it("should return localized month name", () => {
      const name = getLocalizedMonthName(0, "en-US");
      expect(name).toBeTruthy();
    });

    it("should return short month name", () => {
      const name = getLocalizedMonthName(0, "en-US", true);
      expect(name).toBeTruthy();
      expect(name.length).toBeLessThan(10);
    });
  });

  describe("getLocalizedDayName", () => {
    it("should return localized day name", () => {
      const name = getLocalizedDayName(0, "en-US");
      expect(name).toBeTruthy();
    });

    it("should return short day name", () => {
      const name = getLocalizedDayName(0, "en-US", true);
      expect(name).toBeTruthy();
      expect(name.length).toBeLessThan(10);
    });
  });

  describe("getISOWeekNumber", () => {
    it("should calculate ISO week number", () => {
      const weekNumber = getISOWeekNumber(new Date(2024, 0, 15));
      expect(weekNumber).toBeGreaterThan(0);
      expect(weekNumber).toBeLessThanOrEqual(53);
    });

    it("should handle year boundaries correctly", () => {
      const weekNumber = getISOWeekNumber(new Date(2024, 0, 1));
      expect(weekNumber).toBeGreaterThan(0);
    });
  });

  describe("adjustDaysForWeekStart", () => {
    it("should return days unchanged when firstDayOfWeek is 0", () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const adjusted = adjustDaysForWeekStart(days, 0);
      expect(adjusted).toEqual(days);
    });

    it("should reorder days when firstDayOfWeek is 1 (Monday)", () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const adjusted = adjustDaysForWeekStart(days, 1);
      expect(adjusted).toEqual([
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ]);
    });

    it("should reorder days when firstDayOfWeek is 6 (Saturday)", () => {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const adjusted = adjustDaysForWeekStart(days, 6);
      expect(adjusted).toEqual([
        "Sat",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
      ]);
    });
  });
});
