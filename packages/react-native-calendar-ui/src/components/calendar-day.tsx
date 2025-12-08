import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import type { CalendarDay as CalendarDayType } from "../types/calendar";
import { COLORS, type ColorPalette } from "../styles/colors";
import { isWeekend } from "../utils/date-math";

export interface CalendarDayProps {
  /** Day data */
  day: CalendarDayType;
  /** Whether this day is selected */
  isSelected: boolean;
  /** Whether this day is today */
  isToday: boolean;
  /** Whether the day is disabled / not selectable */
  isDisabled?: boolean;
  /** Callback when day is pressed */
  onPress: (date: Date) => void;
  /** Whether this day has events */
  hasEvent?: boolean;
  /** Whether event markers should be shown */
  showEventIndicators?: boolean;
  /** Optional color overrides */
  colors?: Partial<ColorPalette>;

  style?: any;
  textStyle?: any;
  selectedStyle?: any;
  todayStyle?: any;
  eventIndicatorStyle?: any;
}

/**
 * Individual calendar day cell
 * Fully customizable via props
 */
export function CalendarDay({
  day,
  isSelected,
  isToday,
  isDisabled,
  showEventIndicators = true,
  colors,
  hasEvent,
  onPress,
  style,
  textStyle,
  selectedStyle,
  todayStyle,
  eventIndicatorStyle,
}: CalendarDayProps) {
  const date = new Date(day.timestamp);
  const weekend = isWeekend(date);
  const palette = colors ? ({ ...COLORS, ...colors } as ColorPalette) : COLORS;

  const handlePress = () => {
    if (isDisabled) return;
    onPress(date);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.container,
        style,
        isDisabled && styles.disabled,
        isToday &&
          !isSelected && [{ backgroundColor: palette.today }, todayStyle],
        isSelected && [{ backgroundColor: palette.selected }, selectedStyle],
        !isDisabled &&
          pressed && [{ backgroundColor: palette.pressed }, styles.pressed],
      ]}
    >
      {showEventIndicators &&
        hasEvent &&
        (isDisabled ? (
          <View
            style={[
              styles.eventIndicatorDisabled,
              { backgroundColor: palette.textMuted },
            ]}
          />
        ) : isSelected ? (
          <View
            style={[
              styles.eventIndicatorSelected,
              {
                borderColor: palette.selected,
                backgroundColor: palette.selectedText,
              },
            ]}
          />
        ) : (
          <View
            style={[
              styles.eventIndicator,
              { backgroundColor: palette.primary },
            ]}
          />
        ))}
      <View style={styles.inner}>
        <Text
          style={[
            styles.text,
            textStyle,
            !day.isCurrentMonth && styles.otherMonth,

            weekend &&
              day.isCurrentMonth &&
              !isSelected &&
              !isToday &&
              styles.weekend,
            isToday &&
              !isSelected && [{ color: palette.todayText }, styles.todayText],
            isSelected && [
              { color: palette.selectedText },
              styles.selectedText,
            ],
            isDisabled && [{ color: palette.textMuted }, styles.disabledText],
          ]}
        >
          {day.date}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: COLORS.pressed,
  },
  today: {
    backgroundColor: COLORS.today,
  },
  selected: {
    backgroundColor: COLORS.selected,
  },
  text: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: "center",
    textAlignVertical: "center",
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -9 }],
  },
  inner: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  todayText: {
    color: COLORS.todayText,
    fontWeight: "600",
  },
  selectedText: {
    color: COLORS.selectedText,
    fontWeight: "600",
  },
  otherMonth: {
    color: COLORS.otherMonth,
  },
  weekend: {
    color: COLORS.weekend,
  },
  disabled: {
    opacity: 0.45,
  },
  disabledText: {
    color: COLORS.textMuted,
  },
  eventIndicatorDisabled: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textMuted,
    left: "50%",
    bottom: 8,
    transform: [{ translateX: -3 }],
  },
  eventIndicator: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    left: "50%",
    bottom: 8,
    transform: [{ translateX: -3 }],
  },
  eventIndicatorSelected: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.selectedText,
    borderWidth: 2,
    borderColor: COLORS.selected,
    left: "50%",
    bottom: 7,
    transform: [{ translateX: -4 }],
  },
});
