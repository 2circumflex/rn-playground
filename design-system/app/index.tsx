import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import { Button } from "../components/Button";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { useTheme } from "../hooks/useDesignSystem";

export default function Index() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText size="xl" style={styles.title}>
          간단한 디자인 시스템
        </ThemedText>

        <ThemedText color="secondary" style={styles.subtitle}>
          미니멀한 접근으로 만든 기본 컴포넌트들
        </ThemedText>

        {/* 색상 샘플 */}
        <ThemedView background="surface" style={styles.section}>
          <ThemedText size="lg">컬러</ThemedText>

          <ThemedView style={styles.colorGrid}>
            <ThemedView style={styles.colorItem}>
              <ThemedView
                style={[
                  styles.colorBox,
                  { backgroundColor: theme.colors.primary },
                ]}
              />
              <ThemedText size="sm" color="secondary">
                Primary
              </ThemedText>
              <ThemedText size="sm" color="secondary">
                {theme.colors.primary}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.colorItem}>
              <ThemedView
                style={[
                  styles.colorBox,
                  {
                    backgroundColor: theme.colors.background,
                    borderWidth: 1,
                    borderColor: theme.colors.border,
                  },
                ]}
              />
              <ThemedText size="sm" color="secondary">
                Background
              </ThemedText>
              <ThemedText size="sm" color="secondary">
                {theme.colors.background}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.colorItem}>
              <ThemedView
                style={[
                  styles.colorBox,
                  { backgroundColor: theme.colors.surface },
                ]}
              />
              <ThemedText size="sm" color="secondary">
                Surface
              </ThemedText>
              <ThemedText size="sm" color="secondary">
                {theme.colors.surface}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.colorItem}>
              <ThemedView
                style={[
                  styles.colorBox,
                  { backgroundColor: theme.colors.text },
                ]}
              />
              <ThemedText size="sm" color="secondary">
                Text
              </ThemedText>
              <ThemedText size="sm" color="secondary">
                {theme.colors.text}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.colorItem}>
              <ThemedView
                style={[
                  styles.colorBox,
                  { backgroundColor: theme.colors.textSecondary },
                ]}
              />
              <ThemedText size="sm" color="secondary">
                Text Secondary
              </ThemedText>
              <ThemedText size="sm" color="secondary">
                {theme.colors.textSecondary}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.colorItem}>
              <ThemedView
                style={[
                  styles.colorBox,
                  { backgroundColor: theme.colors.border },
                ]}
              />
              <ThemedText size="sm" color="secondary">
                Border
              </ThemedText>
              <ThemedText size="sm" color="secondary">
                {theme.colors.border}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* 텍스트 샘플 */}
        <ThemedView background="surface" style={styles.section}>
          <ThemedText size="lg">텍스트</ThemedText>
          <ThemedText size="xl">Extra Large</ThemedText>
          <ThemedText size="lg">Large</ThemedText>
          <ThemedText size="md">Medium (기본)</ThemedText>
          <ThemedText size="sm">Small</ThemedText>
          <ThemedText color="secondary">Secondary Color</ThemedText>
        </ThemedView>

        {/* 버튼 샘플 */}
        <ThemedView background="surface" style={styles.section}>
          <ThemedText size="lg">버튼</ThemedText>

          <Button variant="primary" onPress={() => alert("Primary 버튼 클릭!")}>
            Primary 버튼
          </Button>

          <Button
            variant="secondary"
            onPress={() => alert("Secondary 버튼 클릭!")}
          >
            Secondary 버튼
          </Button>

          <Button variant="outline" onPress={() => alert("Outline 버튼 클릭!")}>
            Outline 버튼
          </Button>

          <Button variant="ghost" onPress={() => alert("Ghost 버튼 클릭!")}>
            Ghost 버튼
          </Button>

          <Button
            variant="destructive"
            onPress={() => alert("Destructive 버튼 클릭!")}
          >
            Destructive 버튼
          </Button>

          <Button variant="primary" loading={true}>
            로딩 버튼
          </Button>
        </ThemedView>

        <ThemedText size="sm" color="secondary" style={styles.footer}>
          {theme.isDark ? "다크 모드" : "라이트 모드"} • React Native Design
          System
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  colorGrid: {
    paddingVertical: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  colorItem: {
    flex: 1,
    minWidth: 120,
    alignItems: "center",
    gap: 4,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
  },
});
