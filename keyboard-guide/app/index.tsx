import { Button, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function () {
  return (
    <SafeAreaView style={styles.container}>
      <Link href={"/basic"} asChild>
        <Button title="Basic Usage" />
      </Link>

      <Link href={"/advanced"} asChild>
        <Button title="Advanced Usage" />
      </Link>

      <Link href={"/advanced-toolbar"} asChild>
        <Button title="Advanced Usage with Toolbar" />
      </Link>

      <Link href={"/view-avoiding"} asChild>
        <Button title="View Avoiding" />
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
  },
});
