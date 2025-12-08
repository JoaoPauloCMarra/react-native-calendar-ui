import { renderHook, act } from "@testing-library/react";
import { useCalendarEnhanced } from "../use-calendar-enhanced";
import type { CalendarEvent } from "../../types/events";

describe("useCalendarEnhanced Hook", () => {
  describe("Initialization", () => {
    it("should initialize with current month and year by default", () => {
      const now = new Date();
      const { result } = renderHook(() => useCalendarEnhanced());

      expect(result.current.year).toBe(now.getFullYear());
      expect(result.current.month).toBe(now.getMonth());
      expect(result.current.selectedDate).toBeNull();
    });

    it("should initialize with custom year and month", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 5,
        })
      );

      expect(result.current.year).toBe(2023);
      expect(result.current.month).toBe(5);
    });

    it("should initialize with selected date", () => {
      const selectedDate = new Date(2023, 5, 15);
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialSelectedDate: selectedDate,
        })
      );

      expect(result.current.selectedDate).toEqual(selectedDate);
    });

    it("should return calendar days", () => {
      const { result } = renderHook(() => useCalendarEnhanced());

      expect(result.current.days).toBeDefined();
      expect(result.current.days.length).toBe(42); // 6 weeks * 7 days
    });
  });

  describe("Navigation", () => {
    it("should navigate to previous month", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 5,
        })
      );

      act(() => {
        result.current.previousMonth();
      });

      expect(result.current.year).toBe(2023);
      expect(result.current.month).toBe(4);
    });

    it("should navigate to previous year when going back from January", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 0,
        })
      );

      act(() => {
        result.current.previousMonth();
      });

      expect(result.current.year).toBe(2022);
      expect(result.current.month).toBe(11);
    });

    it("should navigate to next month", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 5,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(result.current.year).toBe(2023);
      expect(result.current.month).toBe(6);
    });

    it("should navigate to next year when going forward from December", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 11,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(result.current.year).toBe(2024);
      expect(result.current.month).toBe(0);
    });

    it("should go to specific month", () => {
      const { result } = renderHook(() => useCalendarEnhanced());

      act(() => {
        result.current.goToMonth(2025, 8);
      });

      expect(result.current.year).toBe(2025);
      expect(result.current.month).toBe(8);
    });

    it("should go to today", () => {
      const now = new Date();
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2020,
          initialMonth: 0,
        })
      );

      act(() => {
        result.current.goToToday();
      });

      expect(result.current.year).toBe(now.getFullYear());
      expect(result.current.month).toBe(now.getMonth());
      expect(result.current.selectedDate).toBeTruthy();
    });
  });

  describe("Date Selection", () => {
    it("should select a date", () => {
      const onDateSelect = jest.fn();
      const { result } = renderHook(() =>
        useCalendarEnhanced({ onDateSelect })
      );

      const date = new Date(2023, 5, 15);

      act(() => {
        result.current.selectDate(date);
      });

      expect(result.current.selectedDate).toEqual(date);
      expect(onDateSelect).toHaveBeenCalledWith(date);
    });

    it("should not select a disabled date", () => {
      const onDateSelect = jest.fn();
      const disabledDate = new Date(2023, 5, 15);
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          onDateSelect,
          disabledDates: [disabledDate],
        })
      );

      act(() => {
        result.current.selectDate(disabledDate);
      });

      expect(result.current.selectedDate).toBeNull();
      expect(onDateSelect).not.toHaveBeenCalled();
    });

    it("should check if date is selected", () => {
      const selectedDate = new Date(2023, 5, 15);
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialSelectedDate: selectedDate,
        })
      );

      expect(result.current.isDateSelected(selectedDate)).toBe(true);
      expect(result.current.isDateSelected(new Date(2023, 5, 16))).toBe(false);
    });

    it("should return false for isDateSelected when no date is selected", () => {
      const { result } = renderHook(() => useCalendarEnhanced());

      expect(result.current.isDateSelected(new Date())).toBe(false);
    });

    it("should check if date is today", () => {
      const { result } = renderHook(() => useCalendarEnhanced());
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      expect(result.current.isToday(today)).toBe(true);
      expect(result.current.isToday(tomorrow)).toBe(false);
    });
  });

  describe("Date Disabling", () => {
    it("should disable dates before minDate", () => {
      const minDate = new Date(2023, 5, 15);
      const { result } = renderHook(() => useCalendarEnhanced({ minDate }));

      expect(result.current.isDateDisabled(new Date(2023, 5, 14))).toBe(true);
      expect(result.current.isDateDisabled(new Date(2023, 5, 15))).toBe(false);
      expect(result.current.isDateDisabled(new Date(2023, 5, 16))).toBe(false);
    });

    it("should disable dates after maxDate", () => {
      const maxDate = new Date(2023, 5, 15);
      const { result } = renderHook(() => useCalendarEnhanced({ maxDate }));

      expect(result.current.isDateDisabled(new Date(2023, 5, 14))).toBe(false);
      expect(result.current.isDateDisabled(new Date(2023, 5, 15))).toBe(false);
      expect(result.current.isDateDisabled(new Date(2023, 5, 16))).toBe(true);
    });

    it("should disable specific days of week", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          disabledDaysOfWeek: [0, 6], // Sunday and Saturday
        })
      );

      const sunday = new Date(2023, 5, 4); // June 4, 2023 is Sunday
      const saturday = new Date(2023, 5, 10); // June 10, 2023 is Saturday
      const monday = new Date(2023, 5, 5); // June 5, 2023 is Monday

      expect(result.current.isDateDisabled(sunday)).toBe(true);
      expect(result.current.isDateDisabled(saturday)).toBe(true);
      expect(result.current.isDateDisabled(monday)).toBe(false);
    });

    it("should disable specific dates", () => {
      const disabledDate = new Date(2023, 5, 15);
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          disabledDates: [disabledDate],
        })
      );

      expect(result.current.isDateDisabled(disabledDate)).toBe(true);
      expect(result.current.isDateDisabled(new Date(2023, 5, 16))).toBe(false);
    });

    it("should use custom isDateDisabled function", () => {
      const customIsDateDisabled = (date: Date) => date.getDate() === 13;
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          isDateDisabled: customIsDateDisabled,
        })
      );

      expect(result.current.isDateDisabled(new Date(2023, 5, 13))).toBe(true);
      expect(result.current.isDateDisabled(new Date(2023, 5, 14))).toBe(false);
    });
  });

  describe("Events", () => {
    const events: CalendarEvent[] = [
      {
        id: "1",
        date: new Date(2023, 5, 15),
        label: "Event 1",
      },
      {
        id: "2",
        date: new Date(2023, 5, 15),
        label: "Event 2",
      },
      {
        id: "3",
        date: new Date(2023, 5, 16),
        label: "Event 3",
      },
    ];

    it("should get events for a specific date", () => {
      const { result } = renderHook(() => useCalendarEnhanced({ events }));

      const eventsForDate = result.current.getEventsForDate(
        new Date(2023, 5, 15)
      );

      expect(eventsForDate).toHaveLength(2);
      expect(eventsForDate[0].label).toBe("Event 1");
      expect(eventsForDate[1].label).toBe("Event 2");
    });

    it("should check if date has events", () => {
      const { result } = renderHook(() => useCalendarEnhanced({ events }));

      expect(result.current.hasEvents(new Date(2023, 5, 15))).toBe(true);
      expect(result.current.hasEvents(new Date(2023, 5, 16))).toBe(true);
      expect(result.current.hasEvents(new Date(2023, 5, 17))).toBe(false);
    });
  });

  describe("Theme", () => {
    it("should use light theme by default", () => {
      const { result } = renderHook(() => useCalendarEnhanced());

      expect(result.current.theme).toBeDefined();
      expect(result.current.theme.mode).toBe("light");
    });

    it("should use dark theme when specified", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({ themeMode: "dark" })
      );

      expect(result.current.theme.mode).toBe("dark");
    });

    it("should merge custom theme with base theme", () => {
      const customTheme = {
        primary: "#FF0000",
      };

      const { result } = renderHook(() =>
        useCalendarEnhanced({
          theme: customTheme,
        })
      );

      expect(result.current.theme.primary).toBe("#FF0000");
      expect(result.current.theme.background).toBeDefined();
    });
  });

  describe("First Day of Week", () => {
    it("should use Sunday as first day by default", () => {
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 5,
        })
      );

      const firstDay = result.current.days[0];
      const firstDate = new Date(firstDay.year, firstDay.month, firstDay.date);
      expect(firstDate.getDay()).toBe(0); // Sunday
    });

    it("should reorder days when firstDayOfWeek is set to Monday", () => {
      const { result: resultSunday } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 5,
          firstDayOfWeek: 0,
        })
      );

      const { result: resultMonday } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 5,
          firstDayOfWeek: 1,
        })
      );

      // The days should be reordered when firstDayOfWeek changes
      expect(resultSunday.current.days[0]).not.toEqual(
        resultMonday.current.days[0]
      );
    });
  });

  describe("Callbacks", () => {
    it("should call onMonthChange when navigating", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2023,
          initialMonth: 5,
          onMonthChange,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(onMonthChange).toHaveBeenCalledWith(2023, 6);
    });

    it("should call onMonthChange when going to specific month", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          onMonthChange,
        })
      );

      act(() => {
        result.current.goToMonth(2025, 8);
      });

      expect(onMonthChange).toHaveBeenCalledWith(2025, 8);
    });

    it("should call onMonthChange and onDateSelect when going to today", () => {
      const now = new Date();
      const onMonthChange = jest.fn();
      const onDateSelect = jest.fn();
      const { result } = renderHook(() =>
        useCalendarEnhanced({
          initialYear: 2020,
          initialMonth: 0,
          onMonthChange,
          onDateSelect,
        })
      );

      act(() => {
        result.current.goToToday();
      });

      expect(onMonthChange).toHaveBeenCalledWith(
        now.getFullYear(),
        now.getMonth()
      );
      expect(onDateSelect).toHaveBeenCalled();
    });
  });
});
