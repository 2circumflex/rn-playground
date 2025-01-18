import { Button, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

const App = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button
        title="사진 촬영으로 이동"
        onPress={() => router.push("/take-picture")}
      />
      <Button
        title="보노보노 동영상 생성으로 이동"
        onPress={() => router.push("/make-bonobono-video")}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
