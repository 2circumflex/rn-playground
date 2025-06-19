import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const detailContent = {
  "1": {
    title: "맛집 탐색",
    content:
      "주변의 인기 맛집들을 탐색해보세요. 리뷰와 평점을 확인하고 예약도 가능합니다.",
    features: ["리뷰 확인", "예약 시스템", "메뉴 보기", "위치 안내"],
  },
  "2": {
    title: "여행지 추천",
    content:
      "인기 여행 목적지와 숨겨진 명소들을 발견해보세요. 여행 일정도 계획할 수 있습니다.",
    features: ["명소 추천", "일정 계획", "교통편 안내", "숙박 정보"],
  },
  "3": {
    title: "문화 예술",
    content: "박물관, 갤러리, 공연장 등 다양한 문화 예술 공간을 탐색해보세요.",
    features: ["전시 정보", "공연 일정", "티켓 예매", "작품 해설"],
  },
  "4": {
    title: "쇼핑몰",
    content:
      "인근 쇼핑 센터와 브랜드 매장 정보를 확인하고 할인 혜택도 받아보세요.",
    features: ["매장 정보", "할인 쿠폰", "세일 알림", "주차 안내"],
  },
  "5": {
    title: "공원",
    content:
      "휴식과 운동을 위한 공원과 산책로를 찾아보세요. 날씨 정보도 제공합니다.",
    features: ["산책로 안내", "운동 시설", "날씨 정보", "이벤트 현황"],
  },
};

export default function DetailScreen() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams();

  const data = detailContent[id as keyof typeof detailContent] || {
    title: title || "Detail",
    content: "상세 정보를 불러올 수 없습니다.",
    features: [],
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← 뒤로 가기</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>Explorer 상세 화면</Text>

        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>설명</Text>
          <Text style={styles.content}>{data.content}</Text>
        </View>

        {data.features.length > 0 && (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>주요 기능</Text>
            {data.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            이 화면은 탭바 내부의 Stack Navigator에서 실행되고 있습니다.
          </Text>
          <Text style={styles.infoText}>
            ID: {id} | Title: {title}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: "#007AFF",
    marginRight: 8,
    fontWeight: "bold",
  },
  featureText: {
    fontSize: 16,
    color: "#555",
    flex: 1,
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: "#1976d2",
    marginBottom: 4,
  },
  backButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
