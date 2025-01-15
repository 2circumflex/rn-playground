import { Button, View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

type DetailParams = {
  photoUri: string;
};

export default function Detail() {
  const router = useRouter();
  const params = useLocalSearchParams<DetailParams>();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={() => router.back()} title="뒤로가기" />
    </View>
  );
}
