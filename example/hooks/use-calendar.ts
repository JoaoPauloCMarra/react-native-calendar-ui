import { useState, useMemo, useCallback } from "react";
import { getCalendarDays, type CalendarDayData as CalendarDay } from "react-native-calendar-ui";

export function useCalendar() {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);

  const calendarDays = useMemo(() => {
    const raw = getCalendarDays(currentYear, currentMonth);
    return raw.map((d) => ({
      ...d,
      fullDate: new Date(d.year, d.month, d.date),
      isSelected:
        selectedDate &&
        selectedDate.getFullYear() === d.year &&
        selectedDate.getMonth() === d.month &&
        selectedDate.getDate() === d.date,
    }));
  }, [currentMonth, currentYear, selectedDate]);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((m) => (m === 0 ? 11 : m - 1));
    setCurrentYear((y) => (currentMonth === 0 ? y - 1 : y));
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((m) => (m === 11 ? 0 : m + 1));
    setCurrentYear((y) => (currentMonth === 11 ? y + 1 : y));
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  }, [today]);

  const handleDayPress = useCallback((day: CalendarDay & { fullDate: Date }) => {
    setSelectedDate(day.fullDate);
    if (!day.isCurrentMonth) {
      setCurrentMonth(day.month);
      setCurrentYear(day.year);
    }
  }, []);

  return {
    currentMonth,
    currentYear,
    selectedDate,
    calendarDays,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    handleDayPress,
  };
}
