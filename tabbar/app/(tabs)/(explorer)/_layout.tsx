import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function ExplorerStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
    </Stack>
  );
}
