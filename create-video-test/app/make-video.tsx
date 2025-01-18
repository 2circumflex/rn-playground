import { useRef, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";
import Share from "react-native-share";

import { createVideo } from "../src/utils";
import { useLocalSearchParams } from "expo-router";

type MakeVideoParams = {
  image1Uri: string;
  image2Uri: string;
};

export default function MakeVideo() {
  const params = useLocalSearchParams<MakeVideoParams>();

  const videoRef = useRef<Video>(null);
  const [source, setSource] = useState<AVPlaybackSource | undefined>(undefined);

  const handleCreateVideo = async () => {
    const videoPath = await createVideo({
      image1Uri: params.image1Uri,
      image2Uri: params.image2Uri,
    });
    if (videoPath) {
      setSource({ uri: "file://" + videoPath });
      videoRef.current?.playAsync();
    }
  };

  const handleShareVideo = async () => {
    if (source) {
      try {
        await Share.open({
          url: source.uri,
          type: "video/mp4",
          title: "비디오 공유",
          failOnCancel: false,
        });
      } catch (error) {
        console.error("Error sharing video:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={source}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
      />
      <View style={styles.buttonContainer}>
        <Button title="이미지로 동영상 생성" onPress={handleCreateVideo} />
        <Button title="공유" onPress={handleShareVideo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  video: {
    width: "100%",
    aspectRatio: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    height: 50,
  },
});
