import { renderHook, act } from "@testing-library/react";
import { useCalendarRange } from "../use-calendar-range";

describe("useCalendarRange Hook", () => {
  describe("Initialization", () => {
    it("should initialize with current date by default", () => {
      const now = new Date();
      const { result } = renderHook(() => useCalendarRange());

      expect(result.current.year).toBe(now.getFullYear());
      expect(result.current.month).toBe(now.getMonth());
      expect(result.current.selectedRange).toBeNull();
      expect(result.current.rangeSelectionMode).toBe("start");
    });

    it("should initialize with custom year and month", () => {
      const { result } = renderHook(() =>
        useCalendarRange({
          initialYear: 2023,
          initialMonth: 5,
        })
      );

      expect(result.current.year).toBe(2023);
      expect(result.current.month).toBe(5);
    });

    it("should initialize with initial range", () => {
      const initialRange = {
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 15),
      };
      const { result } = renderHook(() =>
        useCalendarRange({
          initialRange,
        })
      );

      expect(result.current.selectedRange).toEqual(initialRange);
      expect(result.current.rangeSelectionMode).toBe("complete");
    });

    it("should generate 42 days for calendar grid", () => {
      const { result } = renderHook(() => useCalendarRange());
      expect(result.current.days).toHaveLength(42);
    });
  });

  describe("Range Selection", () => {
    it("should select start date on first tap", () => {
      const { result } = renderHook(() => useCalendarRange());
      const startDate = new Date(2024, 0, 10);

      act(() => {
        result.current.selectDate(startDate);
      });

      expect(result.current.selectedRange).toBeNull();
      expect(result.current.rangeSelectionMode).toBe("end");
    });

    it("should complete range on second tap", () => {
      const onRangeSelect = jest.fn();
      const { result } = renderHook(() => useCalendarRange({ onRangeSelect }));
      const startDate = new Date(2024, 0, 10);
      const endDate = new Date(2024, 0, 15);

      act(() => {
        result.current.selectDate(startDate);
      });

      act(() => {
        result.current.selectDate(endDate);
      });

      expect(result.current.selectedRange).toEqual({
        start: startDate,
        end: endDate,
      });
      expect(result.current.rangeSelectionMode).toBe("complete");
      expect(onRangeSelect).toHaveBeenCalledWith({
        start: startDate,
        end: endDate,
      });
    });

    it("should handle reverse selection (end before start)", () => {
      const { result } = renderHook(() => useCalendarRange());
      const laterDate = new Date(2024, 0, 15);
      const earlierDate = new Date(2024, 0, 10);

      act(() => {
        result.current.selectDate(laterDate);
      });

      act(() => {
        result.current.selectDate(earlierDate);
      });

      expect(result.current.selectedRange).toEqual({
        start: earlierDate,
        end: laterDate,
      });
    });

    it("should clear range", () => {
      const { result } = renderHook(() => useCalendarRange());
      const startDate = new Date(2024, 0, 10);
      const endDate = new Date(2024, 0, 15);

      act(() => {
        result.current.selectDate(startDate);
      });

      act(() => {
        result.current.selectDate(endDate);
      });

      act(() => {
        result.current.clearRange();
      });

      expect(result.current.selectedRange).toBeNull();
      expect(result.current.rangeSelectionMode).toBe("start");
    });
  });

  describe("Date Constraints", () => {
    it("should respect minDate constraint", () => {
      const minDate = new Date(2024, 0, 10);
      const { result } = renderHook(() => useCalendarRange({ minDate }));
      const beforeMinDate = new Date(2024, 0, 5);

      act(() => {
        result.current.selectDate(beforeMinDate);
      });

      expect(result.current.rangeSelectionMode).toBe("start");
    });

    it("should respect maxDate constraint", () => {
      const maxDate = new Date(2024, 0, 20);
      const { result } = renderHook(() => useCalendarRange({ maxDate }));
      const afterMaxDate = new Date(2024, 0, 25);

      act(() => {
        result.current.selectDate(afterMaxDate);
      });

      expect(result.current.rangeSelectionMode).toBe("start");
    });

    it("should respect minRangeDuration", () => {
      const { result } = renderHook(() =>
        useCalendarRange({ minRangeDuration: 3 })
      );
      const startDate = new Date(2024, 0, 10);
      const tooCloseDate = new Date(2024, 0, 11);

      act(() => {
        result.current.selectDate(startDate);
      });

      act(() => {
        result.current.selectDate(tooCloseDate);
      });

      expect(result.current.selectedRange).toBeNull();
      expect(result.current.rangeSelectionMode).toBe("end");
    });

    it("should respect maxRangeDuration", () => {
      const { result } = renderHook(() =>
        useCalendarRange({ maxRangeDuration: 7 })
      );
      const startDate = new Date(2024, 0, 10);
      const tooFarDate = new Date(2024, 0, 20);

      act(() => {
        result.current.selectDate(startDate);
      });

      act(() => {
        result.current.selectDate(tooFarDate);
      });

      expect(result.current.selectedRange).toBeNull();
      expect(result.current.rangeSelectionMode).toBe("end");
    });
  });

  describe("Range Checking", () => {
    it("should correctly identify dates in range", () => {
      const { result } = renderHook(() => useCalendarRange());
      const startDate = new Date(2024, 0, 10);
      const endDate = new Date(2024, 0, 15);
      const middleDate = new Date(2024, 0, 12);

      act(() => {
        result.current.selectDate(startDate);
      });

      act(() => {
        result.current.selectDate(endDate);
      });

      expect(result.current.isDateInRange(middleDate)).toBe(true);
      expect(result.current.isDateInRange(startDate)).toBe(true);
      expect(result.current.isDateInRange(endDate)).toBe(true);
    });

    it("should correctly identify range start", () => {
      const { result } = renderHook(() => useCalendarRange());
      const startDate = new Date(2024, 0, 10);
      const endDate = new Date(2024, 0, 15);

      act(() => {
        result.current.selectDate(startDate);
      });

      act(() => {
        result.current.selectDate(endDate);
      });

      expect(result.current.isRangeStart(startDate)).toBe(true);
      expect(result.current.isRangeStart(endDate)).toBe(false);
    });

    it("should correctly identify range end", () => {
      const { result } = renderHook(() => useCalendarRange());
      const startDate = new Date(2024, 0, 10);
      const endDate = new Date(2024, 0, 15);

      act(() => {
        result.current.selectDate(startDate);
      });

      act(() => {
        result.current.selectDate(endDate);
      });

      expect(result.current.isRangeEnd(endDate)).toBe(true);
      expect(result.current.isRangeEnd(startDate)).toBe(false);
    });
  });

  describe("Month Navigation", () => {
    it("should navigate to next month", () => {
      const { result } = renderHook(() =>
        useCalendarRange({
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
        useCalendarRange({
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
        useCalendarRange({
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
  });

  describe("isToday", () => {
    it("should return true for today's date", () => {
      const { result } = renderHook(() => useCalendarRange());
      const today = new Date();

      expect(result.current.isToday(today)).toBe(true);
    });

    it("should return false for other dates", () => {
      const { result } = renderHook(() => useCalendarRange());
      const pastDate = new Date(2020, 0, 1);

      expect(result.current.isToday(pastDate)).toBe(false);
    });
  });

  describe("Callbacks", () => {
    it("should call onMonthChange when navigating to previous year", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarRange({
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

    it("should call onMonthChange when navigating to next year", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarRange({
          initialYear: 2024,
          initialMonth: 11,
          onMonthChange,
        })
      );

      act(() => {
        result.current.nextMonth();
      });

      expect(onMonthChange).toHaveBeenCalledWith(2025, 0);
    });

    it("should call onMonthChange when using goToMonth", () => {
      const onMonthChange = jest.fn();
      const { result } = renderHook(() => useCalendarRange({ onMonthChange }));

      act(() => {
        result.current.goToMonth(2025, 6);
      });

      expect(onMonthChange).toHaveBeenCalledWith(2025, 6);
    });

    it("should call onMonthChange when using goToToday", () => {
      const now = new Date();
      const onMonthChange = jest.fn();
      const { result } = renderHook(() =>
        useCalendarRange({
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

    it("should call onRangeSelect when using setRange", () => {
      const onRangeSelect = jest.fn();
      const { result } = renderHook(() => useCalendarRange({ onRangeSelect }));

      const range = {
        start: new Date(2024, 0, 10),
        end: new Date(2024, 0, 15),
      };

      act(() => {
        result.current.setRange(range);
      });

      expect(onRangeSelect).toHaveBeenCalledWith(range);
      expect(result.current.selectedRange).toEqual(range);
    });
  });
});
