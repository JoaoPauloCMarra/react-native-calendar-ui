import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { CalendarTheme } from "../types/theme";

export interface YearPickerProps {
  currentYear: number;
  onYearSelect: (year: number) => void;
  minYear?: number;
  maxYear?: number;
  theme?: CalendarTheme;
}

export function YearPicker({
  currentYear,
  onYearSelect,
  minYear = currentYear - 50,
  maxYear = currentYear + 50,
  theme,
}: YearPickerProps) {
  const years: number[] = [];
  for (let year = minYear; year <= maxYear; year++) {
    years.push(year);
  }

  const currentYearIndex = years.indexOf(currentYear);
  const startIndex = Math.max(0, currentYearIndex - 6);
  const visibleYears = years.slice(startIndex, startIndex + 12);

  return (
    <View style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.grid}>
        {visibleYears.map((year) => {
          const isSelected = year === currentYear;
          return (
            <TouchableOpacity
              key={year}
              style={[
                styles.yearCell,
                isSelected && [
                  styles.selectedYear,
                  { backgroundColor: theme?.selectedBackground },
                ],
              ]}
              onPress={() => onYearSelect(year)}
              accessibilityLabel={`Year ${year}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.yearText,
                  { color: theme?.text },
                  isSelected && [
                    styles.selectedYearText,
                    { color: theme?.selectedText },
                  ],
                ]}
              >
                {year}
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
  yearCell: {
    width: "30%",
    aspectRatio: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 8,
  },
  selectedYear: {
    backgroundColor: "#007AFF",
  },
  yearText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selectedYearText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
