export type ThemeMode = "light" | "dark" | "auto";

export interface CalendarTheme {
  mode?: ThemeMode;
  background?: string;
  text?: string;
  textSecondary?: string;
  textDisabled?: string;
  primary?: string;
  primaryText?: string;
  selectedBackground?: string;
  selectedText?: string;
  todayBackground?: string;
  todayText?: string;
  weekendText?: string;
  disabledBackground?: string;
  disabledText?: string;
  rangeBackground?: string;
  rangeText?: string;
  borderColor?: string;
  headerBackground?: string;
  headerText?: string;
  eventDot?: string;
}

export const LIGHT_THEME: CalendarTheme = {
  mode: "light",
  background: "#FFFFFF",
  text: "#000000",
  textSecondary: "#666666",
  textDisabled: "#CCCCCC",
  primary: "#007AFF",
  primaryText: "#FFFFFF",
  selectedBackground: "#007AFF",
  selectedText: "#FFFFFF",
  todayBackground: "#E3F2FD",
  todayText: "#007AFF",
  weekendText: "#666666",
  disabledBackground: "#F5F5F5",
  disabledText: "#CCCCCC",
  rangeBackground: "#E3F2FD",
  rangeText: "#000000",
  borderColor: "#E0E0E0",
  headerBackground: "#FFFFFF",
  headerText: "#000000",
  eventDot: "#007AFF",
};

export const DARK_THEME: CalendarTheme = {
  mode: "dark",
  background: "#1C1C1E",
  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  textDisabled: "#48484A",
  primary: "#0A84FF",
  primaryText: "#FFFFFF",
  selectedBackground: "#0A84FF",
  selectedText: "#FFFFFF",
  todayBackground: "#1C3A5E",
  todayText: "#0A84FF",
  weekendText: "#8E8E93",
  disabledBackground: "#2C2C2E",
  disabledText: "#48484A",
  rangeBackground: "#1C3A5E",
  rangeText: "#FFFFFF",
  borderColor: "#38383A",
  headerBackground: "#1C1C1E",
  headerText: "#FFFFFF",
  eventDot: "#0A84FF",
};
