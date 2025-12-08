import { useState, useMemo, useCallback } from "react";
import { getCalendarDays } from "../utils/calendar-grid";
import type { CalendarDay } from "../types/calendar";

export interface UseCalendarMultiOptions {
  initialYear?: number;
  initialMonth?: number;
  initialSelectedDates?: Date[];
  onDatesSelect?: (dates: Date[]) => void;
  onMonthChange?: (year: number, month: number) => void;
  minDate?: Date;
  maxDate?: Date;
  maxSelections?: number;
}

export interface UseCalendarMultiReturn {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedDates: Date[];
  toggleDate: (date: Date) => void;
  clearDates: () => void;
  isDateSelected: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  previousMonth: () => void;
  nextMonth: () => void;
  goToMonth: (year: number, month: number) => void;
  goToToday: () => void;
}

export function useCalendarMulti(
  options: UseCalendarMultiOptions = {}
): UseCalendarMultiReturn {
  const now = new Date();
  const {
    initialYear = now.getFullYear(),
    initialMonth = now.getMonth(),
    initialSelectedDates = [],
    onDatesSelect,
    onMonthChange,
    minDate,
    maxDate,
    maxSelections,
  } = options;

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDates, setSelectedDates] =
    useState<Date[]>(initialSelectedDates);

  const days = useMemo(() => getCalendarDays(year, month), [year, month]);

  const isSameDay = useCallback((date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);

  const isDateSelected = useCallback(
    (date: Date) => {
      return selectedDates.some((selected) => isSameDay(date, selected));
    },
    [selectedDates, isSameDay]
  );

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }, []);

  const toggleDate = useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;

      const isSelected = selectedDates.some((selected) =>
        isSameDay(date, selected)
      );

      let newDates: Date[];
      if (isSelected) {
        newDates = selectedDates.filter(
          (selected) => !isSameDay(date, selected)
        );
      } else {
        if (maxSelections && selectedDates.length >= maxSelections) {
          return;
        }
        newDates = [...selectedDates, date];
      }

      setSelectedDates(newDates);
      onDatesSelect?.(newDates);
    },
    [selectedDates, onDatesSelect, minDate, maxDate, maxSelections, isSameDay]
  );

  const clearDates = useCallback(() => {
    setSelectedDates([]);
    onDatesSelect?.([]);
  }, [onDatesSelect]);

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
    selectedDates,
    toggleDate,
    clearDates,
    isDateSelected,
    isToday,
    previousMonth,
    nextMonth,
    goToMonth,
    goToToday,
  };
}
