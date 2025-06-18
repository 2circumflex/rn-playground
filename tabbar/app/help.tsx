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

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  const textColor = Colors[colorScheme ?? "light"].text;
  const tintColor = Colors[colorScheme ?? "light"].tint;

  const helpSections = [
    {
      title: "자주 묻는 질문",
      icon: "questionmark.circle.fill",
      items: [
        {
          question: "앱을 어떻게 사용하나요?",
          answer:
            "하단의 탭바를 통해 다양한 기능에 접근할 수 있습니다. 홈에서는 주요 기능을, 탐색에서는 새로운 콘텐츠를 찾아보세요.",
        },
        {
          question: "알림을 받지 못해요",
          answer:
            "설정 > 알림에서 알림 권한이 허용되어 있는지 확인해주세요. 기기 설정에서도 알림 권한을 확인해야 할 수 있습니다.",
        },
        {
          question: "다크 모드로 변경하려면?",
          answer:
            "설정 화면에서 다크 모드 토글을 켜거나 끌 수 있습니다. 시스템 설정을 따르도록 설정할 수도 있습니다.",
        },
        {
          question: "언어를 변경하려면?",
          answer:
            "설정 > 언어에서 원하는 언어를 선택할 수 있습니다. 변경 후 앱을 재시작해주세요.",
        },
      ],
    },
    {
      title: "문제 해결",
      icon: "wrench.fill",
      items: [
        {
          question: "앱이 느려요",
          answer:
            "앱을 완전히 종료한 후 다시 시작해보세요. 문제가 지속되면 기기를 재시작해주세요.",
        },
        {
          question: "로그인이 안돼요",
          answer:
            "네트워크 연결을 확인하고, 계정 정보가 올바른지 확인해주세요. 비밀번호를 잊으셨다면 비밀번호 재설정을 이용해주세요.",
        },
        {
          question: "데이터가 동기화되지 않아요",
          answer:
            "인터넷 연결을 확인하고, 앱을 재시작해보세요. 계정 로그인 상태도 확인해주세요.",
        },
      ],
    },
  ];

  const contactOptions = [
    {
      title: "이메일 문의",
      description: "support@example.com",
      icon: "envelope.fill",
      action: () => Linking.openURL("mailto:support@example.com"),
    },
    {
      title: "전화 문의",
      description: "1588-1234 (평일 9:00-18:00)",
      icon: "phone.fill",
      action: () => Linking.openURL("tel:1588-1234"),
    },
    {
      title: "웹사이트",
      description: "도움말 센터 방문",
      icon: "globe",
      action: () => Linking.openURL("https://help.example.com"),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          title: "도움말",
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
        {helpSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol name="house.fill" size={24} color={tintColor} />
              <Text style={[styles.sectionTitle, { color: textColor }]}>
                {section.title}
              </Text>
            </View>

            {section.items.map((item, itemIndex) => (
              <View
                key={itemIndex}
                style={[styles.faqItem, { backgroundColor }]}
              >
                <Text style={[styles.faqQuestion, { color: textColor }]}>
                  {item.question}
                </Text>
                <Text
                  style={[styles.faqAnswer, { color: textColor, opacity: 0.7 }]}
                >
                  {item.answer}
                </Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.contactSection}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            문의하기
          </Text>
          <Text
            style={[
              styles.contactDescription,
              { color: textColor, opacity: 0.7 },
            ]}
          >
            문제가 해결되지 않았다면 아래 방법으로 문의해주세요.
          </Text>

          {contactOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.contactItem, { backgroundColor }]}
              onPress={option.action}
            >
              <View style={styles.contactItemLeft}>
                <IconSymbol
                  name="paperplane.fill"
                  size={24}
                  color={tintColor}
                />
                <View style={styles.contactItemContent}>
                  <Text style={[styles.contactItemTitle, { color: textColor }]}>
                    {option.title}
                  </Text>
                  <Text
                    style={[
                      styles.contactItemDescription,
                      { color: textColor, opacity: 0.6 },
                    ]}
                  >
                    {option.description}
                  </Text>
                </View>
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
  section: {
    marginBottom: 30,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  faqItem: {
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
  faqQuestion: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  contactDescription: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  contactItem: {
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
  contactItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  contactItemContent: {
    marginLeft: 15,
    flex: 1,
  },
  contactItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  contactItemDescription: {
    fontSize: 12,
  },
});
