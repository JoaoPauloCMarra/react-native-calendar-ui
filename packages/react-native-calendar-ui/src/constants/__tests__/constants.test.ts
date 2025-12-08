import { DAYS } from "../days";
import { MONTHS } from "../months";

describe("Constants", () => {
  describe("DAYS", () => {
    it("should export 7 days of the week", () => {
      expect(DAYS).toHaveLength(7);
    });

    it("should start with Sunday", () => {
      expect(DAYS[0]).toBe("Sunday");
    });

    it("should end with Saturday", () => {
      expect(DAYS[6]).toBe("Saturday");
    });

    it("should have all weekday names", () => {
      expect(DAYS).toEqual([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]);
    });
  });

  describe("MONTHS", () => {
    it("should export 12 months", () => {
      expect(MONTHS).toHaveLength(12);
    });

    it("should start with January", () => {
      expect(MONTHS[0]).toBe("January");
    });

    it("should end with December", () => {
      expect(MONTHS[11]).toBe("December");
    });

    it("should have all month names", () => {
      expect(MONTHS).toEqual([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]);
    });
  });
});
