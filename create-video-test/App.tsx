import React from "react";
import { View, Button, Image, StyleSheet } from "react-native";

import { createVideo } from "./utils";

const App = () => {
  return (
    <View style={styles.container}>
      <Button
        title="보노보노 애니메이션 만들기"
        onPress={createVideo}
        accessibilityLabel="보노보노 애니메이션 생성 버튼"
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
