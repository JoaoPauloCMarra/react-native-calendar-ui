import { renderHook, act } from "@testing-library/react";
import { useCalendar } from "../use-calendar";

describe("useCalendar Hook", () => {
  describe("Initialization", () => {
    it("should initialize with current date by default", () => {
      const now = new Date();
      const { result } = renderHook(() => useCalendar());

      expect(result.current.year).toBe(now.getFullYear());
      expect(result.current.month).toBe(now.getMonth());
      expect(result.current.selectedDate).toBeNull();
    });

    it("should initialize with custom year and month", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2023,
          initialMonth: 5,
        })
      );

      expect(result.current.year).toBe(2023);
      expect(result.current.month).toBe(5);
    });

    it("should initialize with selected date", () => {
      const initialDate = new Date(2024, 0, 15);
      const { result } = renderHook(() =>
        useCalendar({
          initialSelectedDate: initialDate,
        })
      );

      expect(result.current.selectedDate).toEqual(initialDate);
    });

    it("should generate 42 days for calendar grid", () => {
      const { result } = renderHook(() => useCalendar());
      expect(result.current.days).toHaveLength(42);
    });
  });

  describe("Month Navigation", () => {
    it("should navigate to next month", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 0,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(result.current.year).toBe(2024);
      expect(result.current.month).toBe(1);
    });

    it("should navigate to previous month", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 1,
        })
      );

      act(() => {
        result.current.previousMonth();
      });

      expect(result.current.year).toBe(2024);
      expect(result.current.month).toBe(0);
    });

    it("should handle year transition when going to next month from December", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 11,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(result.current.year).toBe(2025);
      expect(result.current.month).toBe(0);
    });

    it("should handle year transition when going to previous month from January", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 0,
        })
      );

      act(() => {
        result.current.previousMonth();
      });

      expect(result.current.year).toBe(2023);
      expect(result.current.month).toBe(11);
    });

    it("should call onMonthChange callback when navigating", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 0,
          onMonthChange,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(onMonthChange).toHaveBeenCalledWith(2024, 1);
    });
  });

  describe("goToMonth", () => {
    it("should navigate to specific month and year", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 0,
        })
      );

      act(() => {
        result.current.goToMonth(2025, 5);
      });

      expect(result.current.year).toBe(2025);
      expect(result.current.month).toBe(5);
    });

    it("should call onMonthChange callback", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 0,
          onMonthChange,
        })
      );

      act(() => {
        result.current.goToMonth(2025, 5);
      });

      expect(onMonthChange).toHaveBeenCalledWith(2025, 5);
    });
  });

  describe("goToToday", () => {
    it("should navigate to current month and select today", () => {
      const now = new Date();
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2020,
          initialMonth: 0,
        })
      );

      act(() => {
        result.current.goToToday();
      });

      expect(result.current.year).toBe(now.getFullYear());
      expect(result.current.month).toBe(now.getMonth());
      expect(result.current.selectedDate).toBeDefined();
      expect(result.current.selectedDate?.getDate()).toBe(now.getDate());
    });

    it("should call both onMonthChange and onDateSelect callbacks", () => {
      const onMonthChange = jest.fn();
      const onDateSelect = jest.fn();
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2020,
          initialMonth: 0,
          onMonthChange,
          onDateSelect,
        })
      );

      act(() => {
        result.current.goToToday();
      });

      expect(onMonthChange).toHaveBeenCalled();
      expect(onDateSelect).toHaveBeenCalled();
    });
  });

  describe("Date Selection", () => {
    it("should select a date", () => {
      const { result } = renderHook(() => useCalendar());
      const dateToSelect = new Date(2024, 0, 15);

      act(() => {
        result.current.selectDate(dateToSelect);
      });

      expect(result.current.selectedDate).toEqual(dateToSelect);
    });

    it("should call onDateSelect callback", () => {
      const onDateSelect = jest.fn();
      const { result } = renderHook(() =>
        useCalendar({
          onDateSelect,
        })
      );
      const dateToSelect = new Date(2024, 0, 15);

      act(() => {
        result.current.selectDate(dateToSelect);
      });

      expect(onDateSelect).toHaveBeenCalledWith(dateToSelect);
    });

    it("should update selected date when selecting different dates", () => {
      const { result } = renderHook(() => useCalendar());
      const firstDate = new Date(2024, 0, 15);
      const secondDate = new Date(2024, 0, 20);

      act(() => {
        result.current.selectDate(firstDate);
      });

      expect(result.current.selectedDate).toEqual(firstDate);

      act(() => {
        result.current.selectDate(secondDate);
      });

      expect(result.current.selectedDate).toEqual(secondDate);
    });
  });

  describe("isDateSelected", () => {
    it("should return true for selected date", () => {
      const { result } = renderHook(() => useCalendar());
      const dateToSelect = new Date(2024, 0, 15);

      act(() => {
        result.current.selectDate(dateToSelect);
      });

      expect(result.current.isDateSelected(dateToSelect)).toBe(true);
    });

    it("should return false for non-selected date", () => {
      const { result } = renderHook(() => useCalendar());
      const selectedDate = new Date(2024, 0, 15);
      const otherDate = new Date(2024, 0, 20);

      act(() => {
        result.current.selectDate(selectedDate);
      });

      expect(result.current.isDateSelected(otherDate)).toBe(false);
    });

    it("should return false when no date is selected", () => {
      const { result } = renderHook(() => useCalendar());
      const date = new Date(2024, 0, 15);

      expect(result.current.isDateSelected(date)).toBe(false);
    });

    it("should compare dates correctly ignoring time", () => {
      const { result } = renderHook(() => useCalendar());
      const selectedDate = new Date(2024, 0, 15, 10, 30, 0);
      const sameDate = new Date(2024, 0, 15, 15, 45, 30);

      act(() => {
        result.current.selectDate(selectedDate);
      });

      expect(result.current.isDateSelected(sameDate)).toBe(true);
    });
  });

  describe("isToday", () => {
    it("should return true for today's date", () => {
      const { result } = renderHook(() => useCalendar());
      const today = new Date();

      expect(result.current.isToday(today)).toBe(true);
    });

    it("should return false for past dates", () => {
      const { result } = renderHook(() => useCalendar());
      const pastDate = new Date(2020, 0, 1);

      expect(result.current.isToday(pastDate)).toBe(false);
    });

    it("should return false for future dates", () => {
      const { result } = renderHook(() => useCalendar());
      const futureDate = new Date(2030, 0, 1);

      expect(result.current.isToday(futureDate)).toBe(false);
    });

    it("should compare dates correctly ignoring time", () => {
      const { result } = renderHook(() => useCalendar());
      const today = new Date();
      const todayDifferentTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59
      );

      expect(result.current.isToday(todayDifferentTime)).toBe(true);
    });
  });

  describe("Days Generation", () => {
    it("should regenerate days when month changes", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 0,
        })
      );

      const initialDays = result.current.days;
      const firstDayOfMonth = initialDays.find((d) => d.isCurrentMonth);

      expect(firstDayOfMonth?.month).toBe(0);

      act(() => {
        result.current.nextMonth();
      });

      const newDays = result.current.days;
      const newFirstDayOfMonth = newDays.find((d) => d.isCurrentMonth);

      expect(newFirstDayOfMonth?.month).toBe(1);
      expect(newDays).not.toBe(initialDays);
    });

    it("should maintain 42 days after navigation", () => {
      const { result } = renderHook(() =>
        useCalendar({
          initialYear: 2024,
          initialMonth: 0,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(result.current.days).toHaveLength(42);

      act(() => {
        result.current.previousMonth();
      });

      expect(result.current.days).toHaveLength(42);
    });
  });

  describe("Callback Stability", () => {
    it("should maintain stable function references", () => {
      const { result, rerender } = renderHook(() => useCalendar());

      const initialFunctions = {
        previousMonth: result.current.previousMonth,
        nextMonth: result.current.nextMonth,
        goToMonth: result.current.goToMonth,
        goToToday: result.current.goToToday,
        selectDate: result.current.selectDate,
        isDateSelected: result.current.isDateSelected,
        isToday: result.current.isToday,
      };

      rerender();

      expect(result.current.previousMonth).toBe(initialFunctions.previousMonth);
      expect(result.current.nextMonth).toBe(initialFunctions.nextMonth);
      expect(result.current.goToMonth).toBe(initialFunctions.goToMonth);
      expect(result.current.goToToday).toBe(initialFunctions.goToToday);
      expect(result.current.selectDate).toBe(initialFunctions.selectDate);
      expect(result.current.isToday).toBe(initialFunctions.isToday);
    });
  });
});
