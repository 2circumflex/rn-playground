import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(
    colorScheme === "dark"
  );

  const { bottom } = useSafeAreaInsets();

  const settingsItems = [
    {
      id: "profile",
      title: "프로필",
      icon: "person.fill",
      type: "navigation",
      route: "/profile",
    },
    {
      id: "notifications",
      title: "알림",
      icon: "paperplane.fill",
      type: "toggle",
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: "privacy",
      title: "개인정보",
      icon: "shield.fill",
      type: "navigation",
      route: "/privacy",
    },
    {
      id: "darkMode",
      title: "다크 모드",
      icon: "house.fill",
      type: "toggle",
      value: darkModeEnabled,
      onToggle: setDarkModeEnabled,
    },
    {
      id: "language",
      title: "언어",
      icon: "paperplane.fill",
      type: "navigation",
      route: "/language",
    },
    {
      id: "help",
      title: "도움말",
      icon: "house.fill",
      type: "navigation",
      route: "/help",
    },
    {
      id: "about",
      title: "앱 정보",
      icon: "paperplane.fill",
      type: "navigation",
      route: "/about",
    },
  ];

  const renderSettingItem = (item: (typeof settingsItems)[0]) => {
    const iconColor = Colors[colorScheme ?? "light"].tint;
    const textColor = Colors[colorScheme ?? "light"].text;
    const backgroundColor = Colors[colorScheme ?? "light"].background;

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.settingItem, { backgroundColor }]}
        disabled={item.type === "toggle"}
        onPress={() => {
          if (item.type === "navigation" && item.route) {
            router.push(item.route as any);
          }
        }}
      >
        <View style={styles.settingItemLeft}>
          <IconSymbol name={item.icon} size={24} color={iconColor} />
          <Text style={[styles.settingItemText, { color: textColor }]}>
            {item.title}
          </Text>
        </View>
        <View style={styles.settingItemRight}>
          {item.type === "toggle" ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: "#767577", true: iconColor }}
              thumbColor={item.value ? "#f4f3f4" : "#f4f3f4"}
            />
          ) : (
            <IconSymbol name="chevron.right" size={16} color="#999" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={{ paddingBottom: bottom + 90 }}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>설정</Text>
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>일반</Text>
        {settingsItems.slice(0, 2).map(renderSettingItem)}
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>개인화</Text>
        {settingsItems.slice(2, 4).map(renderSettingItem)}
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>지원</Text>
        {settingsItems.slice(4).map(renderSettingItem)}
      </View>

      <View style={styles.settingsSection}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>지원</Text>
        {settingsItems.slice(4).map(renderSettingItem)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  settingsSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
    opacity: 0.7,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "500",
  },
  settingItemRight: {
    alignItems: "center",
    justifyContent: "center",
  },
});
