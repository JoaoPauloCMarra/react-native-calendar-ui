import { View, Text, StyleSheet, Platform } from "react-native";
import { packageVersion, isLeapYear } from "react-native-calendar-ui";
import { Card } from "./card";
import { COLORS } from "../utils/colors";

export function ModuleStatusCard() {
  const platformName = Platform.select({
    ios: "iOS",
    android: "Android",
    web: "Web",
    default: "Unknown",
  });

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Library Info</Text>
        <View style={styles.platformBadge}>
          <Text style={styles.platformBadgeText}>● {platformName}</Text>
        </View>
      </View>
      <View style={styles.grid}>
        <View style={styles.item}>
          <Text style={styles.label}>VERSION</Text>
          <Text style={styles.value}>{packageVersion}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>FEB 2024</Text>
          <Text style={styles.value}>{isLeapYear(2024) ? 29 : 28} days</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>LEAP YEAR</Text>
          <Text style={styles.value}>{isLeapYear(2024) ? "Yes ✓" : "No"}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  platformBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: COLORS.primary + "20",
  },
  platformBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  grid: {
    flexDirection: "row",
    gap: 16,
  },
  item: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
});
