import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { CalendarTheme } from "../types/theme";
import { getLocalizedMonthName } from "../utils/locale";

export interface MonthPickerProps {
  currentMonth: number;
  currentYear: number;
  onMonthSelect: (month: number) => void;
  locale?: string;
  theme?: CalendarTheme;
}

export function MonthPicker({
  currentMonth,
  currentYear,
  onMonthSelect,
  locale,
  theme,
}: MonthPickerProps) {
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <View style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.grid}>
        {months.map((month) => {
          const isSelected = month === currentMonth;
          const monthName = getLocalizedMonthName(month, locale, true);

          return (
            <TouchableOpacity
              key={month}
              style={[
                styles.monthCell,
                isSelected && [
                  styles.selectedMonth,
                  { backgroundColor: theme?.selectedBackground },
                ],
              ]}
              onPress={() => onMonthSelect(month)}
              accessibilityLabel={`Month ${monthName}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.monthText,
                  { color: theme?.text },
                  isSelected && [
                    styles.selectedMonthText,
                    { color: theme?.selectedText },
                  ],
                ]}
              >
                {monthName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  monthCell: {
    width: "30%",
    aspectRatio: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 8,
  },
  selectedMonth: {
    backgroundColor: "#007AFF",
  },
  monthText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedMonthText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
