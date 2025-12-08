import { useState, useMemo, useCallback } from "react";
import { getCalendarDays } from "../utils/calendar-grid";
import { getDateRange } from "../utils/date-range";
import type { CalendarDay } from "../types/calendar";

export interface DateRange {
  start: Date;
  end: Date;
}

export interface UseCalendarRangeOptions {
  initialYear?: number;
  initialMonth?: number;
  initialRange?: DateRange;
  onRangeSelect?: (range: DateRange) => void;
  onMonthChange?: (year: number, month: number) => void;
  minDate?: Date;
  maxDate?: Date;
  minRangeDuration?: number;
  maxRangeDuration?: number;
}

export interface UseCalendarRangeReturn {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedRange: DateRange | null;
  selectDate: (date: Date) => void;
  setRange: (range: DateRange) => void;
  clearRange: () => void;
  isDateInRange: (date: Date) => boolean;
  isRangeStart: (date: Date) => boolean;
  isRangeEnd: (date: Date) => boolean;
  isTempStart: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  previousMonth: () => void;
  nextMonth: () => void;
  goToMonth: (year: number, month: number) => void;
  goToToday: () => void;
  rangeSelectionMode: "start" | "end" | "complete";
}

export function useCalendarRange(
  options: UseCalendarRangeOptions = {}
): UseCalendarRangeReturn {
  const now = new Date();
  const {
    initialYear = now.getFullYear(),
    initialMonth = now.getMonth(),
    initialRange = null,
    onRangeSelect,
    onMonthChange,
    minDate,
    maxDate,
    minRangeDuration,
    maxRangeDuration,
  } = options;

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedRange, setSelectedRange] = useState<DateRange | null>(
    initialRange
  );
  const [tempStart, setTempStart] = useState<Date | null>(null);

  const days = useMemo(() => getCalendarDays(year, month), [year, month]);

  const rangeSelectionMode = useMemo(() => {
    if (selectedRange) return "complete";
    if (tempStart) return "end";
    return "start";
  }, [selectedRange, tempStart]);

  const isSameDay = useCallback((date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);

  const isDateInRange = useCallback(
    (date: Date) => {
      if (!selectedRange) return false;
      const time = date.getTime();
      return (
        time >= selectedRange.start.getTime() &&
        time <= selectedRange.end.getTime()
      );
    },
    [selectedRange]
  );

  const isRangeStart = useCallback(
    (date: Date) => {
      if (!selectedRange) return false;
      return isSameDay(date, selectedRange.start);
    },
    [selectedRange, isSameDay]
  );

  const isRangeEnd = useCallback(
    (date: Date) => {
      if (!selectedRange) return false;
      return isSameDay(date, selectedRange.end);
    },
    [selectedRange, isSameDay]
  );

  const isTempStart = useCallback(
    (date: Date) => {
      if (!tempStart) return false;
      return isSameDay(date, tempStart);
    },
    [tempStart, isSameDay]
  );

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }, []);

  const selectDate = useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;

      if (!tempStart) {
        setTempStart(date);
        setSelectedRange(null);
      } else {
        const start = date < tempStart ? date : tempStart;
        const end = date < tempStart ? tempStart : date;

        const duration = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (minRangeDuration && duration < minRangeDuration) {
          setTempStart(date);
          return;
        }

        if (maxRangeDuration && duration > maxRangeDuration) {
          setTempStart(date);
          return;
        }

        const range = { start, end };
        setSelectedRange(range);
        setTempStart(null);
        onRangeSelect?.(range);
      }
    },
    [
      tempStart,
      onRangeSelect,
      minDate,
      maxDate,
      minRangeDuration,
      maxRangeDuration,
    ]
  );

  const setRange = useCallback(
    (range: DateRange) => {
      setSelectedRange(range);
      setTempStart(null);
      onRangeSelect?.(range);
    },
    [onRangeSelect]
  );

  const clearRange = useCallback(() => {
    setSelectedRange(null);
    setTempStart(null);
  }, []);

  const previousMonth = useCallback(() => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
      onMonthChange?.(year - 1, 11);
    } else {
      setMonth(month - 1);
      onMonthChange?.(year, month - 1);
    }
  }, [year, month, onMonthChange]);

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
      onMonthChange?.(year + 1, 0);
    } else {
      setMonth(month + 1);
      onMonthChange?.(year, month + 1);
    }
  }, [year, month, onMonthChange]);

  const goToMonth = useCallback(
    (newYear: number, newMonth: number) => {
      setYear(newYear);
      setMonth(newMonth);
      onMonthChange?.(newYear, newMonth);
    },
    [onMonthChange]
  );

  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    onMonthChange?.(today.getFullYear(), today.getMonth());
  }, [onMonthChange]);

  return {
    year,
    month,
    days,
    selectedRange,
    selectDate,
    setRange,
    clearRange,
    isDateInRange,
    isRangeStart,
    isRangeEnd,
    isTempStart,
    isToday,
    previousMonth,
    nextMonth,
    goToMonth,
    goToToday,
    rangeSelectionMode,
  };
}
