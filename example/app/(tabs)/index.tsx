import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ModuleStatusCard } from "../../components/module-status-card";
import { PerformanceTestCard } from "../../components/performance-test-card";
import { CalendarCard } from "../../components/calendar-card";
import { AdvancedUtilitiesCard } from "../../components/advanced-utilities-card";
import { COLORS } from "../../utils/colors";

const CalendarScreen = () => {
  const { width: screenWidth } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const horizontalPadding = isWeb
    ? Math.max((screenWidth - MAX_WIDTH) / 2, 16)
    : 16;

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={styles.wrapper}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.container}
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            {
              paddingHorizontal: horizontalPadding,
            },
          ]}
        >
          <View style={[styles.inner, { maxWidth: MAX_WIDTH, width: "100%" }]}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>📅 Calendar UI</Text>
            </View>

            <ModuleStatusCard />

            <PerformanceTestCard />

            <CalendarCard />

            <AdvancedUtilitiesCard />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Built with ❤️ for React Native
              </Text>
              <Text style={styles.footerSubtext}>
                Works on iOS • Android • Web
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

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
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  footerSubtext: {
    fontSize: 12,
    color: COLORS.textDisabled,
    marginTop: 4,
  },
});
