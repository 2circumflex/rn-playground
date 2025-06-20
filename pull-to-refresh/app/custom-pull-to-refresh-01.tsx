import CustomPullToRefresh from "@/components/CustomPullToRefresh";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface ListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  status: "completed" | "pending" | "in-progress";
}

export default function CustomPullToRefresh01Screen() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<ListItem[]>([
    {
      id: "1",
      title: "오늘의 할 일",
      description: "프로젝트 문서 작성 및 코드 리뷰 진행",
      category: "업무",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: "2",
      title: "운동하기",
      description: "헬스장에서 1시간 운동하고 유산소 30분",
      category: "건강",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "3",
      title: "독서",
      description: "새로 산 개발서 2장 읽기",
      category: "학습",
      date: "2024-01-14",
      status: "in-progress",
    },
    {
      id: "4",
      title: "쇼핑",
      description: "생필품 구매 및 주간 식료품 쇼핑",
      category: "생활",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: "5",
      title: "친구 만나기",
      description: "오랜만에 친구들과 카페에서 수다",
      category: "사교",
      date: "2024-01-13",
      status: "completed",
    },
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // 새로운 데이터 시뮬레이션
    setTimeout(() => {
      const newItem: ListItem = {
        id: String(Date.now()),
        title: "새로운 할 일",
        description: "커스텀 새로고침 01로 추가된 새로운 작업입니다",
        category: "새 항목",
        date: new Date().toISOString().split("T")[0],
        status: "pending",
      };

      setData((prevData) => [newItem, ...prevData]);
      setRefreshing(false);
    }, 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#4CAF50";
      case "pending":
        return "#FF9800";
      case "in-progress":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "완료";
      case "pending":
        return "대기";
      case "in-progress":
        return "진행중";
      default:
        return "알 수 없음";
    }
  };

  const renderItem = ({ item }: { item: ListItem }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <Text style={styles.cardDescription}>{item.description}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomPullToRefresh onRefresh={onRefresh} refreshing={refreshing}>
        <FlatList
          style={{ marginTop: 30 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        />
      </CustomPullToRefresh>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 12,
    color: "#000000",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.8,
    color: "#000000",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryContainer: {
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  dateText: {
    fontSize: 12,
    opacity: 0.6,
    color: "#000000",
  },
});
