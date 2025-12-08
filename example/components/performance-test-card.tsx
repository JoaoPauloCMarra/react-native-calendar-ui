import { useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { getCalendarDays } from "react-native-calendar-ui";
import { Card } from "./card";
import { COLORS } from "../utils/colors";

export function PerformanceTestCard() {
  const [benchmarkResult, setBenchmarkResult] = useState<string | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [yearBenchmarkResult, setYearBenchmarkResult] = useState<string | null>(
    null
  );
  const [isYearBenchmarking, setIsYearBenchmarking] = useState(false);

  const runBenchmark = useCallback(async () => {
    setIsBenchmarking(true);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const start = performance.now();
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      const testYear = 2024 + (i % 5);
      const testMonth = i % 12;
      getCalendarDays(testYear, testMonth);
    }

    const end = performance.now();
    const totalTime = end - start;
    const avgTime = totalTime / iterations;

    setBenchmarkResult(
      `${totalTime.toFixed(2)}ms total\n(${avgTime.toFixed(4)}ms / call)`
    );
    setIsBenchmarking(false);
  }, []);

  const runYearBenchmark = useCallback(async () => {
    setIsYearBenchmarking(true);
    await new Promise((resolve) => setTimeout(resolve, 0));

    const start = performance.now();
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
      const testYear = 2024 + (i % 5);
      for (let month = 0; month < 12; month++) {
        getCalendarDays(testYear, month);
      }
    }

    const end = performance.now();
    const totalTime = end - start;
    const avgTime = totalTime / iterations;

    setYearBenchmarkResult(
      `${totalTime.toFixed(2)}ms total\n(${avgTime.toFixed(2)}ms / year)`
    );
    setIsYearBenchmarking(false);
  }, []);

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Test</Text>
      </View>
      <Text style={styles.label}>
        Run 1,000 iterations of getCalendarDays()
      </Text>

      <View style={styles.benchmarkRow}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: COLORS.success },
            pressed && { opacity: 0.8 },
            isBenchmarking && { opacity: 0.5 },
          ]}
          onPress={runBenchmark}
          disabled={isBenchmarking}
        >
          <Text style={styles.buttonText}>
            {isBenchmarking ? "Running..." : "Run Benchmark"}
          </Text>
        </Pressable>

        {benchmarkResult && (
          <Text style={[styles.value, { fontSize: 14 }]}>
            {benchmarkResult}
          </Text>
        )}
      </View>

      <Text style={[styles.label, { marginTop: 16 }]}>
        Run 100 iterations of full year (12 months)
      </Text>

      <View style={styles.benchmarkRow}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: COLORS.primary },
            pressed && { opacity: 0.8 },
            isYearBenchmarking && { opacity: 0.5 },
          ]}
          onPress={runYearBenchmark}
          disabled={isYearBenchmarking}
        >
          <Text style={styles.buttonText}>
            {isYearBenchmarking ? "Running..." : "Year Benchmark"}
          </Text>
        </Pressable>

        {yearBenchmarkResult && (
          <Text style={[styles.value, { fontSize: 14 }]}>
            {yearBenchmarkResult}
          </Text>
        )}
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
  label: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  benchmarkRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
});
