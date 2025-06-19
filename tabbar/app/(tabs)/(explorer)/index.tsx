import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const exploreItems = [
  { id: "1", title: "맛집 탐색", description: "주변 맛집을 찾아보세요" },
  { id: "2", title: "여행지 추천", description: "인기 여행 목적지" },
  { id: "3", title: "문화 예술", description: "박물관과 갤러리" },
  { id: "4", title: "쇼핑몰", description: "인근 쇼핑 센터" },
  { id: "5", title: "공원", description: "휴식을 위한 공간" },
];

export default function ExplorerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explorer</Text>
      <Text style={styles.subtitle}>다양한 카테고리를 탐색해보세요</Text>

      <ScrollView style={styles.scrollView}>
        {exploreItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() =>
              router.push(`./detail?id=${item.id}&title=${item.title}`)
            }
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <View style={styles.arrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => router.push("/profile")}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            프로필 (탭바 위로)
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  itemCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    flex: 2,
    marginLeft: 12,
  },
  arrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
});
