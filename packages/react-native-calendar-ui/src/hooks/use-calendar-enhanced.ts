import { useState, useMemo, useCallback } from "react";
import type { CalendarEvent } from "../types/events";
import type { LocaleConfig } from "../types/locale";
import type { CalendarTheme } from "../types/theme";
import { getCalendarDays } from "../utils/calendar-grid";
import { getEventsForDate, hasEvents } from "../utils/events";
import { getTheme } from "../utils/theme";
import {
  isSameDate,
  isDateBefore,
  isDateAfter,
  normalizeDate,
} from "../utils/date-comparison";
import type { CalendarDay } from "../types/calendar";

export interface UseCalendarEnhancedOptions {
  initialYear?: number;
  initialMonth?: number;
  initialSelectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (year: number, month: number) => void;
  events?: CalendarEvent[];
  locale?: LocaleConfig;
  theme?: CalendarTheme;
  themeMode?: "light" | "dark" | "auto";
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDaysOfWeek?: number[];
  isDateDisabled?: (date: Date) => boolean;
  firstDayOfWeek?: number;
  showWeekNumbers?: boolean;
}

export interface UseCalendarEnhancedReturn {
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
  isDateDisabled: (date: Date) => boolean;
  getEventsForDate: (date: Date) => CalendarEvent[];
  hasEvents: (date: Date) => boolean;
  theme: CalendarTheme;
}

export function useCalendarEnhanced(
  options: UseCalendarEnhancedOptions = {}
): UseCalendarEnhancedReturn {
  const now = new Date();
  const {
    initialYear = now.getFullYear(),
    initialMonth = now.getMonth(),
    initialSelectedDate = null,
    onDateSelect,
    onMonthChange,
    events = [],
    themeMode = "light",
    minDate,
    maxDate,
    disabledDates = [],
    disabledDaysOfWeek = [],
    isDateDisabled: customIsDateDisabled,
    firstDayOfWeek = 0,
  } = options;

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate
  );

  const theme = useMemo(
    () => getTheme(themeMode, options.theme),
    [themeMode, options.theme]
  );

  const days = useMemo(() => {
    const calendarDays = getCalendarDays(year, month);
    if (firstDayOfWeek === 0) return calendarDays;

    const daysInWeek = 7;
    const reordered: CalendarDay[] = [];
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < daysInWeek; day++) {
        const sourceIndex =
          week * daysInWeek + ((day + (7 - firstDayOfWeek)) % daysInWeek);
        reordered.push(calendarDays[sourceIndex]);
      }
    }
    return reordered;
  }, [year, month, firstDayOfWeek]);

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

  const isDateDisabledCheck = useCallback(
    (date: Date) => {
      const normalized = normalizeDate(date);

      if (minDate && isDateBefore(normalized, normalizeDate(minDate))) {
        return true;
      }

      if (maxDate && isDateAfter(normalized, normalizeDate(maxDate))) {
        return true;
      }

      if (disabledDaysOfWeek.includes(date.getDay())) {
        return true;
      }

      if (disabledDates.some((d) => isSameDate(d, date))) {
        return true;
      }

      if (customIsDateDisabled && customIsDateDisabled(date)) {
        return true;
      }

      return false;
    },
    [minDate, maxDate, disabledDates, disabledDaysOfWeek, customIsDateDisabled]
  );

  const selectDate = useCallback(
    (date: Date) => {
      if (isDateDisabledCheck(date)) {
        return;
      }
      setSelectedDate(date);
      onDateSelect?.(date);
    },
    [onDateSelect, isDateDisabledCheck]
  );

  const isDateSelected = useCallback(
    (date: Date) => {
      if (!selectedDate) return false;
      return isSameDate(date, selectedDate);
    },
    [selectedDate]
  );

  const isToday = useCallback((date: Date) => {
    return isSameDate(date, new Date());
  }, []);

  const getEventsForDateCallback = useCallback(
    (date: Date) => {
      return getEventsForDate(events, date);
    },
    [events]
  );

  const hasEventsCallback = useCallback(
    (date: Date) => {
      return hasEvents(events, date);
    },
    [events]
  );

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
    isDateDisabled: isDateDisabledCheck,
    getEventsForDate: getEventsForDateCallback,
    hasEvents: hasEventsCallback,
    theme,
  };
}
