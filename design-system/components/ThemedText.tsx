import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../hooks/useDesignSystem";

interface ThemedTextProps extends TextProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary";
}

export function ThemedText({
  style,
  size = "md",
  color = "primary",
  ...props
}: ThemedTextProps) {
  const theme = useTheme();

  const textColor =
    color === "primary" ? theme.colors.text : theme.colors.textSecondary;

  return (
    <Text
      style={[
        {
          fontSize: theme.fontSize[size],
          color: textColor,
        },
        style,
      ]}
      {...props}
    />
  );
}
