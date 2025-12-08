import { renderHook, act } from "@testing-library/react";
import { useCalendarMulti } from "../use-calendar-multi";

describe("useCalendarMulti Hook", () => {
  describe("Initialization", () => {
    it("should initialize with current date by default", () => {
      const now = new Date();
      const { result } = renderHook(() => useCalendarMulti());

      expect(result.current.year).toBe(now.getFullYear());
      expect(result.current.month).toBe(now.getMonth());
      expect(result.current.selectedDates).toEqual([]);
    });

    it("should initialize with custom year and month", () => {
      const { result } = renderHook(() =>
        useCalendarMulti({
          initialYear: 2023,
          initialMonth: 5,
        })
      );

      expect(result.current.year).toBe(2023);
      expect(result.current.month).toBe(5);
    });

    it("should initialize with initial selected dates", () => {
      const initialDates = [
        new Date(2024, 0, 10),
        new Date(2024, 0, 15),
        new Date(2024, 0, 20),
      ];
      const { result } = renderHook(() =>
        useCalendarMulti({
          initialSelectedDates: initialDates,
        })
      );

      expect(result.current.selectedDates).toEqual(initialDates);
    });

    it("should generate 42 days for calendar grid", () => {
      const { result } = renderHook(() => useCalendarMulti());
      expect(result.current.days).toHaveLength(42);
    });
  });

  describe("Date Selection", () => {
    it("should add date when toggling unselected date", () => {
      const onDatesSelect = jest.fn();
      const { result } = renderHook(() => useCalendarMulti({ onDatesSelect }));
      const date = new Date(2024, 0, 10);

      act(() => {
        result.current.toggleDate(date);
      });

      expect(result.current.selectedDates).toHaveLength(1);
      expect(result.current.isDateSelected(date)).toBe(true);
      expect(onDatesSelect).toHaveBeenCalledWith([date]);
    });

    it("should remove date when toggling selected date", () => {
      const { result } = renderHook(() => useCalendarMulti());
      const date = new Date(2024, 0, 10);

      act(() => {
        result.current.toggleDate(date);
      });

      expect(result.current.selectedDates).toHaveLength(1);

      act(() => {
        result.current.toggleDate(date);
      });

      expect(result.current.selectedDates).toHaveLength(0);
      expect(result.current.isDateSelected(date)).toBe(false);
    });

    it("should select multiple dates", () => {
      const { result } = renderHook(() => useCalendarMulti());
      const date1 = new Date(2024, 0, 10);
      const date2 = new Date(2024, 0, 15);
      const date3 = new Date(2024, 0, 20);

      act(() => {
        result.current.toggleDate(date1);
      });

      act(() => {
        result.current.toggleDate(date2);
      });

      act(() => {
        result.current.toggleDate(date3);
      });

      expect(result.current.selectedDates).toHaveLength(3);
      expect(result.current.isDateSelected(date1)).toBe(true);
      expect(result.current.isDateSelected(date2)).toBe(true);
      expect(result.current.isDateSelected(date3)).toBe(true);
    });

    it("should clear all selected dates", () => {
      const onDatesSelect = jest.fn();
      const { result } = renderHook(() => useCalendarMulti({ onDatesSelect }));
      const date1 = new Date(2024, 0, 10);
      const date2 = new Date(2024, 0, 15);

      act(() => {
        result.current.toggleDate(date1);
      });

      act(() => {
        result.current.toggleDate(date2);
      });

      expect(result.current.selectedDates).toHaveLength(2);

      act(() => {
        result.current.clearDates();
      });

      expect(result.current.selectedDates).toHaveLength(0);
      expect(onDatesSelect).toHaveBeenCalledWith([]);
    });
  });

  describe("Date Constraints", () => {
    it("should respect minDate constraint", () => {
      const minDate = new Date(2024, 0, 10);
      const { result } = renderHook(() => useCalendarMulti({ minDate }));
      const beforeMinDate = new Date(2024, 0, 5);

      act(() => {
        result.current.toggleDate(beforeMinDate);
      });

      expect(result.current.selectedDates).toHaveLength(0);
    });

    it("should respect maxDate constraint", () => {
      const maxDate = new Date(2024, 0, 20);
      const { result } = renderHook(() => useCalendarMulti({ maxDate }));
      const afterMaxDate = new Date(2024, 0, 25);

      act(() => {
        result.current.toggleDate(afterMaxDate);
      });

      expect(result.current.selectedDates).toHaveLength(0);
    });

    it("should respect maxSelections limit", () => {
      const { result } = renderHook(() =>
        useCalendarMulti({ maxSelections: 2 })
      );
      const date1 = new Date(2024, 0, 10);
      const date2 = new Date(2024, 0, 15);
      const date3 = new Date(2024, 0, 20);

      act(() => {
        result.current.toggleDate(date1);
      });

      act(() => {
        result.current.toggleDate(date2);
      });

      act(() => {
        result.current.toggleDate(date3);
      });

      expect(result.current.selectedDates).toHaveLength(2);
      expect(result.current.isDateSelected(date3)).toBe(false);
    });

    it("should allow deselecting when at max selections", () => {
      const { result } = renderHook(() =>
        useCalendarMulti({ maxSelections: 2 })
      );
      const date1 = new Date(2024, 0, 10);
      const date2 = new Date(2024, 0, 15);

      act(() => {
        result.current.toggleDate(date1);
      });

      act(() => {
        result.current.toggleDate(date2);
      });

      expect(result.current.selectedDates).toHaveLength(2);

      act(() => {
        result.current.toggleDate(date1);
      });

      expect(result.current.selectedDates).toHaveLength(1);
      expect(result.current.isDateSelected(date1)).toBe(false);
      expect(result.current.isDateSelected(date2)).toBe(true);
    });
  });

  describe("isDateSelected", () => {
    it("should return true for selected dates", () => {
      const { result } = renderHook(() => useCalendarMulti());
      const date = new Date(2024, 0, 10);

      act(() => {
        result.current.toggleDate(date);
      });

      expect(result.current.isDateSelected(date)).toBe(true);
    });

    it("should return false for non-selected dates", () => {
      const { result } = renderHook(() => useCalendarMulti());
      const selectedDate = new Date(2024, 0, 10);
      const otherDate = new Date(2024, 0, 15);

      act(() => {
        result.current.toggleDate(selectedDate);
      });

      expect(result.current.isDateSelected(otherDate)).toBe(false);
    });

    it("should compare dates correctly ignoring time", () => {
      const { result } = renderHook(() => useCalendarMulti());
      const date1 = new Date(2024, 0, 10, 10, 30, 0);
      const date2 = new Date(2024, 0, 10, 15, 45, 30);

      act(() => {
        result.current.toggleDate(date1);
      });

      expect(result.current.isDateSelected(date2)).toBe(true);
    });
  });

  describe("Month Navigation", () => {
    it("should navigate to next month", () => {
      const { result } = renderHook(() =>
        useCalendarMulti({
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
        useCalendarMulti({
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

    it("should handle year transition", () => {
      const { result } = renderHook(() =>
        useCalendarMulti({
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

    it("should preserve selected dates when navigating", () => {
      const { result } = renderHook(() =>
        useCalendarMulti({
          initialYear: 2024,
          initialMonth: 0,
        })
      );
      const date = new Date(2024, 0, 10);

      act(() => {
        result.current.toggleDate(date);
      });

      act(() => {
        result.current.nextMonth();
      });

      expect(result.current.selectedDates).toHaveLength(1);
      expect(result.current.isDateSelected(date)).toBe(true);
    });
  });

  describe("isToday", () => {
    it("should return true for today's date", () => {
      const { result } = renderHook(() => useCalendarMulti());
      const today = new Date();

      expect(result.current.isToday(today)).toBe(true);
    });

    it("should return false for other dates", () => {
      const { result } = renderHook(() => useCalendarMulti());
      const pastDate = new Date(2020, 0, 1);

      expect(result.current.isToday(pastDate)).toBe(false);
    });
  });

  describe("Callbacks", () => {
    it("should call onDatesSelect when dates change", () => {
      const onDatesSelect = jest.fn();
      const { result } = renderHook(() => useCalendarMulti({ onDatesSelect }));
      const date = new Date(2024, 0, 10);

      act(() => {
        result.current.toggleDate(date);
      });

      expect(onDatesSelect).toHaveBeenCalledWith([date]);
    });

    it("should call onMonthChange when navigating", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarMulti({
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

    it("should call onMonthChange when navigating to previous year", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarMulti({
          initialYear: 2024,
          initialMonth: 0,
          onMonthChange,
        })
      );

      act(() => {
        result.current.previousMonth();
      });

      expect(onMonthChange).toHaveBeenCalledWith(2023, 11);
    });

    it("should call onMonthChange when using goToMonth", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() => useCalendarMulti({ onMonthChange }));

      act(() => {
        result.current.goToMonth(2025, 6);
      });

      expect(onMonthChange).toHaveBeenCalledWith(2025, 6);
    });

    it("should call onMonthChange when using goToToday", () => {
      const now = new Date();
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarMulti({
          initialYear: 2020,
          initialMonth: 0,
          onMonthChange,
        })
      );

      act(() => {
        result.current.goToToday();
      });

      expect(onMonthChange).toHaveBeenCalledWith(
        now.getFullYear(),
        now.getMonth()
      );
    });
  });
});
