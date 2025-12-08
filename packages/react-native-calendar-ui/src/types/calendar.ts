export interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  timestamp: number;
}

export interface CalendarMonth {
  month: number;
  year: number;
  days: CalendarDay[];
}

export interface DateRange {
  start: Date;
  end: Date;
  dates: Date[];
}
