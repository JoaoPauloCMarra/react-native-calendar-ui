import type { CalendarDay } from "../types/calendar";

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days: CalendarDay[] = [];

  if (startingDayOfWeek > 0) {
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonthLastDay = new Date(prevYear, prevMonth + 1, 0).getDate();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push({
        date: day,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        timestamp: new Date(prevYear, prevMonth, day).getTime(),
      });
    }
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: day,
      month,
      year,
      isCurrentMonth: true,
      timestamp: new Date(year, month, day).getTime(),
    });
  }

  const remainingDays = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      date: day,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      timestamp: new Date(nextYear, nextMonth, day).getTime(),
    });
  }

  return days;
}

export function getCalendarMonths(
  startYear: number,
  startMonth: number,
  count: number
): CalendarDay[][] {
  const months: CalendarDay[][] = [];
  let year = startYear;
  let month = startMonth;

  for (let i = 0; i < count; i++) {
    months.push(getCalendarDays(year, month));
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  return months;
}
