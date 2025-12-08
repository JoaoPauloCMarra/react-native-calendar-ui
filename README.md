# react-native-calendar-ui v0.1.0

[![npm version](https://img.shields.io/npm/v/react-native-calendar-ui.svg)](https://www.npmjs.com/package/react-native-calendar-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74+-green.svg)](https://reactnative.dev/)
[![Test Coverage](https://img.shields.io/badge/coverage-75%25-brightgreen.svg)](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui)

**High-performance headless calendar UI library for React Native**

A lightweight, fully-tested calendar library that gives you complete control over your UI while providing powerful date utilities and React hooks.

---

## Features

- **Blazing Fast** — Pure JavaScript date utilities optimized for performance
- **Headless UI** — Complete control over styling and components
- **Cross-Platform** — iOS, Android, and Web support out of the box
- **Comprehensive** — Calendar grids, date ranges, arithmetic, and more
- **Date Range Selection** — Built-in support for selecting date ranges
- **Multi-Date Selection** — Select multiple individual dates with ease
- **Event Markers** — Display events with customizable dots and colors
- **Internationalization** — Full locale support with RTL, first day of week, and localized names
- **Dark Mode** — Built-in light/dark themes with auto-detection
- **DateTime Picker** — Integrated time selection with 12h/24h formats
- **Multiple Views** — Switch between day, month, year, and decade views
- **Quick Presets** — Common date range shortcuts (today, last 7 days, this month, etc.)
- **Recurring Dates** — Support for daily, weekly, monthly, and yearly patterns
- **Disabled Dates** — Flexible date validation with min/max dates and custom rules
- **Accessibility** — Screen reader support and focus management
- **Export/Import** — ICS and JSON format support
- **Infinite Scroll** — Load months dynamically for large date ranges
- **Swipe Gestures** — Natural mobile navigation with swipe support
- **TypeScript First** — Full type safety and IntelliSense support
- **Lightweight** — ~213KB unpacked, zero native dependencies
- **Tested** — Comprehensive test coverage (243+ tests passing)
- **Tree-Shakeable** — Import only what you need

---

## Requirements

- React Native **0.74+**
- React **18.0+**
- iOS **13.0+** / Android **API 24+** / Web

---

## Installation

```bash
npm install react-native-calendar-ui
# or
yarn add react-native-calendar-ui
# or
bun add react-native-calendar-ui
```

**That's it!** No native linking, no config plugins, no additional setup required.

### Updating Dependencies

To update all dependencies across the monorepo and ensure Expo compatibility:

```bash
bun run update
```

This will:

- Update all dependencies to their latest versions
- Run `expo install --fix` to ensure Expo compatibility
- Validate with `expo-doctor` to catch any issues

---

## Quick Start

### Option 1: Use Pre-built Components

```tsx
import { Calendar } from "react-native-calendar-ui";

export function App() {
  return (
    <Calendar
      onDateSelect={(date) => console.log("Selected:", date)}
      colors={{
        primary: "#007AFF",
        selectedText: "#FFFFFF",
      }}
    />
  );
}
```

### Option 2: Build Your Own with Headless Hook

Create a fully custom calendar in minutes using the `useCalendar` hook:

```tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCalendar, DAYS, MONTHS } from "react-native-calendar-ui";

export function MyCalendar() {
  const {
    year,
    month,
    days,
    selectedDate,
    selectDate,
    nextMonth,
    previousMonth,
    isToday,
    isDateSelected,
  } = useCalendar({
    onDateSelect: (date) => console.log("Selected:", date),
    onMonthChange: (year, month) => console.log("Month changed:", year, month),
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth}>
          <Text style={styles.navButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {MONTHS[month]} {year}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text style={styles.navButton}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday Labels */}
      <View style={styles.weekdays}>
        {DAYS.map((day) => (
          <Text key={day} style={styles.weekday}>
            {day.slice(0, 3)}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {days.map((day, index) => {
          const date = new Date(day.year, day.month, day.date);
          const selected = isDateSelected(date);
          const today = isToday(date);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                !day.isCurrentMonth && styles.dayOutside,
                selected && styles.daySelected,
              ]}
              onPress={() => selectDate(date)}
            >
              <Text
                style={[
                  styles.dayText,
                  !day.isCurrentMonth && styles.dayTextOutside,
                  selected && styles.dayTextSelected,
                  today && styles.dayTextToday,
                ]}
              >
                {day.date}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "bold" },
  navButton: { fontSize: 24, padding: 8 },
  weekdays: { flexDirection: "row", marginBottom: 8 },
  weekday: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    color: "#666",
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  day: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  dayOutside: { opacity: 0.3 },
  daySelected: { backgroundColor: "#007AFF" },
  dayText: { fontSize: 16 },
  dayTextOutside: { color: "#999" },
  dayTextSelected: { color: "#fff", fontWeight: "bold" },
  dayTextToday: { fontWeight: "bold", textDecorationLine: "underline" },
});
```

---

## API Reference

### Hooks

#### `useCalendar(options?)`

The main hook for calendar state management.

**Options:**

```tsx
interface UseCalendarOptions {
  initialYear?: number; // Default: current year
  initialMonth?: number; // Default: current month (0-11)
  initialSelectedDate?: Date; // Default: null
  onDateSelect?: (date: Date) => void;
  onMonthChange?: (year: number, month: number) => void;
}
```

**Returns:**

```tsx
interface UseCalendarReturn {
  year: number; // Current year
  month: number; // Current month (0-11)
  days: CalendarDay[]; // 42 days for calendar grid
  selectedDate: Date | null; // Currently selected date
  previousMonth: () => void; // Navigate to previous month
  nextMonth: () => void; // Navigate to next month
  goToMonth: (year: number, month: number) => void; // Jump to specific month
  goToToday: () => void; // Jump to today and select it
  selectDate: (date: Date) => void; // Select a date
  isDateSelected: (date: Date) => boolean; // Check if date is selected
  isToday: (date: Date) => boolean; // Check if date is today
}
```

---

#### `useCalendarRange(options?)`

Hook for date range selection (start and end dates).

**Options:**

```tsx
interface UseCalendarRangeOptions {
  initialYear?: number;
  initialMonth?: number;
  initialRange?: { start: Date; end: Date };
  onRangeSelect?: (range: { start: Date; end: Date }) => void;
  onMonthChange?: (year: number, month: number) => void;
  minDate?: Date; // Minimum selectable date
  maxDate?: Date; // Maximum selectable date
  minRangeDuration?: number; // Minimum days in range
  maxRangeDuration?: number; // Maximum days in range
}
```

**Returns:**

```tsx
interface UseCalendarRangeReturn {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedRange: { start: Date; end: Date } | null;
  selectDate: (date: Date) => void; // Select start or end date
  clearRange: () => void; // Clear the selected range
  isDateInRange: (date: Date) => boolean; // Check if date is in range
  isRangeStart: (date: Date) => boolean; // Check if date is range start
  isRangeEnd: (date: Date) => boolean; // Check if date is range end
  isToday: (date: Date) => boolean;
  previousMonth: () => void;
  nextMonth: () => void;
  goToMonth: (year: number, month: number) => void;
  goToToday: () => void;
  rangeSelectionMode: "start" | "end" | "complete"; // Current selection state
}
```

**Example:**

```tsx
import { useCalendarRange } from "react-native-calendar-ui";

const { selectedRange, selectDate, isDateInRange, isRangeStart, isRangeEnd } =
  useCalendarRange({
    onRangeSelect: (range) => {
      console.log(`${range.start} to ${range.end}`);
    },
    minRangeDuration: 1,
    maxRangeDuration: 30,
  });
```

---

#### `useCalendarMulti(options?)`

Hook for selecting multiple individual dates.

**Options:**

```tsx
interface UseCalendarMultiOptions {
  initialYear?: number;
  initialMonth?: number;
  initialSelectedDates?: Date[];
  onDatesSelect?: (dates: Date[]) => void;
  onMonthChange?: (year: number, month: number) => void;
  minDate?: Date;
  maxDate?: Date;
  maxSelections?: number; // Maximum number of dates that can be selected
}
```

**Returns:**

```tsx
interface UseCalendarMultiReturn {
  year: number;
  month: number;
  days: CalendarDay[];
  selectedDates: Date[]; // Array of selected dates
  toggleDate: (date: Date) => void; // Toggle date selection
  clearDates: () => void; // Clear all selections
  isDateSelected: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  previousMonth: () => void;
  nextMonth: () => void;
  goToMonth: (year: number, month: number) => void;
  goToToday: () => void;
}
```

**Example:**

```tsx
import { useCalendarMulti } from "react-native-calendar-ui";

const { selectedDates, toggleDate, clearDates } = useCalendarMulti({
  onDatesSelect: (dates) => {
    console.log(`${dates.length} dates selected`);
  },
  maxSelections: 10,
});
```

---

#### `useSwipeGesture(options?)`

Hook for adding swipe gesture navigation to calendars.

**Options:**

```tsx
interface UseSwipeGestureOptions {
  onSwipeLeft?: () => void; // Called on left swipe
  onSwipeRight?: () => void; // Called on right swipe
  minSwipeDistance?: number; // Minimum swipe distance (default: 50)
  maxVerticalMovement?: number; // Max vertical movement (default: 100)
}
```

**Returns:**

```tsx
interface UseSwipeGestureReturn {
  onTouchStart: (event: GestureResponderEvent) => void;
  onTouchEnd: (event: GestureResponderEvent) => void;
}
```

**Example:**

```tsx
import { useCalendar, useSwipeGesture } from "react-native-calendar-ui";

const { nextMonth, previousMonth } = useCalendar();
const swipeGesture = useSwipeGesture({
  onSwipeLeft: nextMonth,
  onSwipeRight: previousMonth,
});

return <View {...swipeGesture}>{/* Calendar content */}</View>;
```

---

#### `useCalendarAnimation(options?)`

Hook for adding smooth animations to calendar transitions.

**Options:**

```tsx
interface UseCalendarAnimationOptions {
  animationType?: "fade" | "slide" | "scale";
  duration?: number; // Animation duration in ms (default: 300)
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}
```

**Returns:**

```tsx
interface UseCalendarAnimationReturn {
  animatedStyle: any; // Animated style object to apply to calendar
  triggerAnimation: (direction: "left" | "right", callback: () => void) => void;
}
```

**Example:**

```tsx
import {
  useCalendar,
  useCalendarAnimation,
  useSwipeGesture,
} from "react-native-calendar-ui";
import { Animated } from "react-native";

const { nextMonth, previousMonth } = useCalendar();
const { animatedStyle, triggerAnimation } = useCalendarAnimation({
  animationType: "swipe",
  duration: 400,
});

const swipeGesture = useSwipeGesture({
  onSwipeLeft: () => triggerAnimation("left", nextMonth),
  onSwipeRight: () => triggerAnimation("right", previousMonth),
});

return (
  <View {...swipeGesture}>
    <Animated.View style={animatedStyle}>{/* Calendar grid */}</Animated.View>
  </View>
);
```

**Animation Types:**

- `fade` - Fade out and fade in
- `slide` - Slide in the direction of navigation
- `scale` - Scale down and up with fade

---

### 🗓️ Calendar Grid

#### `getCalendarDays(year, month)`

Generate a 42-day calendar grid (6 weeks) including previous and next month padding.

```tsx
import { getCalendarDays } from "react-native-calendar-ui";

const days = getCalendarDays(2024, 11); // December 2024 (0-indexed)

// Returns: CalendarDay[]
// {
//   date: 25,           // Day of month (1-31)
//   month: 11,          // Month (0-11)
//   year: 2024,         // Full year
//   isCurrentMonth: true,
//   timestamp: 1703462400000
// }
```

**Parameters:**

- `year` (number) — Full year (e.g., 2024)
- `month` (number) — Month (0-11, where 0 = January)

**Returns:** `CalendarDay[]` — Array of 42 day objects

---

#### `getCalendarMonths(startYear, startMonth, count)`

Generate multiple consecutive months for year views or infinite scroll.

```tsx
import { getCalendarMonths } from "react-native-calendar-ui";

const yearView = getCalendarMonths(2024, 0, 12); // All of 2024
```

**Parameters:**

- `startYear` (number) — Starting year
- `startMonth` (number) — Starting month (0-11)
- `count` (number) — Number of months to generate

**Returns:** `CalendarDay[][]` — Array of month grids

---

### Date Math

#### `addDays(date, days)`

Add or subtract days from a date.

```tsx
import { addDays } from "react-native-calendar-ui";

const tomorrow = addDays(new Date(), 1);
const yesterday = addDays(new Date(), -1);
```

---

#### `addMonths(date, months)`

Add or subtract months from a date.

```tsx
import { addMonths } from "react-native-calendar-ui";

const nextMonth = addMonths(new Date(), 1);
const lastYear = addMonths(new Date(), -12);
```

---

#### `addYears(date, years)`

Add or subtract years from a date.

```tsx
import { addYears } from "react-native-calendar-ui";

const nextYear = addYears(new Date(), 1);
```

---

#### `isLeapYear(year)`

Check if a year is a leap year.

```tsx
import { isLeapYear } from "react-native-calendar-ui";

isLeapYear(2024); // true
isLeapYear(2023); // false
```

---

#### `isWeekend(date)`

Check if a date falls on Saturday or Sunday.

```tsx
import { isWeekend } from "react-native-calendar-ui";

const saturday = new Date(2024, 0, 6);
isWeekend(saturday); // true
```

---

#### `getFirstDayOfWeek(date)`

Get the first day (Sunday) of the week containing the given date.

```tsx
import { getFirstDayOfWeek } from "react-native-calendar-ui";

const wednesday = new Date(2024, 0, 3);
const sunday = getFirstDayOfWeek(wednesday);
```

---

#### `getWeekNumber(year, month, day)`

Get the ISO week number for a date.

```tsx
import { getWeekNumber } from "react-native-calendar-ui";

const week = getWeekNumber(2024, 0, 15); // Week number for Jan 15, 2024
```

---

### 📏 Date Ranges

#### `getDaysBetween(startDate, endDate)`

Calculate the number of days between two dates.

```tsx
import { getDaysBetween } from "react-native-calendar-ui";

const start = new Date(2024, 0, 1);
const end = new Date(2024, 0, 31);
const days = getDaysBetween(start, end); // 30
```

---

#### `getDateRange(startDate, endDate)`

Get all dates between two dates (inclusive).

```tsx
import { getDateRange } from "react-native-calendar-ui";

const start = new Date(2024, 0, 1);
const end = new Date(2024, 0, 7);
const dates = getDateRange(start, end); // Array of 7 Date objects
```

---

### Formatting

#### `formatDate(date, options?, locale?)`

Format a date using Intl.DateTimeFormat.

```tsx
import { formatDate } from "react-native-calendar-ui";

formatDate(new Date(2024, 11, 25));
// "12/25/2024" (default)

formatDate(new Date(2024, 11, 25), {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
// "Wednesday, December 25, 2024"

formatDate(new Date(2024, 11, 25), { month: "long" }, "fr-FR");
// "décembre"
```

---

### 📊 Constants

#### `DAYS`

Array of weekday names.

```tsx
import { DAYS } from "react-native-calendar-ui";

console.log(DAYS);
// ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
```

---

#### `MONTHS`

Array of month names.

```tsx
import { MONTHS } from "react-native-calendar-ui";

console.log(MONTHS);
// ["January", "February", ..., "December"]
```

---

### Pre-built Components

#### `<Calendar />`

Full-featured calendar component with built-in styling.

```tsx
import { Calendar } from "react-native-calendar-ui";

<Calendar
  initialSelectedDate={new Date()}
  onDateSelect={(date) => console.log(date)}
  colors={{
    primary: "#007AFF",
    selectedText: "#FFFFFF",
  }}
/>;
```

**Props:**

```tsx
interface CalendarProps {
  initialSelectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  colors?: {
    primary?: string;
    selectedText?: string;
    // ... more color options
  };
}
```

---

#### `<CalendarHeader />`

Standalone header component with month/year navigation.

```tsx
import { CalendarHeader } from "react-native-calendar-ui";

<CalendarHeader
  month={11}
  year={2024}
  onPrevious={() => {}}
  onNext={() => {}}
/>;
```

---

#### `<CalendarGrid />`

Grid component for displaying calendar days.

```tsx
import { CalendarGrid } from "react-native-calendar-ui";

<CalendarGrid days={calendarDays} onDayPress={(day) => console.log(day)} />;
```

---

#### `<CalendarDay />`

Individual day cell component.

```tsx
import { CalendarDay } from "react-native-calendar-ui";

<CalendarDay
  day={25}
  isCurrentMonth={true}
  isSelected={false}
  onPress={() => {}}
/>;
```

---

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  CalendarDayData,
  CalendarMonth,
  DateRange,
  UseCalendarOptions,
  UseCalendarReturn,
  DayName,
  MonthName,
} from "react-native-calendar-ui";

interface CalendarDayData {
  date: number; // 1-31
  month: number; // 0-11
  year: number; // Full year
  isCurrentMonth: boolean;
  timestamp: number; // Unix timestamp (ms)
}
```

---

## 🌍 Cross-Platform

Works seamlessly on:

- ✅ iOS
- ✅ Android
- ✅ Web
- ✅ Expo (no config plugin needed!)

---

## ⚡ Performance

- **Pure JavaScript** — No native bridge overhead
- **Optimized Rendering** — Memoized by default with React hooks
- 📦 **Lightweight** — <25KB packed, ~130KB unpacked
- **Tree-Shakeable** — Import only what you need
- **100% Test Coverage** — Production-ready reliability

---

## 📱 Examples

Check out the [example app](./example) for:

- Basic calendar usage
- Headless custom UI
- Date utility showcases
- Performance demonstrations

---

## 🤝 Contributing

Contributions are welcome! Please check out our [GitHub repository](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui).

---

## 📄 License

MIT

---

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/react-native-calendar-ui)
- [GitHub Repository](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui)
- [Issue Tracker](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui/issues)

---

**Made with ❤️ for the React Native community**
