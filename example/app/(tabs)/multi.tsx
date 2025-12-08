import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCalendarMulti, DAYS, MONTHS } from "react-native-calendar-ui";
import { COLORS } from "../../utils/colors";

export default function MultiScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const horizontalPadding = isWeb
    ? Math.max((screenWidth - MAX_WIDTH) / 2, 16)
    : 16;

  const {
    year,
    month,
    days,
    selectedDates,
    toggleDate,
    clearDates,
    isDateSelected,
    isToday,
    previousMonth,
    nextMonth,
    goToToday,
  } = useCalendarMulti({
    onDatesSelect: (dates) => {
      console.log("Selected dates:", dates);
    },
  });

  const formatDateShort = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.wrapper}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <View style={[styles.inner, { maxWidth: MAX_WIDTH, width: "100%" }]}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>🗓️ Multi-Date Selection</Text>
              <Text style={styles.subtitle}>
                Select multiple dates • Great for availability
              </Text>
            </View>

            <View style={styles.calendarCard}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={previousMonth}
                  style={styles.navButton}
                >
                  <Text style={styles.navButtonText}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                  <Text style={styles.monthText}>{MONTHS[month]}</Text>
                  <Text style={styles.yearText}>{year}</Text>
                </View>
                <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
                  <Text style={styles.navButtonText}>→</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.weekdays}>
                {DAYS.map((day) => (
                  <View key={day} style={styles.weekdayCell}>
                    <Text style={styles.weekdayText}>{day.slice(0, 3)}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.grid}>
                {days.map((day, index) => {
                  const date = new Date(day.year, day.month, day.date);
                  const selected = isDateSelected(date);
                  const today = isToday(date);

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dayCell,
                        !day.isCurrentMonth && styles.dayCellOutside,
                        selected && styles.dayCellSelected,
                        today && !selected && styles.dayCellToday,
                      ]}
                      onPress={() => toggleDate(date)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          !day.isCurrentMonth && styles.dayTextOutside,
                          selected && styles.dayTextSelected,
                          today && !selected && styles.dayTextToday,
                        ]}
                      >
                        {day.date}
                      </Text>
                      {selected && <View style={styles.selectedDot} />}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={goToToday}
                  style={styles.todayButton}
                >
                  <Text style={styles.todayButtonText}>Today</Text>
                </TouchableOpacity>
                {selectedDates.length > 0 && (
                  <TouchableOpacity
                    onPress={clearDates}
                    style={styles.clearButton}
                  >
                    <Text style={styles.clearButtonText}>Clear All</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>
                {selectedDates.length === 0 && "📍 Select Multiple Dates"}
                {selectedDates.length > 0 &&
                  `✅ ${selectedDates.length} Date${
                    selectedDates.length > 1 ? "s" : ""
                  } Selected`}
              </Text>
              {selectedDates.length > 0 ? (
                <View style={styles.selectedDatesContainer}>
                  <View style={styles.dateChips}>
                    {selectedDates
                      .sort((a, b) => a.getTime() - b.getTime())
                      .map((date, index) => (
                        <View key={index} style={styles.dateChip}>
                          <Text style={styles.dateChipText}>
                            {formatDateShort(date)}
                          </Text>
                        </View>
                      ))}
                  </View>
                </View>
              ) : (
                <Text style={styles.infoText}>
                  Tap dates to select or deselect them. Perfect for marking
                  availability, events, or any multi-day selection.
                </Text>
              )}
            </View>

            <View style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>✨ Features</Text>
              <View style={styles.featureList}>
                <Text style={styles.featureItem}>
                  • Toggle individual dates on/off
                </Text>
                <Text style={styles.featureItem}>
                  • Visual selection indicators
                </Text>
                <Text style={styles.featureItem}>
                  • Optional max selections limit
                </Text>
                <Text style={styles.featureItem}>
                  • Min/max date constraints
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const MAX_WIDTH = 420;

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  inner: {
    gap: 20,
    alignSelf: "center",
  },
  titleContainer: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  calendarCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      },
    }),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerCenter: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  yearText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "600",
  },
  weekdays: {
    flexDirection: "row",
    marginBottom: 12,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    textTransform: "uppercase",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 2,
    position: "relative",
  },
  dayCellOutside: {
    opacity: 0.3,
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
  },
  dayCellToday: {
    backgroundColor: COLORS.primary + "15",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  dayTextOutside: {
    color: COLORS.textDisabled,
  },
  dayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  dayTextToday: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  selectedDot: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
  },
  todayButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: COLORS.textSecondary + "20",
  },
  clearButtonText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  selectedDatesContainer: {
    gap: 12,
  },
  dateChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dateChip: {
    backgroundColor: COLORS.primary + "20",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  dateChipText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },
  featuresCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  featureList: {
    gap: 6,
  },
  featureItem: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
