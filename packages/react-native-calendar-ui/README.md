# react-native-calendar-ui

[![npm version](https://img.shields.io/npm/v/react-native-calendar-ui.svg)](https://www.npmjs.com/package/react-native-calendar-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.74+-green.svg)](https://reactnative.dev/)

**⚡ High-performance headless calendar UI library for React Native**

The most flexible React Native calendar component library. Build beautiful, accessible calendars with powerful hooks and zero native dependencies. Works on iOS, Android, and Web out of the box.

## Why react-native-calendar-ui?

- 🎯 **Headless Architecture** — Full control over your UI with powerful React hooks
- ⚡ **Blazing Fast** — Pure JavaScript, no native bridge overhead
- 📱 **Cross-Platform** — iOS, Android, Web, and Expo support
- 🎨 **Pre-built Components** — Ready-to-use Calendar, CalendarGrid, CalendarHeader, and CalendarDay
- 📅 **Date Range Selection** — Built-in range picker with min/max constraints
- ✅ **Multi-Date Selection** — Select multiple individual dates
- 🎉 **Event Markers** — Display events with customizable dots and colors
- 🌍 **Internationalization** — Full i18n with locale, RTL, and first day of week support
- 🌙 **Dark Mode** — Built-in light/dark themes with system detection
- ⏰ **DateTime Picker** — Time selection with 12h/24h formats
- 📊 **Multiple Views** — Day, month, year, and decade views
- 🔄 **Recurring Dates** — Daily, weekly, monthly, yearly patterns
- ♿ **Accessibility** — Full screen reader and keyboard navigation support
- 🪶 **Lightweight** — ~36KB packed, zero native dependencies
- 🧪 **Well Tested** — 243+ tests with comprehensive coverage
- 📦 **Tree-Shakeable** — Import only what you need

## Installation

```bash
npm install react-native-calendar-ui
# or
yarn add react-native-calendar-ui
# or
bun add react-native-calendar-ui
```

**No native linking required!** Works instantly with Expo and bare React Native projects.

## Requirements

- React Native 0.74+
- React 18.0+
- iOS 13.0+ / Android API 24+ / Web

## Quick Start

### Pre-built Calendar Component

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

### Headless Hook (Full Customization)

```tsx
import { useCalendar, DAYS, MONTHS } from "react-native-calendar-ui";

export function CustomCalendar() {
  const {
    year,
    month,
    days,
    selectDate,
    nextMonth,
    previousMonth,
    isToday,
    isDateSelected,
  } = useCalendar({
    onDateSelect: (date) => console.log("Selected:", date),
  });

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={previousMonth}>
          <Text>←</Text>
        </TouchableOpacity>
        <Text>
          {MONTHS[month]} {year}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Text>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {days.map((day, index) => {
          const date = new Date(day.year, day.month, day.date);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => selectDate(date)}
              style={[
                styles.day,
                isDateSelected(date) && styles.selected,
                isToday(date) && styles.today,
              ]}
            >
              <Text>{day.date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
```

## Available Hooks

| Hook | Description |
|------|-------------|
| `useCalendar` | Core calendar state with single date selection |
| `useCalendarRange` | Date range selection (start/end dates) |
| `useCalendarMulti` | Multiple individual date selection |
| `useCalendarDateTime` | Date + time selection |
| `useCalendarView` | Switch between day/month/year/decade views |
| `useSwipeGesture` | Touch gesture navigation |
| `useCalendarAnimation` | Smooth transition animations |
| `useInfiniteCalendar` | Virtual scrolling for large date ranges |
| `useAccessibility` | Screen reader announcements |

## Available Components

| Component | Description |
|-----------|-------------|
| `Calendar` | Full-featured calendar with built-in styling |
| `CalendarHeader` | Month/year navigation header |
| `CalendarGrid` | 6-week day grid layout |
| `CalendarDay` | Individual day cell |
| `TimePicker` | Time selection component |
| `MonthPicker` | Month selection grid |
| `YearPicker` | Year selection grid |
| `DateRangePresets` | Quick range shortcuts (Today, Last 7 days, etc.) |
| `EventMarkers` | Event dot indicators |
| `SwipeContainer` | Gesture-enabled wrapper |

## Utility Functions

```tsx
import {
  getCalendarDays,
  addDays,
  addMonths,
  getDaysBetween,
  getDateRange,
  formatDate,
  isWeekend,
  isLeapYear,
  getWeekNumber,
} from "react-native-calendar-ui";

// Generate 42-day calendar grid
const days = getCalendarDays(2024, 11);

// Date arithmetic
const tomorrow = addDays(new Date(), 1);
const nextMonth = addMonths(new Date(), 1);

// Date ranges
const dayCount = getDaysBetween(startDate, endDate);
const allDates = getDateRange(startDate, endDate);

// Formatting with i18n
formatDate(date, { month: "long", year: "numeric" }, "fr-FR");
```

## Date Range Selection

```tsx
import { useCalendarRange } from "react-native-calendar-ui";

const { selectedRange, selectDate, isDateInRange, isRangeStart, isRangeEnd } =
  useCalendarRange({
    onRangeSelect: (range) => console.log(range.start, range.end),
    minRangeDuration: 1,
    maxRangeDuration: 30,
  });
```

## Multi-Date Selection

```tsx
import { useCalendarMulti } from "react-native-calendar-ui";

const { selectedDates, toggleDate, clearDates } = useCalendarMulti({
  onDatesSelect: (dates) => console.log(`${dates.length} dates selected`),
  maxSelections: 10,
});
```

## Swipe Gestures

```tsx
import { useCalendar, useSwipeGesture } from "react-native-calendar-ui";

const { nextMonth, previousMonth } = useCalendar();
const swipeHandlers = useSwipeGesture({
  onSwipeLeft: nextMonth,
  onSwipeRight: previousMonth,
});

return <View {...swipeHandlers}>{/* Calendar */}</View>;
```

## TypeScript Support

Full type definitions included:

```tsx
import type {
  CalendarDayData,
  DateRange,
  UseCalendarOptions,
  UseCalendarReturn,
  CalendarTheme,
} from "react-native-calendar-ui";
```

## Cross-Platform Support

| Platform | Status |
|----------|--------|
| iOS | ✅ Fully supported |
| Android | ✅ Fully supported |
| Web | ✅ Fully supported |
| Expo | ✅ No config plugin needed |

## Performance

- **Pure JavaScript** — No native bridge overhead
- **Memoized hooks** — Optimized re-renders
- **Tree-shakeable** — Only bundle what you use
- **~36KB** — Minimal bundle impact

## Examples

See the [example app](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui/tree/main/example) for complete usage examples including:

- Basic calendar
- Date range picker
- Multi-date selection
- Custom themed calendars
- Event calendars
- DateTime picker
- Swipe navigation
- Internationalization

## Contributing

Contributions welcome! Please see our [GitHub repository](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui).

## License

MIT © [Joao Paulo C Marra](https://github.com/JoaoPauloCMarra)

## Links

- [npm](https://www.npmjs.com/package/react-native-calendar-ui)
- [GitHub](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui)
- [Issues](https://github.com/JoaoPauloCMarra/react-native-nitro-calendar-ui/issues)

---

**Keywords:** react-native calendar, react native date picker, expo calendar, headless calendar, date range picker, multi date selection, calendar component, ios calendar, android calendar, cross-platform calendar, typescript calendar, react hooks calendar, mobile calendar ui
