import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

const TakePicture = () => {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
      router.push({
        pathname: "/detail",
        params: { photoUri: photo?.uri },
      });
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
        mirror={true}
      />
      <View style={styles.buttonContainer}>
        <Button title="사진 촬영" onPress={takePicture} />
      </View>
    </View>
  );
};

export default TakePicture;

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
