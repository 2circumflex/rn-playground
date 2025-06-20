import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PullToRefreshItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  color: string;
}

export default function HomeScreen() {
  const router = useRouter();

  const pullToRefreshTypes: PullToRefreshItem[] = [
    {
      id: "1",
      title: "Custom PullToRefresh 01",
      subtitle: "스타트업 스타일",
      description:
        "트위터/인스타그램 스타일의 부드러운 애니메이션과 스케일 효과",
      route: "/custom-pull-to-refresh-01",
      color: "#007AFF",
    },
  ];

  const handlePress = (route: string, isReady: boolean) => {
    if (isReady) {
      router.push(route as any);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pull to Refresh</Text>
        <Text style={styles.headerSubtitle}>
          다양한 스타일의 Pull to Refresh 구현
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {pullToRefreshTypes.map((item) => {
          const isReady = item.id === "1"; // 첫 번째 항목만 준비됨

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {
                  opacity: isReady ? 1 : 0.6,
                  borderLeftColor: item.color,
                },
              ]}
              onPress={() => handlePress(item.route, isReady)}
              disabled={!isReady}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  {!isReady && (
                    <View style={styles.comingSoonBadge}>
                      <Text style={styles.comingSoonText}>준비 중</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>

                {isReady && (
                  <View style={styles.readyIndicator}>
                    <Text style={styles.readyText}>체험하기 →</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    flex: 1,
  },
  comingSoonBadge: {
    backgroundColor: "#FF9500",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 16,
  },
  readyIndicator: {
    alignSelf: "flex-end",
  },
  readyText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
});
