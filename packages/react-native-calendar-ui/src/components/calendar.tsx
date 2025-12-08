import React from "react";
import { View, StyleSheet } from "react-native";
import { useCalendar, type UseCalendarOptions } from "../hooks/use-calendar";
import { CalendarHeader } from "./calendar-header";
import { CalendarGrid } from "./calendar-grid";
import { COLORS } from "../styles/colors";

import type { ColorPalette } from "../styles/colors";

export interface CalendarProps extends UseCalendarOptions {
  style?: any;
  headerStyle?: any;
  gridStyle?: any;
  dayStyle?: any;
  dayTextStyle?: any;
  showTodayButton?: boolean;
  showDayLabels?: boolean;
  separateHeader?: boolean;
  markedDates?: number[];
  showEventIndicators?: boolean;
  dayLabels?: string[];
  monthNames?: string[];
  todayLabel?: string;
  colors?: Partial<ColorPalette>;
  minDate?: number | string | Date;
  maxDate?: number | string | Date;
  disabledDates?: Array<number | string | Date>;
  disabledDateRanges?: Array<{
    start: number | string | Date;
    end: number | string | Date;
  }>;
  disabledDaysOfWeek?: number[];
  isDateDisabled?: (date: Date) => boolean;
}

export function Calendar({
  style,
  headerStyle,
  gridStyle,
  dayStyle,
  dayTextStyle,
  showTodayButton = true,
  showDayLabels = true,
  showEventIndicators = true,
  dayLabels,
  monthNames,
  todayLabel,
  colors,
  separateHeader = true,
  markedDates,
  minDate,
  maxDate,
  disabledDates,
  disabledDateRanges,
  disabledDaysOfWeek,
  isDateDisabled,
  ...calendarOptions
}: CalendarProps) {
  const calendar = useCalendar(calendarOptions);

  return (
    <View style={[styles.container, style]}>
      <CalendarHeader
        year={calendar.year}
        month={calendar.month}
        monthNames={monthNames}
        todayLabel={todayLabel}
        colors={colors}
        onPreviousMonth={calendar.previousMonth}
        onNextMonth={calendar.nextMonth}
        onToday={calendar.goToToday}
        showTodayButton={showTodayButton}
        style={[separateHeader && styles.headerSeparated, headerStyle]}
      />

      <CalendarGrid
        days={calendar.days}
        selectedDate={calendar.selectedDate}
        onDateSelect={calendar.selectDate}
        isToday={calendar.isToday}
        isDateSelected={calendar.isDateSelected}
        showDayLabels={showDayLabels}
        showEventIndicators={showEventIndicators}
        dayLabels={dayLabels}
        monthNames={monthNames}
        colors={colors}
        style={gridStyle}
        dayStyle={dayStyle}
        dayTextStyle={dayTextStyle}
        markedDates={markedDates}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        disabledDateRanges={disabledDateRanges}
        disabledDaysOfWeek={disabledDaysOfWeek}
        isDateDisabled={isDateDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: "hidden",
  },
  headerSeparated: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
});
