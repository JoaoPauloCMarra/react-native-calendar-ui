import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  useCalendarEnhanced,
  EventMarkers,
  LIGHT_THEME,
  DARK_THEME,
} from "react-native-calendar-ui";
import type { CalendarEvent } from "react-native-calendar-ui";
import { COLORS } from "../../utils/colors";

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    date: new Date(currentYear, currentMonth, 7),
    label: "Team Meeting",
    color: "#007AFF",
  },
  {
    id: "2",
    date: new Date(currentYear, currentMonth, 7),
    label: "Lunch with Client",
    color: "#34C759",
  },
  {
    id: "3",
    date: new Date(currentYear, currentMonth, 12),
    label: "Project Deadline",
    color: "#FF3B30",
  },
  {
    id: "4",
    date: new Date(currentYear, currentMonth, 15),
    label: "Conference Call",
    color: "#FF9500",
  },
  {
    id: "5",
    date: new Date(currentYear, currentMonth, 15),
    label: "Code Review",
    color: "#5856D6",
  },
  {
    id: "6",
    date: new Date(currentYear, currentMonth, 15),
    label: "Team Standup",
    color: "#AF52DE",
  },
  {
    id: "7",
    date: new Date(currentYear, currentMonth, 20),
    label: "Product Demo",
    color: "#FFD60A",
  },
  {
    id: "8",
    date: new Date(currentYear, currentMonth, 25),
    label: "Holiday Party",
    color: "#FF2D55",
  },
  {
    id: "9",
    date: new Date(currentYear, currentMonth, 28),
    label: "Year End Review",
    color: "#64D2FF",
  },
];

export default function EventsScreen() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [events] = useState<CalendarEvent[]>(sampleEvents);

  const {
    year,
    month,
    days,
    selectedDate,
    selectDate,
    isDateSelected,
    isToday,
    getEventsForDate,
    hasEvents: hasEventsForDate,
    theme,
    previousMonth,
    nextMonth,
  } = useCalendarEnhanced({
    initialYear: currentYear,
    initialMonth: currentMonth,
    events,
    themeMode,
  });

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Events Calendar
        </Text>
        <TouchableOpacity
          style={[styles.themeButton, { backgroundColor: theme.primary }]}
          onPress={() =>
            setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
          }
        >
          <Text style={[styles.themeButtonText, { color: theme.primaryText }]}>
            {themeMode === "light" ? "🌙 Dark" : "☀️ Light"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.calendarHeader,
          { backgroundColor: theme.headerBackground },
        ]}
      >
        <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
          <Text style={[styles.navButtonText, { color: theme.headerText }]}>
            ←
          </Text>
        </TouchableOpacity>
        <Text style={[styles.monthYear, { color: theme.headerText }]}>
          {new Date(year, month).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
          <Text style={[styles.navButtonText, { color: theme.headerText }]}>
            →
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text
            key={day}
            style={[styles.weekday, { color: theme.textSecondary }]}
          >
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {days.map((day, index) => {
          const date = new Date(day.year, day.month, day.date);
          const selected = isDateSelected(date);
          const today = isToday(date);
          const dayEvents = getEventsForDate(date);
          const hasEvents = hasEventsForDate(date);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                !day.isCurrentMonth && styles.dayOutside,
                selected && [
                  styles.daySelected,
                  { backgroundColor: theme.selectedBackground },
                ],
                today &&
                  !selected && [
                    styles.dayToday,
                    { backgroundColor: theme.todayBackground },
                  ],
              ]}
              onPress={() => selectDate(date)}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: theme.text },
                  !day.isCurrentMonth && { color: theme.textSecondary },
                  selected && { color: theme.selectedText },
                  today && !selected && { color: theme.todayText },
                ]}
              >
                {day.date}
              </Text>
              {hasEvents && (
                <EventMarkers
                  events={dayEvents}
                  theme={theme}
                  style={{ maxVisible: 3, size: 5, position: "bottom" }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {selectedDate && (
        <View
          style={[
            styles.eventsPanel,
            {
              backgroundColor: theme.headerBackground,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Text style={[styles.eventsPanelTitle, { color: theme.text }]}>
            Events on{" "}
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event, index) => (
              <View
                key={event.id || index}
                style={[
                  styles.eventItem,
                  { borderLeftColor: event.color || theme.primary },
                ]}
              >
                <View
                  style={[
                    styles.eventDot,
                    { backgroundColor: event.color || theme.primary },
                  ]}
                />
                <Text style={[styles.eventLabel, { color: theme.text }]}>
                  {event.label}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.noEvents, { color: theme.textSecondary }]}>
              No events
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  themeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    fontSize: 24,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "bold",
  },
  weekdays: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  day: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    position: "relative",
  },
  dayOutside: {
    opacity: 0.3,
  },
  daySelected: {
    backgroundColor: COLORS.primary,
  },
  dayToday: {
    backgroundColor: COLORS.primaryLight,
  },
  dayText: {
    fontSize: 16,
  },
  eventsPanel: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  eventsPanelTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 12,
    borderLeftWidth: 3,
    marginBottom: 8,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  eventLabel: {
    fontSize: 14,
  },
  noEvents: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
