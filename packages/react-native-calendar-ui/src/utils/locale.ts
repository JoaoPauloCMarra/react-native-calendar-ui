import type { LocaleConfig, WeekStartDay } from "../types/locale";
import { DEFAULT_LOCALE } from "../types/locale";

const localeCache = new Map<string, LocaleConfig>();

export function getLocaleConfig(locale?: string): LocaleConfig {
  const localeKey = locale || DEFAULT_LOCALE.locale!;

  if (localeCache.has(localeKey)) {
    return localeCache.get(localeKey)!;
  }

  const config: LocaleConfig = {
    locale: localeKey,
    firstDayOfWeek: DEFAULT_LOCALE.firstDayOfWeek,
    weekNumbering: DEFAULT_LOCALE.weekNumbering,
    direction: DEFAULT_LOCALE.direction,
  };

  const formatter = new Intl.DateTimeFormat(localeKey, { month: "long" });
  const monthNames: string[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1);
    monthNames.push(formatter.format(date));
  }
  config.monthNames = monthNames;

  const shortMonthFormatter = new Intl.DateTimeFormat(localeKey, {
    month: "short",
  });
  const monthNamesShort: string[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(2024, i, 1);
    monthNamesShort.push(shortMonthFormatter.format(date));
  }
  config.monthNamesShort = monthNamesShort;

  const dayFormatter = new Intl.DateTimeFormat(localeKey, {
    weekday: "long",
  });
  const dayNames: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(2024, 0, i);
    dayNames.push(dayFormatter.format(date));
  }
  config.dayNames = dayNames;

  const shortDayFormatter = new Intl.DateTimeFormat(localeKey, {
    weekday: "short",
  });
  const dayNamesShort: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(2024, 0, i);
    dayNamesShort.push(shortDayFormatter.format(date));
  }
  config.dayNamesShort = dayNamesShort;

  if (
    localeKey.startsWith("ar") ||
    localeKey.startsWith("he") ||
    localeKey.startsWith("fa")
  ) {
    config.direction = "rtl";
  }

  if (localeKey.startsWith("en-US") || localeKey.startsWith("en-CA")) {
    config.firstDayOfWeek = 0;
  } else {
    config.firstDayOfWeek = 1;
  }

  localeCache.set(localeKey, config);
  return config;
}

export function getLocalizedMonthName(
  month: number,
  locale?: string,
  short: boolean = false
): string {
  const config = getLocaleConfig(locale);
  const names = short ? config.monthNamesShort : config.monthNames;
  return (
    names?.[month] ||
    new Intl.DateTimeFormat(locale, { month: short ? "short" : "long" }).format(
      new Date(2024, month, 1)
    )
  );
}

export function getLocalizedDayName(
  day: number,
  locale?: string,
  short: boolean = false
): string {
  const config = getLocaleConfig(locale);
  const names = short ? config.dayNamesShort : config.dayNames;
  return (
    names?.[day] ||
    new Intl.DateTimeFormat(locale, {
      weekday: short ? "short" : "long",
    }).format(new Date(2024, 0, day))
  );
}

export function adjustDaysForWeekStart(
  days: string[],
  firstDayOfWeek: WeekStartDay
): string[] {
  if (firstDayOfWeek === 0) return days;
  return [...days.slice(firstDayOfWeek), ...days.slice(0, firstDayOfWeek)];
}

export function getISOWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
}
