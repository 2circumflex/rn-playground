import { useRef, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";

import { createVideo } from "../src/utils";

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
        <Button title="동영상 생성" onPress={handleCreateVideo} />
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
