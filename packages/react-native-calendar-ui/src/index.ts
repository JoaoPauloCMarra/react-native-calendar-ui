// Types
export type {
  CalendarDay as CalendarDayData,
  CalendarMonth,
  DateRange,
} from "./types/calendar";

export type { CalendarEvent, EventMarkerStyle } from "./types/events";

export type { LocaleConfig, WeekStartDay, WeekNumbering } from "./types/locale";
export { DEFAULT_LOCALE } from "./types/locale";

export type { CalendarTheme, ThemeMode } from "./types/theme";
export { LIGHT_THEME, DARK_THEME } from "./types/theme";

export type {
  RecurrencePattern,
  RecurrenceRule,
  RecurringDateOptions,
} from "./types/recurring";

// Date Math Utilities
export {
  addDays,
  addMonths,
  addYears,
  isWeekend,
  getFirstDayOfWeek,
  getWeekNumber,
  isLeapYear,
} from "./utils/date-math";

// Date Comparison Utilities
export {
  isSameDate,
  isDateBefore,
  isDateAfter,
  isDateBetween,
  normalizeDate,
  isValidDate,
} from "./utils/date-comparison";

// Calendar Grid Generation
export { getCalendarDays, getCalendarMonths } from "./utils/calendar-grid";

// Date Range Utilities
export { getDaysBetween, getDateRange } from "./utils/date-range";

// Date Formatters
export { formatDate } from "./utils/formatters";

// Event Utilities
export {
  getEventsForDate,
  hasEvents,
  groupEventsByDate,
  sortEvents,
} from "./utils/events";

// Locale Utilities
export {
  getLocaleConfig,
  getLocalizedMonthName,
  getLocalizedDayName,
  adjustDaysForWeekStart,
  getISOWeekNumber,
} from "./utils/locale";

// Recurring Date Utilities
export { getRecurringDates, isRecurringDate } from "./utils/recurring";

// Theme Utilities
export { getTheme, useSystemTheme } from "./utils/theme";

// Export Utilities
export { exportToICS, exportToJSON, importFromJSON } from "./utils/export";
export type { ExportOptions } from "./utils/export";

// Preset Utilities
export { DATE_PRESETS, getPresetValue } from "./utils/presets";
export type { DatePreset } from "./utils/presets";

// Hooks
export { useCalendar } from "./hooks/use-calendar";
export type {
  UseCalendarOptions,
  UseCalendarReturn,
} from "./hooks/use-calendar";

export { useCalendarEnhanced } from "./hooks/use-calendar-enhanced";
export type {
  UseCalendarEnhancedOptions,
  UseCalendarEnhancedReturn,
} from "./hooks/use-calendar-enhanced";

export { useCalendarRange } from "./hooks/use-calendar-range";
export type {
  UseCalendarRangeOptions,
  UseCalendarRangeReturn,
} from "./hooks/use-calendar-range";

export { useCalendarMulti } from "./hooks/use-calendar-multi";
export type {
  UseCalendarMultiOptions,
  UseCalendarMultiReturn,
} from "./hooks/use-calendar-multi";

export { useSwipeGesture } from "./hooks/use-swipe-gesture";
export type {
  UseSwipeGestureOptions,
  UseSwipeGestureReturn,
} from "./hooks/use-swipe-gesture";

export { useCalendarAnimation } from "./hooks/use-calendar-animation";
export type {
  UseCalendarAnimationOptions,
  UseCalendarAnimationReturn,
  AnimationType,
  AnimationDirection,
} from "./hooks/use-calendar-animation";

export { useCalendarView } from "./hooks/use-calendar-view";
export type {
  CalendarView,
  UseCalendarViewOptions,
  UseCalendarViewReturn,
} from "./hooks/use-calendar-view";

export { useCalendarDateTime } from "./hooks/use-calendar-datetime";
export type {
  UseCalendarDateTimeOptions,
  UseCalendarDateTimeReturn,
} from "./hooks/use-calendar-datetime";

export { useInfiniteCalendar } from "./hooks/use-infinite-calendar";
export type {
  UseInfiniteCalendarOptions,
  UseInfiniteCalendarReturn,
} from "./hooks/use-infinite-calendar";

export { useFocusManagement } from "./hooks/use-accessibility";
export type {
  UseFocusManagementOptions,
  UseFocusManagementReturn,
} from "./hooks/use-accessibility";

// Components
export { Calendar } from "./components/calendar";
export { CalendarHeader } from "./components/calendar-header";
export { CalendarGrid } from "./components/calendar-grid";
export { CalendarDay } from "./components/calendar-day";
export { YearPicker } from "./components/year-picker";
export { MonthPicker } from "./components/month-picker";
export { TimePicker } from "./components/time-picker";
export { EventMarkers } from "./components/event-markers";
export { DateRangePresets } from "./components/date-range-presets";

export type { CalendarProps } from "./components/calendar";
export type { CalendarHeaderProps } from "./components/calendar-header";
export type { CalendarGridProps } from "./components/calendar-grid";
export type { CalendarDayProps } from "./components/calendar-day";
export type { YearPickerProps } from "./components/year-picker";
export type { MonthPickerProps } from "./components/month-picker";
export type { TimePickerProps } from "./components/time-picker";
export type { EventMarkersProps } from "./components/event-markers";
export type { DateRangePresetsProps } from "./components/date-range-presets";

// Constants
export { DAYS } from "./constants/days";
export { MONTHS } from "./constants/months";
export type { DayName } from "./constants/days";
export type { MonthName } from "./constants/months";

// Styles
export { COLORS } from "./styles/colors";
export type { ColorKey, ColorPalette } from "./styles/colors";

// Package Info
export { packageVersion } from "./version";
