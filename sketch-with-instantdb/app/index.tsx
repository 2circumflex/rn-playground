import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SketchCanvas from "@/components/sketch-canvas";

export default function () {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <SketchCanvas />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
  },
});
