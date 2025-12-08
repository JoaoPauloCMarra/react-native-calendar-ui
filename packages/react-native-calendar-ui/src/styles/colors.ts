/**
 * Default color palette for calendar components
 * Users can override these by passing custom styles
 */

export const COLORS = {
  // Background colors
  background: "#FFFFFF",
  cardBackground: "#F9FAFB", // Gray 50
  primary: "#4F46E5", // Indigo 600

  // Text colors
  text: "#111827", // Gray 900
  textSecondary: "#6B7280", // Gray 500
  textMuted: "#9CA3AF", // Gray 400

  // Calendar colors
  today: "#EEF2FF", // Indigo 50
  todayText: "#4F46E5", // Indigo 600
  selected: "#4F46E5", // Indigo 600
  selectedText: "#FFFFFF",
  weekend: "#F43F5E", // Rose 500
  otherMonth: "#D1D5DB", // Gray 300

  // Border colors
  border: "#F3F4F6", // Gray 100

  // Interactive states
  hover: "#F3F4F6", // Gray 100
  pressed: "#E5E7EB", // Gray 200
};

export type ColorKey = keyof typeof COLORS;
export type ColorPalette = { [K in ColorKey]: string };
