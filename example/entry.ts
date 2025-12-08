import "expo-router/entry";
import { LogBox } from "react-native";

const isTest = process.env.NODE_ENV === "test";

if (isTest) {
  LogBox.ignoreAllLogs();
}
