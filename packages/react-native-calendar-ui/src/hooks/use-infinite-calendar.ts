import { useState, useCallback, useMemo } from "react";
import { getCalendarMonths } from "../utils/calendar-grid";
import type { CalendarDay } from "../types/calendar";

export interface UseInfiniteCalendarOptions {
  initialYear?: number;
  initialMonth?: number;
  initialMonthsToLoad?: number;
  onMonthVisible?: (year: number, month: number) => void;
}

export interface UseInfiniteCalendarReturn {
  months: Array<{ year: number; month: number; days: CalendarDay[] }>;
  loadMoreMonths: (direction: "past" | "future", count?: number) => void;
  goToMonth: (year: number, month: number) => void;
  reset: () => void;
}

export function useInfiniteCalendar(
  options: UseInfiniteCalendarOptions = {}
): UseInfiniteCalendarReturn {
  const now = new Date();
  const {
    initialYear = now.getFullYear(),
    initialMonth = now.getMonth(),
    initialMonthsToLoad = 12,
    onMonthVisible,
  } = options;

  const [startYear, setStartYear] = useState(initialYear);
  const [startMonth, setStartMonth] = useState(initialMonth);
  const [monthCount, setMonthCount] = useState(initialMonthsToLoad);

  const months = useMemo(() => {
    const monthsData = getCalendarMonths(startYear, startMonth, monthCount);
    return monthsData.map((days, index) => {
      const monthOffset = startMonth + index;
      const year = startYear + Math.floor(monthOffset / 12);
      const month = monthOffset % 12;
      return { year, month, days };
    });
  }, [startYear, startMonth, monthCount]);

  const loadMoreMonths = useCallback(
    (direction: "past" | "future", count: number = 6) => {
      if (direction === "past") {
        const newStartMonth = startMonth - count;
        const yearOffset = Math.floor(newStartMonth / 12);
        setStartYear(startYear + yearOffset);
        setStartMonth(((newStartMonth % 12) + 12) % 12);
        setMonthCount(monthCount + count);
      } else {
        setMonthCount(monthCount + count);
      }
    },
    [startYear, startMonth, monthCount]
  );

  const goToMonth = useCallback(
    (year: number, month: number) => {
      setStartYear(year);
      setStartMonth(month);
      onMonthVisible?.(year, month);
    },
    [onMonthVisible]
  );

  const reset = useCallback(() => {
    setStartYear(initialYear);
    setStartMonth(initialMonth);
    setMonthCount(initialMonthsToLoad);
  }, [initialYear, initialMonth, initialMonthsToLoad]);

  return {
    months,
    loadMoreMonths,
    goToMonth,
    reset,
  };
}
