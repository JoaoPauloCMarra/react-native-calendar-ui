import { getPresetValue, DATE_PRESETS } from "../presets";
import { getDaysBetween } from "../date-range";

describe("Preset Utilities", () => {
  describe("DATE_PRESETS", () => {
    it("should have all expected presets", () => {
      expect(DATE_PRESETS.today).toBeDefined();
      expect(DATE_PRESETS.yesterday).toBeDefined();
      expect(DATE_PRESETS.last7days).toBeDefined();
      expect(DATE_PRESETS.last30days).toBeDefined();
      expect(DATE_PRESETS.thisWeek).toBeDefined();
      expect(DATE_PRESETS.lastWeek).toBeDefined();
      expect(DATE_PRESETS.thisMonth).toBeDefined();
      expect(DATE_PRESETS.lastMonth).toBeDefined();
      expect(DATE_PRESETS.thisYear).toBeDefined();
    });
  });

  describe("getPresetValue", () => {
    it("should return correct range for today", () => {
      const result = getPresetValue("today");
      expect(result).not.toBeNull();
      expect(result?.start.toDateString()).toBe(result?.end.toDateString());
    });

    it("should return correct range for yesterday", () => {
      const result = getPresetValue("yesterday");
      expect(result).not.toBeNull();

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      expect(result?.start.toDateString()).toBe(yesterday.toDateString());
      expect(result?.end.toDateString()).toBe(yesterday.toDateString());
    });

    it("should return correct range for last7days", () => {
      const result = getPresetValue("last7days");
      expect(result).not.toBeNull();
      const daysDiff = getDaysBetween(result!.start, result!.end);
      expect(daysDiff).toBe(6);
    });

    it("should return correct range for last30days", () => {
      const result = getPresetValue("last30days");
      expect(result).not.toBeNull();
      const daysDiff = getDaysBetween(result!.start, result!.end);
      expect(daysDiff).toBe(29);
    });

    it("should return correct range for thisWeek", () => {
      const result = getPresetValue("thisWeek");
      expect(result).not.toBeNull();

      // Start should be Sunday (day 0)
      expect(result?.start.getDay()).toBe(0);

      // End should be Saturday (day 6)
      expect(result?.end.getDay()).toBe(6);

      // Should be 7 days total
      const daysDiff = getDaysBetween(result!.start, result!.end);
      expect(daysDiff).toBe(6);
    });

    it("should return correct range for lastWeek", () => {
      const result = getPresetValue("lastWeek");
      expect(result).not.toBeNull();

      // Start should be Sunday (day 0)
      expect(result?.start.getDay()).toBe(0);

      // End should be Saturday (day 6)
      expect(result?.end.getDay()).toBe(6);

      // Should be 7 days total
      const daysDiff = getDaysBetween(result!.start, result!.end);
      expect(daysDiff).toBe(6);

      // Last week should be before this week
      const thisWeek = getPresetValue("thisWeek");
      expect(result!.end.getTime()).toBeLessThan(thisWeek!.start.getTime());
    });

    it("should return null for invalid preset", () => {
      const result = getPresetValue("invalid");
      expect(result).toBeNull();
    });

    it("should return correct range for thisMonth", () => {
      const result = getPresetValue("thisMonth");
      expect(result).not.toBeNull();
      expect(result?.start.getDate()).toBe(1);
      expect(result?.start.getMonth()).toBe(result?.end.getMonth());
    });

    it("should return correct range for lastMonth", () => {
      const result = getPresetValue("lastMonth");
      expect(result).not.toBeNull();

      const today = new Date();
      const expectedMonth = today.getMonth() - 1;
      const expectedYear =
        expectedMonth < 0 ? today.getFullYear() - 1 : today.getFullYear();
      const normalizedMonth = expectedMonth < 0 ? 11 : expectedMonth;

      expect(result?.start.getDate()).toBe(1);
      expect(result?.start.getMonth()).toBe(normalizedMonth);
      expect(result?.start.getFullYear()).toBe(expectedYear);
      expect(result?.end.getMonth()).toBe(normalizedMonth);
    });

    it("should return correct range for thisYear", () => {
      const result = getPresetValue("thisYear");
      expect(result).not.toBeNull();

      const today = new Date();
      expect(result?.start.getMonth()).toBe(0);
      expect(result?.start.getDate()).toBe(1);
      expect(result?.start.getFullYear()).toBe(today.getFullYear());

      expect(result?.end.getMonth()).toBe(11);
      expect(result?.end.getDate()).toBe(31);
      expect(result?.end.getFullYear()).toBe(today.getFullYear());
    });
  });
});
