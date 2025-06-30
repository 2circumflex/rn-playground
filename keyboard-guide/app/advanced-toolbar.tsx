import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AdvancedToolbar() {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={Platform.OS === "ios" ? 62 : 30}
        contentContainerStyle={styles.container}
        // style={{ flex: 1, marginBottom: Platform.OS === "ios" ? bottom : 0 }}
      >
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TextInput placeholder="Type a message..." style={styles.textInput} />
          <TextInput placeholder="Type a message..." style={styles.textInput} />
        </View>
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <View style={{ flexDirection: "row", gap: 16 }}>
          <TextInput placeholder="Type a message..." style={styles.textInput} />
          <TextInput placeholder="Type a message..." style={styles.textInput} />
          <TextInput placeholder="Type a message..." style={styles.textInput} />
        </View>
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <TextInput placeholder="Type a message..." style={styles.textInput} />
        <View style={{ height: bottom }} />
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  listStyle: {
    padding: 16,
    gap: 16,
  },
  textInput: {
    width: "auto",
    flexGrow: 1,
    flexShrink: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d8d8d8",
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 8,
  },
});
