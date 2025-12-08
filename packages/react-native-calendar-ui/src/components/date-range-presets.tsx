import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import type { CalendarTheme } from "../types/theme";
import { DATE_PRESETS, getPresetValue } from "../utils/presets";

export interface DateRangePresetsProps {
  onPresetSelect: (range: { start: Date; end: Date }) => void;
  presets?: string[];
  theme?: CalendarTheme;
}

export function DateRangePresets({
  onPresetSelect,
  presets = [
    "today",
    "yesterday",
    "last7days",
    "last30days",
    "thisWeek",
    "thisMonth",
  ],
  theme,
}: DateRangePresetsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, { backgroundColor: theme?.background }]}
      contentContainerStyle={styles.content}
    >
      {presets.map((presetKey) => {
        const preset = DATE_PRESETS[presetKey];
        if (!preset) return null;

        return (
          <TouchableOpacity
            key={presetKey}
            style={[styles.presetButton, { borderColor: theme?.borderColor }]}
            onPress={() => {
              const value = getPresetValue(presetKey);
              if (value) onPresetSelect(value);
            }}
            accessibilityLabel={preset.label}
            accessibilityRole="button"
          >
            <Text style={[styles.presetText, { color: theme?.text }]}>
              {preset.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  presetText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
