import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "../hooks/useDesignSystem";
import { ThemedText } from "./ThemedText";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function Button({
  title,
  variant = "primary",
  loading = false,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  const buttonStyle = {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor:
      variant === "primary" ? theme.colors.primary : theme.colors.surface,
    opacity: isDisabled ? 0.5 : 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  const textColor = variant === "primary" ? "secondary" : "primary";

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? "#FFFFFF" : theme.colors.primary}
        />
      ) : (
        <ThemedText color={textColor as any}>{title}</ThemedText>
      )}
    </TouchableOpacity>
  );
}
