import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import type { CalendarTheme } from "../types/theme";

export interface TimePickerProps {
  value?: { hours: number; minutes: number; seconds?: number };
  onChange: (hours: number, minutes: number, seconds?: number) => void;
  timeFormat?: "12h" | "24h";
  minuteInterval?: number;
  showSeconds?: boolean;
  theme?: CalendarTheme;
}

export function TimePicker({
  value = { hours: 0, minutes: 0, seconds: 0 },
  onChange,
  timeFormat = "24h",
  minuteInterval = 1,
  showSeconds = false,
  theme,
}: TimePickerProps) {
  const [selectedHours, setSelectedHours] = useState(value.hours);
  const [selectedMinutes, setSelectedMinutes] = useState(value.minutes);
  const [selectedSeconds, setSelectedSeconds] = useState(value.seconds || 0);
  const [period, setPeriod] = useState<"AM" | "PM">(
    value.hours >= 12 ? "PM" : "AM"
  );

  const maxHours = timeFormat === "12h" ? 12 : 24;
  const hours = Array.from({ length: maxHours }, (_, i) =>
    timeFormat === "12h" ? i + 1 : i
  );
  const minutes = Array.from(
    { length: 60 / minuteInterval },
    (_, i) => i * minuteInterval
  );
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  const handleHourSelect = (hour: number) => {
    let actualHour = hour;
    if (timeFormat === "12h") {
      actualHour =
        period === "PM"
          ? hour === 12
            ? 12
            : hour + 12
          : hour === 12
          ? 0
          : hour;
    }
    setSelectedHours(actualHour);
    onChange(
      actualHour,
      selectedMinutes,
      showSeconds ? selectedSeconds : undefined
    );
  };

  const handleMinuteSelect = (minute: number) => {
    setSelectedMinutes(minute);
    onChange(selectedHours, minute, showSeconds ? selectedSeconds : undefined);
  };

  const handleSecondSelect = (second: number) => {
    setSelectedSeconds(second);
    onChange(selectedHours, selectedMinutes, second);
  };

  const handlePeriodToggle = () => {
    const newPeriod = period === "AM" ? "PM" : "AM";
    setPeriod(newPeriod);
    const newHours =
      newPeriod === "PM"
        ? selectedHours < 12
          ? selectedHours + 12
          : selectedHours
        : selectedHours >= 12
        ? selectedHours - 12
        : selectedHours;
    setSelectedHours(newHours);
    onChange(
      newHours,
      selectedMinutes,
      showSeconds ? selectedSeconds : undefined
    );
  };

  const displayHour =
    timeFormat === "12h"
      ? selectedHours === 0
        ? 12
        : selectedHours > 12
        ? selectedHours - 12
        : selectedHours
      : selectedHours;

  return (
    <View style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.pickers}>
        <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
          {hours.map((hour) => (
            <TouchableOpacity
              key={hour}
              style={[
                styles.timeCell,
                displayHour === hour && [
                  styles.selectedTime,
                  { backgroundColor: theme?.selectedBackground },
                ],
              ]}
              onPress={() => handleHourSelect(hour)}
            >
              <Text
                style={[
                  styles.timeText,
                  { color: theme?.text },
                  displayHour === hour && { color: theme?.selectedText },
                ]}
              >
                {String(hour).padStart(2, "0")}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={styles.column} showsVerticalScrollIndicator={false}>
          {minutes.map((minute) => (
            <TouchableOpacity
              key={minute}
              style={[
                styles.timeCell,
                selectedMinutes === minute && [
                  styles.selectedTime,
                  { backgroundColor: theme?.selectedBackground },
                ],
              ]}
              onPress={() => handleMinuteSelect(minute)}
            >
              <Text
                style={[
                  styles.timeText,
                  { color: theme?.text },
                  selectedMinutes === minute && { color: theme?.selectedText },
                ]}
              >
                {String(minute).padStart(2, "0")}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {showSeconds && (
          <ScrollView
            style={styles.column}
            showsVerticalScrollIndicator={false}
          >
            {seconds.map((second) => (
              <TouchableOpacity
                key={second}
                style={[
                  styles.timeCell,
                  selectedSeconds === second && [
                    styles.selectedTime,
                    { backgroundColor: theme?.selectedBackground },
                  ],
                ]}
                onPress={() => handleSecondSelect(second)}
              >
                <Text
                  style={[
                    styles.timeText,
                    { color: theme?.text },
                    selectedSeconds === second && {
                      color: theme?.selectedText,
                    },
                  ]}
                >
                  {String(second).padStart(2, "0")}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {timeFormat === "12h" && (
          <View style={styles.periodColumn}>
            <TouchableOpacity
              style={[
                styles.periodCell,
                period === "AM" && [
                  styles.selectedTime,
                  { backgroundColor: theme?.selectedBackground },
                ],
              ]}
              onPress={handlePeriodToggle}
            >
              <Text
                style={[
                  styles.timeText,
                  { color: theme?.text },
                  period === "AM" && { color: theme?.selectedText },
                ]}
              >
                AM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.periodCell,
                period === "PM" && [
                  styles.selectedTime,
                  { backgroundColor: theme?.selectedBackground },
                ],
              ]}
              onPress={handlePeriodToggle}
            >
              <Text
                style={[
                  styles.timeText,
                  { color: theme?.text },
                  period === "PM" && { color: theme?.selectedText },
                ]}
              >
                PM
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  pickers: {
    flexDirection: "row",
    justifyContent: "center",
    height: 200,
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  periodColumn: {
    width: 60,
    marginHorizontal: 4,
  },
  timeCell: {
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
  },
  periodCell: {
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 2,
    flex: 1,
  },
  selectedTime: {
    backgroundColor: "#007AFF",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
