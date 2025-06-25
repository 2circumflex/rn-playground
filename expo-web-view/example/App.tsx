import { WebView } from "expo-web-view";

export default function App() {
  return (
    <WebView
      style={{ flex: 1 }}
      url="https://expo.dev"
      onLoad={(event) => alert(`loaded ${event.nativeEvent.url}`)}
    />
  );
}
