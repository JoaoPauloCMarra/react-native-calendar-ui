import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  addDays,
  addMonths,
  getDaysBetween,
  isWeekend,
  getWeekNumber,
  formatDate,
} from "react-native-calendar-ui";
import { COLORS } from "../utils/colors";
import { Card } from "./card";

export function AdvancedUtilitiesCard() {
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const nextMonth = addMonths(today, 1);
  const daysBetween = getDaysBetween(today, nextMonth);
  const weekend = isWeekend(today);
  const weekNum = getWeekNumber(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Advanced Utilities</Text>
      <Text style={styles.subtitle}>
        Using today's date: {formatDate(today, dateFormat, dateLocale)}
      </Text>

      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.label}>Tomorrow</Text>
          <Text style={styles.value}>
            {formatDate(tomorrow, dateFormat, dateLocale)}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Next Month</Text>
          <Text style={styles.value}>
            {formatDate(nextMonth, dateFormat, dateLocale)}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Days Until</Text>
          <Text style={styles.value}>{daysBetween} days</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Is Weekend?</Text>
          <Text style={styles.value}>{weekend ? "Yes ✓" : "No ✗"}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Week Number</Text>
          <Text style={styles.value}>Week {weekNum}</Text>
        </View>
      </View>
    </Card>
  );
}

const dateLocale = "en-US";
const dateFormat: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "2-digit",
};

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
  grid: {
    gap: 12,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
});
