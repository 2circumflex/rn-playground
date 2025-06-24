import React from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "../hooks/useDesignSystem";

interface ThemedViewProps extends ViewProps {
  background?: "primary" | "surface";
}

export function ThemedView({
  style,
  background = "primary",
  ...props
}: ThemedViewProps) {
  const theme = useTheme();

  const backgroundColor =
    background === "primary" ? theme.colors.background : theme.colors.surface;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}
