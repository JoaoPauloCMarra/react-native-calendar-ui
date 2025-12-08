import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MONTHS } from "../constants/months";
import { COLORS, type ColorPalette } from "../styles/colors";

export interface CalendarHeaderProps {
  /** Current year */
  year: number;
  /** Current month (0-11) */
  month: number;
  /** Navigate to previous month */
  onPreviousMonth: () => void;
  /** Navigate to next month */
  onNextMonth: () => void;
  /** Navigate to today */
  onToday?: () => void;
  /** Custom styles */
  style?: any;
  /** Custom text style */
  textStyle?: any;
  /** Custom button style */
  buttonStyle?: any;
  /** Show "Today" button */
  showTodayButton?: boolean;
  /** Override month names */
  monthNames?: string[];
  /** Override today label */
  todayLabel?: string;
  /** Optional color overrides */
  colors?: Partial<ColorPalette>;
}

/**
 * Calendar header with month/year display and navigation
 * Fully customizable via props
 */
export function CalendarHeader({
  year,
  month,
  onPreviousMonth,
  onNextMonth,
  onToday,
  style,
  textStyle,
  buttonStyle,
  showTodayButton = true,
  monthNames,
  todayLabel = "Today",
  colors,
}: CalendarHeaderProps) {
  const palette = colors ? ({ ...COLORS, ...colors } as ColorPalette) : COLORS;

  return (
    <View
      style={[styles.container, style, { backgroundColor: palette.background }]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Previous month"
        hitSlop={10}
        onPress={onPreviousMonth}
        style={({ pressed }) => [
          styles.button,
          buttonStyle,
          { borderColor: palette.border },
          pressed && [
            { backgroundColor: palette.pressed, borderColor: palette.pressed },
            styles.buttonPressed,
          ],
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            styles.chevron,
            textStyle,
            { color: palette.text },
          ]}
        >
          ❮
        </Text>
      </Pressable>

      <View style={styles.titleContainer}>
        <Text style={[styles.title, textStyle, { color: palette.text }]}>
          {(monthNames ?? MONTHS)[month]} {year}
        </Text>
        {showTodayButton && onToday && (
          <Pressable
            onPress={onToday}
            style={({ pressed }) => [
              styles.todayButton,
              pressed && [
                { backgroundColor: palette.pressed },
                styles.buttonPressed,
              ],
            ]}
          >
            <Text style={[styles.todayText, { color: palette.todayText }]}>
              {todayLabel}
            </Text>
          </Pressable>
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Next month"
        hitSlop={10}
        onPress={onNextMonth}
        style={({ pressed }) => [
          styles.button,
          buttonStyle,
          { borderColor: palette.border },
          pressed && [
            { backgroundColor: palette.pressed, borderColor: palette.pressed },
            styles.buttonPressed,
          ],
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            styles.chevron,
            textStyle,
            { color: palette.text },
          ]}
        >
          ❯
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  buttonPressed: {
    backgroundColor: COLORS.pressed,
    borderColor: COLORS.pressed,
  },
  buttonText: {
    fontSize: 22,
    color: COLORS.text,
    lineHeight: 28,
  },
  chevron: {
    fontWeight: "800",
    fontSize: 20,
    color: COLORS.text,
  },
  todayButton: {
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.today,
  },
  todayText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.todayText,
  },
});
