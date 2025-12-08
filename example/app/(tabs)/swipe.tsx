import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useCalendar,
  useCalendarAnimation,
  DAYS,
  MONTHS,
  AnimationType,
} from "react-native-calendar-ui";
import { Swipe } from "../../../packages/react-native-calendar-ui/src/components/swipe";
import { COLORS } from "../../utils/colors";
import { useState } from "react";

const ANIMATION_TYPES: { type: AnimationType; label: string; emoji: string }[] =
  [
    { type: "slide", label: "Slide", emoji: "➡️" },
    { type: "fade", label: "Fade", emoji: "✨" },
    { type: "scale", label: "Scale", emoji: "🔍" },
  ];

export default function SwipeScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const [animationType, setAnimationType] = useState<AnimationType>("slide");

  const horizontalPadding = isWeb
    ? Math.max((screenWidth - MAX_WIDTH) / 2, 16)
    : 16;

  const {
    year,
    month,
    days,
    selectedDate,
    selectDate,
    isToday,
    isDateSelected,
    previousMonth,
    nextMonth,
    goToToday,
  } = useCalendar({
    initialSelectedDate: new Date(),
  });

  const { animatedStyle, triggerAnimation } = useCalendarAnimation({
    animationType,
    duration: 300,
  });

  const handleSwipeLeft = () => {
    triggerAnimation("left", nextMonth);
  };

  const handleSwipeRight = () => {
    triggerAnimation("right", previousMonth);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safearea} edges={["top"]}>
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
            <View
              style={[styles.inner, { maxWidth: MAX_WIDTH, width: "100%" }]}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title}>👆 Swipe Navigation</Text>
                <Text style={styles.subtitle}>
                  Swipe left/right to navigate • Natural mobile UX
                </Text>
              </View>

              <View style={styles.animationSelector}>
                <Text style={styles.selectorTitle}>Animation Type</Text>
                <View style={styles.selectorButtons}>
                  {ANIMATION_TYPES.map((anim) => (
                    <TouchableOpacity
                      key={anim.type}
                      style={[
                        styles.animButton,
                        animationType === anim.type && styles.animButtonActive,
                      ]}
                      onPress={() => setAnimationType(anim.type)}
                    >
                      <Text style={styles.animEmoji}>{anim.emoji}</Text>
                      <Text
                        style={[
                          styles.animLabel,
                          animationType === anim.type && styles.animLabelActive,
                        ]}
                      >
                        {anim.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Swipe
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              >
                <View style={styles.calendarCard}>
                  <View style={styles.header}>
                    <TouchableOpacity
                      onPress={() => triggerAnimation("right", previousMonth)}
                      style={styles.navButton}
                    >
                      <Text style={styles.navButtonText}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                      <Text style={styles.monthText}>{MONTHS[month]}</Text>
                      <Text style={styles.yearText}>{year}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => triggerAnimation("left", nextMonth)}
                      style={styles.navButton}
                    >
                      <Text style={styles.navButtonText}>→</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.swipeHint}>
                    <Text style={styles.swipeHintText}>
                      👈 Swipe to navigate months 👉
                    </Text>
                  </View>

                  <View style={styles.weekdays}>
                    {DAYS.map((day) => (
                      <View key={day} style={styles.weekdayCell}>
                        <Text style={styles.weekdayText}>
                          {day.slice(0, 3)}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <Animated.View style={[styles.grid, animatedStyle]}>
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
                          onPress={() => selectDate(date)}
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
                        </TouchableOpacity>
                      );
                    })}
                  </Animated.View>

                  <View style={styles.footer}>
                    <TouchableOpacity
                      onPress={goToToday}
                      style={styles.todayButton}
                    >
                      <Text style={styles.todayButtonText}>Today</Text>
                    </TouchableOpacity>
                    {selectedDate && (
                      <Text style={styles.selectedText}>
                        {selectedDate.toLocaleDateString()}
                      </Text>
                    )}
                  </View>
                </View>
              </Swipe>

              <View style={styles.featuresCard}>
                <Text style={styles.featuresTitle}>✨ Features</Text>
                <View style={styles.featureList}>
                  <Text style={styles.featureItem}>
                    • 3 animation types (slide, fade, scale)
                  </Text>
                  <Text style={styles.featureItem}>
                    • Smooth native animations
                  </Text>
                  <Text style={styles.featureItem}>
                    • Gesture handler integration
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    paddingBottom: 40,
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
    overflow: "hidden",
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
    marginBottom: 12,
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
  swipeHint: {
    backgroundColor: COLORS.primary + "10",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  swipeHintText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
    textAlign: "center",
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
  footer: {
    marginTop: 0,
    paddingTop: 12,
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
  selectedText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  animationSelector: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  selectorButtons: {
    flexDirection: "row",
    gap: 8,
  },
  animButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  animButtonActive: {
    backgroundColor: COLORS.primary + "15",
    borderColor: COLORS.primary,
  },
  animEmoji: {
    fontSize: 20,
  },
  animLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  animLabelActive: {
    color: COLORS.primary,
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
