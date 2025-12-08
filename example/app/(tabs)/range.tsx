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
import { useCalendarRange, DAYS, MONTHS } from "react-native-calendar-ui";
import { COLORS } from "../../utils/colors";

export default function RangeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const horizontalPadding = isWeb
    ? Math.max((screenWidth - MAX_WIDTH) / 2, 16)
    : 16;

  const {
    year,
    month,
    days,
    selectedRange,
    selectDate,
    clearRange,
    isDateInRange,
    isRangeStart,
    isRangeEnd,
    isTempStart,
    isToday,
    previousMonth,
    nextMonth,
    goToToday,
    rangeSelectionMode,
  } = useCalendarRange({
    onRangeSelect: (range) => {
      console.log("Range selected:", range);
    },
  });

  const formatDateShort = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
              <Text style={styles.title}>📅 Date Range Selection</Text>
              <Text style={styles.subtitle}>
                Select start and end dates • Perfect for bookings
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
                  const inRange = isDateInRange(date);
                  const rangeStart = isRangeStart(date);
                  const rangeEnd = isRangeEnd(date);
                  const tempStart = isTempStart(date);
                  const today = isToday(date);

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dayCell,
                        !day.isCurrentMonth && styles.dayCellOutside,
                        inRange && styles.dayCellInRange,
                        (rangeStart || rangeEnd) && styles.dayCellRangeEdge,
                        tempStart && styles.dayCellTempStart,
                        today && !inRange && !tempStart && styles.dayCellToday,
                      ]}
                      onPress={() => selectDate(date)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          !day.isCurrentMonth && styles.dayTextOutside,
                          inRange && styles.dayTextInRange,
                          (rangeStart || rangeEnd) && styles.dayTextRangeEdge,
                          tempStart && styles.dayTextTempStart,
                          today &&
                            !inRange &&
                            !tempStart &&
                            styles.dayTextToday,
                        ]}
                      >
                        {day.date}
                      </Text>
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
                {selectedRange && (
                  <TouchableOpacity
                    onPress={clearRange}
                    style={styles.clearButton}
                  >
                    <Text style={styles.clearButtonText}>Clear</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>
                {rangeSelectionMode === "start" && "📍 Select Start Date"}
                {rangeSelectionMode === "end" && "📍 Select End Date"}
                {rangeSelectionMode === "complete" && "✅ Range Selected"}
              </Text>
              {selectedRange ? (
                <View style={styles.rangeInfo}>
                  <Text style={styles.rangeText}>
                    <Text style={styles.rangeLabel}>Start: </Text>
                    {formatDateShort(selectedRange.start)}
                  </Text>
                  <Text style={styles.rangeText}>
                    <Text style={styles.rangeLabel}>End: </Text>
                    {formatDateShort(selectedRange.end)}
                  </Text>
                  <Text style={styles.rangeDuration}>
                    {Math.ceil(
                      (selectedRange.end.getTime() -
                        selectedRange.start.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) + 1}{" "}
                    days selected
                  </Text>
                </View>
              ) : (
                <Text style={styles.infoText}>
                  Tap a date to select the start of your range, then tap another
                  date to complete the selection.
                </Text>
              )}
            </View>

            <View style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>✨ Features</Text>
              <View style={styles.featureList}>
                <Text style={styles.featureItem}>
                  • Intuitive two-tap selection
                </Text>
                <Text style={styles.featureItem}>
                  • Visual range highlighting
                </Text>
                <Text style={styles.featureItem}>
                  • Min/max date constraints
                </Text>
                <Text style={styles.featureItem}>• Range duration limits</Text>
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
  },
  dayCellOutside: {
    opacity: 0.3,
  },
  dayCellInRange: {
    backgroundColor: COLORS.primary + "20",
  },
  dayCellRangeEdge: {
    backgroundColor: COLORS.primary,
  },
  dayCellToday: {
    backgroundColor: COLORS.primary + "15",
  },
  dayCellTempStart: {
    backgroundColor: COLORS.primary + "30",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: "dashed",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
  },
  dayTextOutside: {
    color: COLORS.textDisabled,
  },
  dayTextInRange: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  dayTextRangeEdge: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  dayTextToday: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  dayTextTempStart: {
    color: COLORS.primary,
    fontWeight: "700",
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
  rangeInfo: {
    gap: 8,
  },
  rangeText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
  },
  rangeLabel: {
    fontWeight: "700",
    color: COLORS.textSecondary,
  },
  rangeDuration: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
    marginTop: 4,
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
