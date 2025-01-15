import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { createVideo } from "./utils";

const App = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("사진이 촬영되었습니다:", photo?.uri);
      // 여기서 photo.uri를 사용하여 촬영된 사진을 처리할 수 있습니다
    } catch (error) {
      console.error("사진 촬영 중 오류 발생:", error);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={"front"}
        mode={"picture"}
        active
        autofocus={"on"}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="사진 촬영"
          onPress={takePicture}
          accessibilityLabel="사진 촬영 버튼"
        />
        <Button
          title="보노보노 애니메이션 만들기"
          onPress={createVideo}
          accessibilityLabel="보노보노 애니메이션 생성 버튼"
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  createVideoButton: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: "red",
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    padding: 20,
    gap: 10,
  },
});
