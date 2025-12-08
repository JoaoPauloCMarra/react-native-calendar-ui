import { Platform, ToastAndroid } from "react-native";

export const showToast = (message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    // For iOS and Web, checking if we can use something unobtrusive
    // For now, logging to console and maybe an alert if critical?
    // Let's stick to console to avoid annoying alerts during dev
    console.log("Toast:", message);
  }
};
