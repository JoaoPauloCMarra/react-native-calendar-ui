import { useState, useMemo, useCallback } from "react";
import { getCalendarDays } from "../utils/calendar-grid";
import type { CalendarDay } from "../types/calendar";

export interface UseCalendarOptions {
  initialYear?: number;
  initialMonth?: number;
  initialSelectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (year: number, month: number) => void;
}

export interface UseCalendarReturn {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedDate: Date | null;
  previousMonth: () => void;
  nextMonth: () => void;
  goToMonth: (year: number, month: number) => void;
  goToToday: () => void;
  selectDate: (date: Date) => void;
  isDateSelected: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
}

export function useCalendar(
  options: UseCalendarOptions = {}
): UseCalendarReturn {
  const now = new Date();
  const {
    initialYear = now.getFullYear(),
    initialMonth = now.getMonth(),
    initialSelectedDate = null,
    onDateSelect,
    onMonthChange,
  } = options;

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate
  );

  const days = useMemo(() => getCalendarDays(year, month), [year, month]);

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
    setSelectedDate(today);
    onDateSelect?.(today);
  }, [onMonthChange, onDateSelect]);

  const selectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onDateSelect?.(date);
    },
    [onDateSelect]
  );

  const isDateSelected = useCallback(
    (date: Date) => {
      if (!selectedDate) return false;
      return (
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate()
      );
    },
    [selectedDate]
  );

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }, []);

  return {
    year,
    month,
    days,
    selectedDate,
    previousMonth,
    nextMonth,
    goToMonth,
    goToToday,
    selectDate,
    isDateSelected,
    isToday,
  };
}
