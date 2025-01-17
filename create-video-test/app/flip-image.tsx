import { Button, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import {
  FlipType,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";
import { useRef, useState } from "react";
import ViewShot, { captureRef } from "react-native-view-shot";

type FlipImageParams = {
  photoUri: string;
};

export default function FlipImage() {
  const params = useLocalSearchParams<FlipImageParams>();
  const imageManipulator = useImageManipulator(params.photoUri);

  const [flippedImage, setFlippedImage] = useState<string | null>(null);

  const [savedImage, setSavedImage] = useState<string | null>(null);

  const imageRef = useRef<ViewShot>(null);

  const _rotate90andFlip = async () => {
    const context = imageManipulator.flip(FlipType.Horizontal);
    const image = await context.renderAsync();
    const result = await image.saveAsync({ format: SaveFormat.JPEG });

    console.log("Flipped image:", result);
    setFlippedImage(result.uri);
  };

  const _saveImage = async () => {
    try {
      const uri = await captureRef(imageRef, {
        format: "jpg",
        quality: 1,
      });
      setSavedImage(uri);
      console.log("저장된 이미지 경로 :", uri);
    } catch (error) {
      console.error("이미지 저장 실패", error);
    }
  };

  return (
    <View style={styles.container}>
      <ViewShot ref={imageRef} style={styles.image}>
        <Image source={{ uri: params.photoUri }} style={styles.image} />
      </ViewShot>
      {flippedImage && (
        <Image source={{ uri: flippedImage }} style={styles.image} />
      )}
      {savedImage && (
        <Image source={{ uri: savedImage }} style={styles.image} />
      )}
      <Button onPress={_rotate90andFlip} title="90도 회전 후 뒤집기" />
      <Button onPress={_saveImage} title="이미지 저장" />
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
