import { useRef, useState } from "react";
import { Button, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import {
  FlipType,
  SaveFormat,
  useImageManipulator,
} from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureRef } from "react-native-view-shot";
import Share from "react-native-share";

type FlipImageParams = {
  photoUri: string;
};

export default function FlipImage() {
  const params = useLocalSearchParams<FlipImageParams>();
  const imageManipulator = useImageManipulator(params.photoUri);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

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

      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      if (permissionResponse?.status === "granted") {
        await MediaLibrary.saveToLibraryAsync(uri);
      }
    } catch (error) {
      console.error("이미지 저장 실패", error);
    }
  };

  const _shareImage = async () => {
    if (flippedImage) {
      try {
        await Share.open({
          url: flippedImage,
          // urls 도 있음
          type: "image/jpeg",
          title: "이미지 공유",
          failOnCancel: false,
        });
      } catch (error) {
        console.error("이미지 공유 실패", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ViewShot ref={imageRef} style={styles.image}>
          <Image
            source={{ uri: params.photoUri }}
            style={styles.image}
            contentFit="contain"
          />
        </ViewShot>
        {flippedImage && (
          <Image source={{ uri: flippedImage }} style={styles.image} />
        )}
        {savedImage && (
          <Image source={{ uri: savedImage }} style={styles.image} />
        )}
        <Button onPress={_rotate90andFlip} title="좌우 뒤집기" />
        <Button onPress={_saveImage} title="이미지 저장" />
        <Button onPress={_shareImage} title="이미지 공유" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
