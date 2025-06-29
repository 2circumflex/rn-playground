import {
  StyleSheet,
  Platform,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardEventListener,
  Pressable,
  View,
} from "react-native";

import { messages } from "@/messages";
import MessageItem from "@/components/message-item";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const textInputRef = useRef<TextInput>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // useEffect(() => {
  //   // focus input on mount
  //   textInputRef.current?.focus();
  // }, []);

  const handleKeyboardShow: KeyboardEventListener = (event) => {
    console.log("keyboard show", event.duration);
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide: KeyboardEventListener = (event) => {
    console.log("keyboard hide", event.duration);
    setIsKeyboardVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          keyExtractor={(item) => item.createdAt.toString()}
          contentContainerStyle={styles.listStyle}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 16,
            alignSelf: "flex-end",
          }}
        >
          {isKeyboardVisible && (
            <Pressable onPress={Keyboard.dismiss}>
              <Ionicons name="chevron-down" size={24} color="black" />
            </Pressable>
          )}
          {!isKeyboardVisible && (
            <Pressable onPress={() => textInputRef.current?.focus()}>
              <Ionicons name="chevron-up" size={24} color="black" />
            </Pressable>
          )}
        </View>
        <TextInput
          ref={textInputRef}
          placeholder="Type a message..."
          style={styles.textInput}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  listStyle: {
    padding: 16,
    gap: 16,
  },
  textInput: {
    width: "95%",
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d8d8d8",
    backgroundColor: "#fff",
    padding: 8,
    alignSelf: "center",
    marginBottom: 8,
  },
});
