// Mock react-native Appearance
jest.mock("react-native", () => ({
  Appearance: {
    getColorScheme: jest.fn(() => "light"),
  },
}));
