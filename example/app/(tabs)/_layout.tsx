import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";
import { COLORS } from "../../utils/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarPosition: Platform.select({ web: "top", default: "bottom" }),
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: Platform.select({ ios: 80, android: 80, default: 100 }),
          paddingBottom: Platform.select({ ios: 0, android: 0, default: 10 }),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: Platform.select({ ios: 10, android: 10, default: 14 }),
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Components",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="📦" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="custom"
        options={{
          title: "Custom UI",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="🎨" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="🎯" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="datetime"
        options={{
          title: "DateTime",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="⏰" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="views"
        options={{
          title: "Views",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="👁️" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="presets"
        options={{
          title: "Presets",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="⚡" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="range"
        options={{
          title: "Range",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="📅" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="multi"
        options={{
          title: "Multi",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="🗓️" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="swipe"
        options={{
          title: "Swipe",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="👆" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  return (
    <Text
      style={{
        fontSize: size,
      }}
    >
      {name}
    </Text>
  );
}
