import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  useCalendarDateTime,
  TimePicker,
  Calendar,
} from "react-native-calendar-ui";
import { COLORS } from "../../utils/colors";

export default function DateTimeScreen() {
  const {
    selectedDate,
    selectedTime,
    selectedDateTime,
    selectDate,
    selectTime,
    timeFormat,
  } = useCalendarDateTime({
    timeFormat: "24h",
    minuteInterval: 15,
    showSeconds: false,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DateTime Picker</Text>
        {selectedDateTime && (
          <Text style={styles.selectedDateTime}>
            {selectedDateTime.toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <Calendar
          onDateSelect={selectDate}
          initialSelectedDate={selectedDate || undefined}
        />
      </View>

      {selectedDate && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <TimePicker
            value={selectedTime}
            onChange={selectTime}
            timeFormat={timeFormat}
            minuteInterval={15}
          />
        </View>
      )}

      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Selected Values:</Text>
        <Text style={styles.infoText}>
          Date: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
        </Text>
        <Text style={styles.infoText}>
          Time: {String(selectedTime.hours).padStart(2, "0")}:
          {String(selectedTime.minutes).padStart(2, "0")}
        </Text>
        <Text style={styles.infoText}>
          DateTime:{" "}
          {selectedDateTime ? selectedDateTime.toLocaleString() : "None"}
        </Text>
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
  selectedDateTime: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  infoPanel: {
    margin: 16,
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
});
