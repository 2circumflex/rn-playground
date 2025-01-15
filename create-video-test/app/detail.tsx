import { Button, View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

type DetailParams = {
  photoUri: string;
};

export default function Detail() {
  const router = useRouter();
  const params = useLocalSearchParams<DetailParams>();

  return (
    <View style={styles.container}>
      <Image source={{ uri: params.photoUri }} style={styles.image} />
      <Button onPress={() => router.back()} title="뒤로가기" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
