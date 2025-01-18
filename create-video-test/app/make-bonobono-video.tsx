import { useRef, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { AVPlaybackSource, ResizeMode, Video } from "expo-av";
import Share from "react-native-share";

import { createBonoBonoVideo } from "../src/utils";

export default function MakeBonoBonoVideo() {
  const videoRef = useRef<Video>(null);
  const [source, setSource] = useState<AVPlaybackSource | undefined>(undefined);

  const handleCreateVideo = async () => {
    const videoPath = await createBonoBonoVideo();
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
        <Button title="보노보노 동영상 생성" onPress={handleCreateVideo} />
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
