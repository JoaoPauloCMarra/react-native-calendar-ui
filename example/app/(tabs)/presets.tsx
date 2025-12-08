import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useCalendarRange, DateRangePresets } from "react-native-calendar-ui";
import { COLORS } from "../../utils/colors";

export default function PresetsScreen() {
  const {
    year,
    month,
    days,
    selectedRange,
    selectDate,
    setRange,
    isDateInRange,
    isRangeStart,
    isRangeEnd,
    previousMonth,
    nextMonth,
  } = useCalendarRange({
    onRangeSelect: (range) => {
      console.log("Range selected:", range);
    },
  });

  const handlePresetSelect = (range: { start: Date; end: Date }) => {
    setRange(range);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Date Range Presets</Text>
        {selectedRange && (
          <Text style={styles.selectedRange}>
            {selectedRange.start.toLocaleDateString()} -{" "}
            {selectedRange.end.toLocaleDateString()}
          </Text>
        )}
      </View>

      <View style={styles.presetsSection}>
        <Text style={styles.sectionTitle}>Quick Select</Text>
        <DateRangePresets onPresetSelect={handlePresetSelect} />
      </View>

      <View style={styles.calendarSection}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.monthYear}>
            {new Date(year, month).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
            <Text style={styles.navButtonText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weekdays}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text key={day} style={styles.weekday}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {days.map((day, index) => {
            const date = new Date(day.year, day.month, day.date);
            const inRange = isDateInRange(date);
            const rangeStart = isRangeStart(date);
            const rangeEnd = isRangeEnd(date);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.day,
                  !day.isCurrentMonth && styles.dayOutside,
                  inRange && styles.dayInRange,
                  (rangeStart || rangeEnd) && styles.dayRangeEdge,
                ]}
                onPress={() => selectDate(date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    !day.isCurrentMonth && styles.dayTextOutside,
                    inRange && styles.dayTextInRange,
                    (rangeStart || rangeEnd) && styles.dayTextRangeEdge,
                  ]}
                >
                  {day.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  selectedRange: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
  presetsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  calendarSection: {
    paddingHorizontal: 16,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    fontSize: 24,
    color: COLORS.text,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  weekdays: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  day: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  dayOutside: {
    opacity: 0.3,
  },
  dayInRange: {
    backgroundColor: COLORS.primaryLight,
  },
  dayRangeEdge: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: 16,
    color: COLORS.text,
  },
  dayTextOutside: {
    color: COLORS.textSecondary,
  },
  dayTextInRange: {
    color: COLORS.text,
  },
  dayTextRangeEdge: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
