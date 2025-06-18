import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack, router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PrivacyScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const tintColor = Colors[colorScheme ?? "light"].tint;

  const [locationEnabled, setLocationEnabled] = React.useState(true);
  const [cameraEnabled, setCameraEnabled] = React.useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = React.useState(false);
  const [contactsEnabled, setContactsEnabled] = React.useState(true);

  const privacyItems = [
    {
      id: "location",
      title: "위치 서비스",
      description: "앱이 위치 정보를 사용할 수 있도록 허용",
      icon: "location.fill",
      type: "toggle",
      value: locationEnabled,
      onToggle: setLocationEnabled,
    },
    {
      id: "camera",
      title: "카메라",
      description: "사진 촬영 및 동영상 녹화를 허용",
      icon: "camera.fill",
      type: "toggle",
      value: cameraEnabled,
      onToggle: setCameraEnabled,
    },
    {
      id: "microphone",
      title: "마이크",
      description: "음성 녹음을 허용",
      icon: "mic.fill",
      type: "toggle",
      value: microphoneEnabled,
      onToggle: setMicrophoneEnabled,
    },
    {
      id: "contacts",
      title: "연락처",
      description: "연락처 정보에 접근을 허용",
      icon: "person.2.fill",
      type: "toggle",
      value: contactsEnabled,
      onToggle: setContactsEnabled,
    },
    {
      id: "data",
      title: "데이터 및 개인정보",
      description: "수집되는 데이터 및 개인정보 처리 방침",
      icon: "shield.fill",
      type: "navigation",
    },
    {
      id: "cookies",
      title: "쿠키 설정",
      description: "웹사이트 쿠키 및 추적 설정",
      icon: "globe",
      type: "navigation",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: "개인정보",
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
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            권한 관리
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: textColor, opacity: 0.7 },
            ]}
          >
            앱에서 사용할 권한을 관리할 수 있습니다.
          </Text>
        </View>

        {privacyItems.map((item) => (
          <View key={item.id} style={[styles.settingItem, { backgroundColor }]}>
            <View style={styles.settingItemLeft}>
              <IconSymbol name="shield.fill" size={24} color={tintColor} />
              <View style={styles.settingItemContent}>
                <Text style={[styles.settingItemText, { color: textColor }]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.settingItemDescription,
                    { color: textColor, opacity: 0.6 },
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            </View>
            <View style={styles.settingItemRight}>
              {item.type === "toggle" ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: "#767577", true: tintColor }}
                  thumbColor={item.value ? "#f4f3f4" : "#f4f3f4"}
                />
              ) : (
                <IconSymbol name="chevron.right" size={16} color="#999" />
              )}
            </View>
          </View>
        ))}
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
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
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
  settingItemContent: {
    marginLeft: 15,
    flex: 1,
  },
  settingItemText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  settingItemDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  settingItemRight: {
    alignItems: "center",
    justifyContent: "center",
  },
});
