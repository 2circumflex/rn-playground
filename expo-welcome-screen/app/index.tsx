import { StyleSheet, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeadText } from "@/components/head-text";

export default function () {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={{ gap: 10 }}>
        <HeadText
          text="Your"
          side="right"
          image={require("../assets/images/one.jpg")}
        />
        <HeadText
          text="All-In-One"
          side="right"
          image={require("../assets/images/two.jpg")}
        />
        <HeadText
          text="Creative"
          side="left"
          image={require("../assets/images/three.jpg")}
        />
        <HeadText text="Powerhouse" />
        <HeadText side="right" image={require("../assets/images/four.jpg")} />
      </View>
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
