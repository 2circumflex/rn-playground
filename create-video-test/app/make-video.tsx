import { Button, View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";

import { createVideo } from "../src/utils";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";

export default function MakeVideo() {
  const videoRef = useRef<Video>(null);
  const [source, setSource] = useState<AVPlaybackSource | undefined>(undefined);

  const handleCreateVideo = async () => {
    const videoPath = await createVideo();
    if (videoPath) {
      setSource({ uri: "file://" + videoPath });
      videoRef.current?.playAsync();
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
        <Button
          title="애니메이션 만들기"
          onPress={handleCreateVideo}
          accessibilityLabel="애니메이션 생성 버튼"
        />
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
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    height: 50,
  },
});
