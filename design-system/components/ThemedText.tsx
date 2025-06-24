import React from "react";
import { Text, TextProps } from "react-native";
import { useTheme } from "../hooks/useDesignSystem";

interface ThemedTextProps extends TextProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "accent";
}

export function ThemedText({
  style,
  size = "md",
  color = "primary",
  ...props
}: ThemedTextProps) {
  const theme = useTheme();

  const getTextColor = () => {
    switch (color) {
      case "primary":
        return theme.colors.text;
      case "secondary":
        return theme.colors.textSecondary;
      case "success":
        return theme.colors.success;
      case "error":
        return theme.colors.error;
      case "warning":
        return theme.colors.warning;
      case "accent":
        return theme.colors.accent;
      default:
        return theme.colors.text;
    }
  };

  const textColor = getTextColor();

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
