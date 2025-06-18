import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack, router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const tintColor = Colors[colorScheme ?? "light"].tint;

  const profileItems = [
    {
      id: "edit",
      title: "프로필 편집",
      icon: "house.fill",
    },
    {
      id: "photo",
      title: "프로필 사진 변경",
      icon: "paperplane.fill",
    },
    {
      id: "status",
      title: "상태 메시지",
      icon: "house.fill",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: "프로필",
          headerShown: true,
          headerStyle: { backgroundColor },
          headerTintColor: tintColor,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <IconSymbol name="chevron.left" size={24} color={tintColor} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.content}>
        {/* 프로필 정보 섹션 */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: tintColor }]}
            >
              <IconSymbol name="house.fill" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.profileName, { color: textColor }]}>
            사용자 이름
          </Text>
          <Text
            style={[styles.profileEmail, { color: textColor, opacity: 0.7 }]}
          >
            user@example.com
          </Text>
        </View>

        {/* 프로필 설정 항목들 */}
        <View style={styles.settingsSection}>
          {profileItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.settingItem, { backgroundColor }]}
            >
              <View style={styles.settingItemLeft}>
                <IconSymbol name="house.fill" size={24} color={tintColor} />
                <Text style={[styles.settingItemText, { color: textColor }]}>
                  {item.title}
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
  },
  settingsSection: {
    marginTop: 20,
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
});
