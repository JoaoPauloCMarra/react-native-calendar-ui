import { getCalendarDays, getCalendarMonths } from "../calendar-grid";

describe("Calendar Grid Generation", () => {
  describe("getCalendarDays", () => {
    it("should return 42 days for a calendar grid", () => {
      const days = getCalendarDays(2024, 0);
      expect(days).toHaveLength(42);
    });

    it("should mark current month days correctly", () => {
      const days = getCalendarDays(2024, 0);
      const currentMonthDays = days.filter((d) => d.isCurrentMonth);
      expect(currentMonthDays).toHaveLength(31);
    });

    it("should include previous month padding", () => {
      const days = getCalendarDays(2024, 0);
      const firstDay = days[0];
      expect(firstDay.isCurrentMonth).toBe(false);
      expect(firstDay.month).toBe(11);
      expect(firstDay.year).toBe(2023);
    });

    it("should include next month padding", () => {
      const days = getCalendarDays(2024, 0);
      const lastDay = days[41];
      expect(lastDay.isCurrentMonth).toBe(false);
      expect(lastDay.month).toBe(1);
      expect(lastDay.year).toBe(2024);
    });

    it("should have correct day numbers for current month", () => {
      const days = getCalendarDays(2024, 0);
      const currentMonthDays = days.filter((d) => d.isCurrentMonth);

      expect(currentMonthDays[0].date).toBe(1);
      expect(currentMonthDays[30].date).toBe(31);
    });

    it("should handle February in leap year", () => {
      const days = getCalendarDays(2024, 1);
      const currentMonthDays = days.filter((d) => d.isCurrentMonth);
      expect(currentMonthDays).toHaveLength(29);
    });

    it("should handle February in non-leap year", () => {
      const days = getCalendarDays(2023, 1);
      const currentMonthDays = days.filter((d) => d.isCurrentMonth);
      expect(currentMonthDays).toHaveLength(28);
    });

    it("should include timestamps for all days", () => {
      const days = getCalendarDays(2024, 0);
      days.forEach((day) => {
        expect(day.timestamp).toBeDefined();
        expect(typeof day.timestamp).toBe("number");
        expect(day.timestamp).toBeGreaterThan(0);
      });
    });

    it("should have sequential timestamps", () => {
      const days = getCalendarDays(2024, 0);
      for (let i = 1; i < days.length; i++) {
        expect(days[i].timestamp).toBeGreaterThan(days[i - 1].timestamp);
      }
    });

    it("should handle year transitions correctly", () => {
      const days = getCalendarDays(2024, 0);
      const prevMonthDays = days.filter(
        (d) => !d.isCurrentMonth && d.month === 11
      );

      prevMonthDays.forEach((day) => {
        expect(day.year).toBe(2023);
      });
    });

    it("should handle December to January transition", () => {
      const days = getCalendarDays(2024, 11);
      const nextMonthDays = days.filter(
        (d) => !d.isCurrentMonth && d.month === 0
      );

      nextMonthDays.forEach((day) => {
        expect(day.year).toBe(2025);
      });
    });
  });

  describe("getCalendarMonths", () => {
    it("should generate correct number of months", () => {
      const months = getCalendarMonths(2024, 0, 3);
      expect(months).toHaveLength(3);
    });

    it("should generate 12 months for a full year", () => {
      const months = getCalendarMonths(2024, 0, 12);
      expect(months).toHaveLength(12);
    });

    it("should have 42 days in each month grid", () => {
      const months = getCalendarMonths(2024, 0, 3);
      months.forEach((month) => {
        expect(month).toHaveLength(42);
      });
    });

    it("should handle year transitions", () => {
      const months = getCalendarMonths(2024, 10, 4);
      expect(months).toHaveLength(4);

      const lastMonth = months[3];
      const firstDayOfLastMonth = lastMonth.find((d) => d.isCurrentMonth);
      expect(firstDayOfLastMonth?.year).toBe(2025);
      expect(firstDayOfLastMonth?.month).toBe(1);
    });

    it("should generate sequential months", () => {
      const months = getCalendarMonths(2024, 0, 6);

      for (let i = 0; i < months.length; i++) {
        const currentMonthDays = months[i].filter((d) => d.isCurrentMonth);
        const firstDay = currentMonthDays[0];
        expect(firstDay.month).toBe(i % 12);
      }
    });

    it("should handle single month request", () => {
      const months = getCalendarMonths(2024, 5, 1);
      expect(months).toHaveLength(1);
      expect(months[0]).toHaveLength(42);
    });

    it("should handle zero months request", () => {
      const months = getCalendarMonths(2024, 0, 0);
      expect(months).toHaveLength(0);
    });
  });
});
