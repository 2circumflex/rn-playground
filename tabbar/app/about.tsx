import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack, router } from "expo-router";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const tintColor = Colors[colorScheme ?? "light"].tint;

  const appInfo = {
    name: "TabBar App",
    version: "1.0.0",
    buildNumber: "2024120601",
    developer: "Your Company",
    description: "React Native와 Expo를 사용한 모던한 모바일 앱입니다.",
  };

  const infoItems = [
    {
      title: "버전",
      value: appInfo.version,
      icon: "tag.fill",
    },
    {
      title: "빌드 번호",
      value: appInfo.buildNumber,
      icon: "hammer.fill",
    },
    {
      title: "개발자",
      value: appInfo.developer,
      icon: "person.fill",
    },
    {
      title: "라이선스",
      value: "MIT License",
      icon: "doc.text.fill",
      action: () => Linking.openURL("https://opensource.org/licenses/MIT"),
    },
  ];

  const legalItems = [
    {
      title: "개인정보 처리방침",
      icon: "shield.fill",
      action: () => Linking.openURL("https://example.com/privacy"),
    },
    {
      title: "서비스 약관",
      icon: "doc.plaintext.fill",
      action: () => Linking.openURL("https://example.com/terms"),
    },
    {
      title: "오픈소스 라이센스",
      icon: "book.fill",
      action: () => Linking.openURL("https://example.com/licenses"),
    },
  ];

  const socialItems = [
    {
      title: "웹사이트",
      value: "www.example.com",
      icon: "globe",
      action: () => Linking.openURL("https://www.example.com"),
    },
    {
      title: "이메일",
      value: "contact@example.com",
      icon: "envelope.fill",
      action: () => Linking.openURL("mailto:contact@example.com"),
    },
    {
      title: "GitHub",
      value: "github.com/example",
      icon: "link",
      action: () => Linking.openURL("https://github.com/example"),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: "앱 정보",
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
        {/* 앱 로고 및 기본 정보 */}
        <View style={styles.appHeader}>
          <View style={[styles.appIcon, { backgroundColor: tintColor }]}>
            <IconSymbol name="app.fill" size={48} color="white" />
          </View>
          <Text style={[styles.appName, { color: textColor }]}>
            {appInfo.name}
          </Text>
          <Text
            style={[styles.appDescription, { color: textColor, opacity: 0.7 }]}
          >
            {appInfo.description}
          </Text>
        </View>

        {/* 앱 정보 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            앱 정보
          </Text>
          {infoItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.infoItem, { backgroundColor }]}
              onPress={item.action}
              disabled={!item.action}
            >
              <View style={styles.infoItemLeft}>
                <IconSymbol name={item.icon} size={24} color={tintColor} />
                <Text style={[styles.infoItemTitle, { color: textColor }]}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.infoItemRight}>
                <Text
                  style={[
                    styles.infoItemValue,
                    { color: textColor, opacity: 0.6 },
                  ]}
                >
                  {item.value}
                </Text>
                {item.action && (
                  <IconSymbol name="chevron.right" size={16} color="#999" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* 법적 고지 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            법적 고지
          </Text>
          {legalItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.infoItem, { backgroundColor }]}
              onPress={item.action}
            >
              <View style={styles.infoItemLeft}>
                <IconSymbol name={item.icon} size={24} color={tintColor} />
                <Text style={[styles.infoItemTitle, { color: textColor }]}>
                  {item.title}
                </Text>
              </View>
              <IconSymbol name="chevron.right" size={16} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 연락처 및 소셜 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            연락처
          </Text>
          {socialItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.infoItem, { backgroundColor }]}
              onPress={item.action}
            >
              <View style={styles.infoItemLeft}>
                <IconSymbol name={item.icon} size={24} color={tintColor} />
                <View style={styles.infoItemContent}>
                  <Text style={[styles.infoItemTitle, { color: textColor }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.infoItemValue,
                      { color: textColor, opacity: 0.6 },
                    ]}
                  >
                    {item.value}
                  </Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={16} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* 저작권 정보 */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColor, opacity: 0.5 }]}>
            © 2024 {appInfo.developer}. All rights reserved.
          </Text>
          <Text style={[styles.footerText, { color: textColor, opacity: 0.5 }]}>
            Made with ❤️ using React Native & Expo
          </Text>
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
  appHeader: {
    alignItems: "center",
    paddingVertical: 30,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  infoItem: {
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
  infoItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoItemContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
  },
  infoItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoItemValue: {
    fontSize: 14,
    marginRight: 8,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: "center",
  },
});
