import React from "react";
import { View, StyleSheet } from "react-native";
import type { CalendarEvent, EventMarkerStyle } from "../types/events";
import type { CalendarTheme } from "../types/theme";

export interface EventMarkersProps {
  events: CalendarEvent[];
  style?: EventMarkerStyle;
  theme?: CalendarTheme;
}

export function EventMarkers({ events, style, theme }: EventMarkersProps) {
  const maxVisible = style?.maxVisible || 3;
  const size = style?.size || 6;
  const position = style?.position || "bottom";

  const visibleEvents = events.slice(0, maxVisible);
  const hasMore = events.length > maxVisible;

  return (
    <View
      style={[
        styles.container,
        position === "top" && styles.top,
        position === "center" && styles.center,
      ]}
    >
      {visibleEvents.map((event, index) => (
        <View
          key={event.id || index}
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: event.color || theme?.eventDot || "#007AFF",
            },
          ]}
        />
      ))}
      {hasMore && (
        <View
          style={[
            styles.dot,
            styles.moreDot,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: theme?.textSecondary || "#666",
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    position: "absolute",
    bottom: 2,
    left: 0,
    right: 0,
  },
  top: {
    top: 2,
    bottom: undefined,
  },
  center: {
    top: "50%",
    bottom: undefined,
    transform: [{ translateY: -3 }],
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moreDot: {
    opacity: 0.5,
  },
});
