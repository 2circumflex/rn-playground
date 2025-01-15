import { Button, View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import {
  FlipType,
  SaveFormat,
  ImageManipulator,
  useImageManipulator,
} from "expo-image-manipulator";
import { useState } from "react";

type DetailParams = {
  photoUri: string;
};

export default function Detail() {
  const router = useRouter();
  const params = useLocalSearchParams<DetailParams>();
  const imageManipulator = useImageManipulator(params.photoUri);

  const [flippedImage, setFlippedImage] = useState<string | null>(null);

  const _rotate90andFlip = async () => {
    const context = imageManipulator.flip(FlipType.Horizontal);
    const image = await context.renderAsync();
    const result = await image.saveAsync({ format: SaveFormat.JPEG });

    console.log("Flipped image:", result);
    setFlippedImage(result.uri);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: params.photoUri }} style={styles.image} />
      {flippedImage && (
        <Image source={{ uri: flippedImage }} style={styles.image} />
      )}
      <Button onPress={() => router.back()} title="뒤로가기" />
      <Button onPress={_rotate90andFlip} title="90도 회전 후 뒤집기" />
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
