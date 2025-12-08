import { formatDate } from "../formatters";

describe("Date Formatters", () => {
  describe("formatDate", () => {
    it("should format date with default options", () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date);
      expect(result).toBe("01/15/2024");
    });

    it("should format date with custom locale", () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date, undefined, "en-GB");
      expect(result).toBe("15/01/2024");
    });

    it("should format date with custom options - long format", () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      expect(result).toBe("January 15, 2024");
    });

    it("should format date with custom options - short format", () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date, {
        year: "2-digit",
        month: "short",
        day: "numeric",
      });
      expect(result).toBe("Jan 15, 24");
    });

    it("should format date with weekday", () => {
      const date = new Date(2024, 0, 15);
      const result = formatDate(date, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      expect(result).toBe("Monday, January 15, 2024");
    });

    it("should format date with numeric month and day", () => {
      const date = new Date(2024, 0, 5);
      const result = formatDate(date, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      expect(result).toBe("1/5/2024");
    });

    it("should handle different locales correctly", () => {
      const date = new Date(2024, 0, 15);

      const enUS = formatDate(date, { month: "long" }, "en-US");
      expect(enUS).toBe("January");

      const frFR = formatDate(date, { month: "long" }, "fr-FR");
      expect(frFR).toBe("janvier");

      const deDE = formatDate(date, { month: "long" }, "de-DE");
      expect(deDE).toBe("Januar");
    });

    it("should handle edge cases - leap year", () => {
      const leapDay = new Date(2024, 1, 29);
      const result = formatDate(leapDay);
      expect(result).toBe("02/29/2024");
    });

    it("should handle edge cases - year transitions", () => {
      const newYear = new Date(2024, 0, 1);
      const result = formatDate(newYear, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      expect(result).toBe("January 1, 2024");
    });

    it("should handle edge cases - end of year", () => {
      const endOfYear = new Date(2024, 11, 31);
      const result = formatDate(endOfYear, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      expect(result).toBe("December 31, 2024");
    });
  });
});
