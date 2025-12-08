import type { CalendarTheme } from "../types/theme";
import { LIGHT_THEME, DARK_THEME } from "../types/theme";
import { Appearance } from "react-native";

export function getTheme(
  mode?: "light" | "dark" | "auto",
  customTheme?: Partial<CalendarTheme>
): CalendarTheme {
  let baseTheme: CalendarTheme;

  if (mode === "auto") {
    const colorScheme = Appearance.getColorScheme();
    baseTheme = colorScheme === "dark" ? DARK_THEME : LIGHT_THEME;
  } else if (mode === "dark") {
    baseTheme = DARK_THEME;
  } else {
    baseTheme = LIGHT_THEME;
  }

  return { ...baseTheme, ...customTheme };
}

export function useSystemTheme(): "light" | "dark" {
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}
