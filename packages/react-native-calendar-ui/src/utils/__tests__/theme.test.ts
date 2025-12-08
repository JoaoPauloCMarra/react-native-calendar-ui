import { Appearance } from "react-native";
import { getTheme, useSystemTheme } from "../theme";
import { LIGHT_THEME, DARK_THEME } from "../../types/theme";

// Mock react-native Appearance
jest.mock("react-native", () => ({
  Appearance: {
    getColorScheme: jest.fn(),
  },
}));

describe("Theme Utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getTheme", () => {
    it("should return light theme by default", () => {
      const theme = getTheme();

      expect(theme).toEqual(LIGHT_THEME);
      expect(theme.mode).toBe("light");
    });

    it("should return light theme when mode is light", () => {
      const theme = getTheme("light");

      expect(theme).toEqual(LIGHT_THEME);
      expect(theme.mode).toBe("light");
    });

    it("should return dark theme when mode is dark", () => {
      const theme = getTheme("dark");

      expect(theme).toEqual(DARK_THEME);
      expect(theme.mode).toBe("dark");
    });

    it("should return dark theme in auto mode when system is dark", () => {
      (Appearance.getColorScheme as jest.Mock).mockReturnValue("dark");

      const theme = getTheme("auto");

      expect(theme.mode).toBe("dark");
      expect(theme.background).toBe(DARK_THEME.background);
    });

    it("should return light theme in auto mode when system is light", () => {
      (Appearance.getColorScheme as jest.Mock).mockReturnValue("light");

      const theme = getTheme("auto");

      expect(theme.mode).toBe("light");
      expect(theme.background).toBe(LIGHT_THEME.background);
    });

    it("should return light theme in auto mode when system scheme is null", () => {
      (Appearance.getColorScheme as jest.Mock).mockReturnValue(null);

      const theme = getTheme("auto");

      expect(theme.mode).toBe("light");
      expect(theme.background).toBe(LIGHT_THEME.background);
    });

    it("should merge custom theme with base theme", () => {
      const customTheme = {
        primary: "#FF0000",
        selectedBackground: "#00FF00",
      };

      const theme = getTheme("light", customTheme);

      expect(theme.primary).toBe("#FF0000");
      expect(theme.selectedBackground).toBe("#00FF00");
      expect(theme.background).toBe(LIGHT_THEME.background);
      expect(theme.text).toBe(LIGHT_THEME.text);
    });

    it("should merge custom theme with dark theme", () => {
      const customTheme = {
        primary: "#FF0000",
      };

      const theme = getTheme("dark", customTheme);

      expect(theme.primary).toBe("#FF0000");
      expect(theme.background).toBe(DARK_THEME.background);
      expect(theme.text).toBe(DARK_THEME.text);
    });

    it("should override all properties when custom theme is provided", () => {
      const customTheme = {
        mode: "light" as const,
        background: "#CUSTOM",
        text: "#CUSTOM",
        textSecondary: "#CUSTOM",
        textDisabled: "#CUSTOM",
        primary: "#CUSTOM",
        primaryText: "#CUSTOM",
        selectedBackground: "#CUSTOM",
        selectedText: "#CUSTOM",
        todayBackground: "#CUSTOM",
        todayText: "#CUSTOM",
        weekendText: "#CUSTOM",
        disabledBackground: "#CUSTOM",
        disabledText: "#CUSTOM",
        rangeBackground: "#CUSTOM",
        rangeText: "#CUSTOM",
        borderColor: "#CUSTOM",
        headerBackground: "#CUSTOM",
        headerText: "#CUSTOM",
        eventDot: "#CUSTOM",
      };

      const theme = getTheme("light", customTheme);

      expect(theme.background).toBe("#CUSTOM");
      expect(theme.text).toBe("#CUSTOM");
      expect(theme.primary).toBe("#CUSTOM");
    });
  });

  describe("useSystemTheme", () => {
    it("should return dark when system color scheme is dark", () => {
      (Appearance.getColorScheme as jest.Mock).mockReturnValue("dark");

      const result = useSystemTheme();

      expect(result).toBe("dark");
    });

    it("should return light when system color scheme is light", () => {
      (Appearance.getColorScheme as jest.Mock).mockReturnValue("light");

      const result = useSystemTheme();

      expect(result).toBe("light");
    });

    it("should return light when system color scheme is null", () => {
      (Appearance.getColorScheme as jest.Mock).mockReturnValue(null);

      const result = useSystemTheme();

      expect(result).toBe("light");
    });

    it("should return light when system color scheme is undefined", () => {
      (Appearance.getColorScheme as jest.Mock).mockReturnValue(undefined);

      const result = useSystemTheme();

      expect(result).toBe("light");
    });
  });
});
