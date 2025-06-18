import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // 다크/라이트 모드에 따른 반투명 배경색
  const getTabBarBackgroundColor = () => {
    return colorScheme === "dark"
      ? "rgba(28, 28, 30, 0.85)" // 다크 모드: 어두운 반투명
      : "rgba(255, 255, 255, 0.85)"; // 라이트 모드: 밝은 반투명
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: Platform.OS === "ios" ? undefined : TabBarBackground, // iOS에서는 기본 블러 효과 사용
        tabBarStyle: Platform.select({
          ios: {
            // Use a semi-transparent background on iOS to show the blur effect
            position: "absolute",
            height: 90, // 탭바 높이 조절 (기본값: ~83)
            paddingBottom: 25,
            paddingTop: 10,
            backgroundColor: getTabBarBackgroundColor(), // 반투명 배경
          },
          default: {
            height: 85,
            paddingBottom: 10,
            paddingTop: 10,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
