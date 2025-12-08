import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { CalendarDay as CalendarDayType } from "../types/calendar";
import { CalendarDay } from "./calendar-day";
import { COLORS, type ColorPalette } from "../styles/colors";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface CalendarGridProps {
  /** Calendar days */
  days: CalendarDayType[];
  /** Currently selected date */
  selectedDate: Date | null;
  /** Callback when date is selected */
  onDateSelect: (date: Date) => void;
  /** Check if date is today */
  isToday: (date: Date) => boolean;
  /** Check if date is selected */
  isDateSelected: (date: Date) => boolean;
  /** Custom container style */
  style?: any;
  /** Custom day style */
  dayStyle?: any;
  /** Custom day text style */
  dayTextStyle?: any;
  /** Show day labels (Sun, Mon, etc.) */
  showDayLabels?: boolean;
  /** Custom day label style */
  dayLabelStyle?: any;
  /** Override weekday labels */
  dayLabels?: string[];
  /** Show/hide event markers inside days */
  showEventIndicators?: boolean;
  /** Optional color overrides */
  colors?: Partial<ColorPalette>;
  /** Dates with events (timestamps) */
  markedDates?: number[];
  /** Minimum selectable date (inclusive) */
  minDate?: number | string | Date;
  /** Maximum selectable date (inclusive) */
  maxDate?: number | string | Date;
  /** Exact dates to disable */
  disabledDates?: Array<number | string | Date>;
  /** Ranges of dates to disable */
  disabledDateRanges?: Array<{
    start: number | string | Date;
    end: number | string | Date;
  }>;
  /** Weekdays to disable (0 = Sunday..6 = Saturday) */
  disabledDaysOfWeek?: number[];
  /** Custom predicate — runs last and overrides other checks */
  isDateDisabled?: (date: Date) => boolean;
  /** Override month names (unused by grid but forwarded) */
  monthNames?: string[];
}

/**
 * Calendar grid with day labels and day cells
 * Fully customizable via props
 */
export function CalendarGrid({
  days,
  onDateSelect,
  isToday,
  isDateSelected,
  style,
  dayStyle,
  dayTextStyle,
  showDayLabels = true,
  dayLabelStyle,
  markedDates = [],
  dayLabels,
  showEventIndicators = true,
  colors,
  minDate,
  maxDate,
  disabledDates = [],
  disabledDateRanges = [],
  disabledDaysOfWeek = [],
  isDateDisabled,
}: CalendarGridProps) {
  const hasEvent = (timestamp: number) => {
    return markedDates.some((date) => {
      const d1 = new Date(timestamp);
      const d2 = new Date(date);
      return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
      );
    });
  };

  const toMidnight = (d: number | string | Date) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  };

  const disabledDatesTs = disabledDates.map(toMidnight);
  const disabledRangesTs = disabledDateRanges.map((r) => ({
    start: toMidnight(r.start),
    end: toMidnight(r.end),
  }));

  const minTs = minDate ? toMidnight(minDate) : undefined;
  const maxTs = maxDate ? toMidnight(maxDate) : undefined;

  const isDisabled = (timestamp: number) => {
    const ts = new Date(timestamp).setHours(0, 0, 0, 0);
    const date = new Date(ts);

    if (typeof isDateDisabled === "function") {
      if (isDateDisabled(date)) return true;
    }

    if (typeof minTs === "number" && ts < minTs) return true;
    if (typeof maxTs === "number" && ts > maxTs) return true;

    if (disabledDatesTs.includes(ts)) return true;

    for (const r of disabledRangesTs) {
      if (ts >= r.start && ts <= r.end) return true;
    }

    if (disabledDaysOfWeek.length > 0) {
      const dow = date.getDay();
      if (disabledDaysOfWeek.includes(dow)) return true;
    }

    return false;
  };

  const palette = colors ? ({ ...COLORS, ...colors } as ColorPalette) : COLORS;

  return (
    <View
      style={[styles.container, style, { backgroundColor: palette.background }]}
    >
      {showDayLabels && (
        <View style={[styles.dayLabels, { borderBottomColor: palette.border }]}>
          {(dayLabels ?? DAY_LABELS).map((label, i) => (
            <Text
              key={`${label}-${i}`}
              style={[
                styles.dayLabel,
                dayLabelStyle,
                { color: palette.textSecondary },
              ]}
            >
              {label}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.grid}>
        {days.map((day, index) => (
          <CalendarDay
            key={`${day.year}-${day.month}-${day.date}-${index}`}
            day={day}
            isSelected={isDateSelected(new Date(day.timestamp))}
            isToday={isToday(new Date(day.timestamp))}
            hasEvent={hasEvent(day.timestamp)}
            showEventIndicators={showEventIndicators}
            colors={colors}
            isDisabled={isDisabled(day.timestamp)}
            onPress={onDateSelect}
            style={dayStyle}
            textStyle={dayTextStyle}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  dayLabels: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dayLabel: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
  },
});
