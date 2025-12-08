import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  useCalendarView,
  YearPicker,
  MonthPicker,
  Calendar,
} from "react-native-calendar-ui";
import { COLORS } from "../../utils/colors";

export default function ViewsScreen() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const { view, setView, goToMonthView, goToYearView } = useCalendarView({
    initialView: "month",
  });

  const handleYearSelect = (selectedYear: number) => {
    setYear(selectedYear);
    goToMonthView();
  };

  const handleMonthSelect = (selectedMonth: number) => {
    setMonth(selectedMonth);
    goToMonthView();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar Views</Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity
            style={[
              styles.viewButton,
              view === "month" && styles.viewButtonActive,
            ]}
            onPress={goToMonthView}
          >
            <Text
              style={[
                styles.viewButtonText,
                view === "month" && styles.viewButtonTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewButton,
              view === "year" && styles.viewButtonActive,
            ]}
            onPress={goToYearView}
          >
            <Text
              style={[
                styles.viewButtonText,
                view === "year" && styles.viewButtonTextActive,
              ]}
            >
              Year
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {view === "month" && (
          <View>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={goToYearView}
            >
              <Text style={styles.headerButtonText}>
                {new Date(year, month).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <Text style={styles.headerButtonIcon}>▼</Text>
            </TouchableOpacity>
            <Calendar
              initialYear={year}
              initialMonth={month}
              onDateSelect={(date) => console.log("Selected:", date)}
            />
          </View>
        )}

        {view === "year" && (
          <View>
            <Text style={styles.pickerTitle}>Select Month</Text>
            <MonthPicker
              currentMonth={month}
              currentYear={year}
              onMonthSelect={handleMonthSelect}
            />
            <Text style={styles.pickerTitle}>Select Year</Text>
            <YearPicker
              currentYear={year}
              onYearSelect={handleYearSelect}
              minYear={year - 50}
              maxYear={year + 50}
            />
          </View>
        )}
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
    marginBottom: 16,
  },
  viewButtons: {
    flexDirection: "row",
    gap: 12,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  viewButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
  viewButtonTextActive: {
    color: "#FFFFFF",
  },
  content: {
    padding: 16,
  },
  headerButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  headerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  headerButtonIcon: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 12,
    marginTop: 16,
  },
});
