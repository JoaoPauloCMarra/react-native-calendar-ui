export type WeekStartDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeekNumbering = "ISO" | "US";

export interface LocaleConfig {
  locale?: string;
  firstDayOfWeek?: WeekStartDay;
  weekNumbering?: WeekNumbering;
  monthNames?: string[];
  monthNamesShort?: string[];
  dayNames?: string[];
  dayNamesShort?: string[];
  direction?: "ltr" | "rtl";
}

export const DEFAULT_LOCALE: LocaleConfig = {
  locale: "en-US",
  firstDayOfWeek: 0,
  weekNumbering: "US",
  direction: "ltr",
};
