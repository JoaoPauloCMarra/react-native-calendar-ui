import { View, ViewProps, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

export function Card({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    boxShadow: `0 0 5px ${COLORS.shadow}`,
  },
});
