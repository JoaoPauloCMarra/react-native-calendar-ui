import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendar-ui";
import { Card } from "./card";
import { COLORS } from "../utils/colors";

export function CalendarCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const markedDates = useMemo(
    () => [
      new Date(2025, 11, 10).getTime(),
      new Date(2025, 11, 15).getTime(),
      new Date(2025, 11, 20).getTime(),
      new Date(2025, 11, 25).getTime(),
    ],
    []
  );

  const disabledDates = useMemo(
    () => [
      new Date(2025, 11, 5),
      new Date(2025, 11, 12),
      new Date(2025, 11, 31),
    ],
    []
  );

  const dayLabels = useMemo(() => ["S", "M", "T", "W", "T", "F", "S"], []);

  const calendarColors = useMemo(
    () => ({
      primary: "#6B46C1",
      selected: "#6B46C1",
      selectedText: "#FFFFFF",
    }),
    []
  );

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Interactive Calendar</Text>
      <Text style={styles.subtitle}>
        Tap any date to select • Marked dates with indicators
      </Text>

      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={markedDates}
          initialSelectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          disabledDates={disabledDates}
          showEventIndicators={true}
          dayLabels={dayLabels}
          todayLabel={"Today"}
          colors={calendarColors}
        />
      </View>

      <Text style={styles.selectedText}>
        Selected: {selectedDate.toLocaleDateString()}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  calendarContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 8,
  },
  selectedText: {
    marginTop: 16,
    fontSize: 14,
    color: COLORS.text,
    textAlign: "center",
    fontWeight: "500",
  },
});
