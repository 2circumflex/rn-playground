import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack, router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LanguageScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const tintColor = Colors[colorScheme ?? "light"].tint;

  const [selectedLanguage, setSelectedLanguage] = React.useState("ko");

  const languages = [
    {
      code: "ko",
      name: "한국어",
      nativeName: "한국어",
    },
    {
      code: "en",
      name: "영어",
      nativeName: "English",
    },
    {
      code: "ja",
      name: "일본어",
      nativeName: "日本語",
    },
    {
      code: "zh",
      name: "중국어 (간체)",
      nativeName: "简体中文",
    },
    {
      code: "zh-TW",
      name: "중국어 (번체)",
      nativeName: "繁體中文",
    },
    {
      code: "es",
      name: "스페인어",
      nativeName: "Español",
    },
    {
      code: "fr",
      name: "프랑스어",
      nativeName: "Français",
    },
    {
      code: "de",
      name: "독일어",
      nativeName: "Deutsch",
    },
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // 여기에 언어 변경 로직 추가
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: "언어",
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
            앱 언어 선택
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: textColor, opacity: 0.7 },
            ]}
          >
            앱에서 사용할 언어를 선택해주세요. 변경사항은 앱을 재시작한 후
            적용됩니다.
          </Text>
        </View>

        <View style={styles.languageList}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                { backgroundColor },
                selectedLanguage === language.code && {
                  borderColor: tintColor,
                  borderWidth: 2,
                },
              ]}
              onPress={() => handleLanguageSelect(language.code)}
            >
              <View style={styles.languageItemLeft}>
                <Text style={[styles.languageName, { color: textColor }]}>
                  {language.name}
                </Text>
                <Text
                  style={[
                    styles.languageNativeName,
                    { color: textColor, opacity: 0.6 },
                  ]}
                >
                  {language.nativeName}
                </Text>
              </View>
              {selectedLanguage === language.code && (
                <IconSymbol
                  name="checkmark.circle.fill"
                  size={24}
                  color={tintColor}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <IconSymbol name="info.circle" size={20} color={tintColor} />
            <Text style={[styles.infoText, { color: textColor, opacity: 0.7 }]}>
              언어 변경 후 앱을 재시작해주세요
            </Text>
          </View>
          <View style={styles.infoItem}>
            <IconSymbol name="globe" size={20} color={tintColor} />
            <Text style={[styles.infoText, { color: textColor, opacity: 0.7 }]}>
              지역 설정에 따라 날짜 및 시간 형식이 변경됩니다
            </Text>
          </View>
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
  languageList: {
    marginTop: 10,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  languageItemLeft: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  languageNativeName: {
    fontSize: 14,
  },
  infoSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
});
