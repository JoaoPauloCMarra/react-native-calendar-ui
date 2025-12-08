import { getPresetValue, DATE_PRESETS } from "../presets";

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

    it("should return correct range for last7days", () => {
      const result = getPresetValue("last7days");
      expect(result).not.toBeNull();
      const daysDiff = Math.floor(
        (result!.end.getTime() - result!.start.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      expect(daysDiff).toBe(6);
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
  });
});
