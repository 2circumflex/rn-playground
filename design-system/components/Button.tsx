import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useTheme } from "../hooks/useDesignSystem";
import { ThemedText } from "./ThemedText";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  loading = false,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  // Variant별 스타일 정의
  const getVariantStyles = () => {
    const baseStyle = {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.sm,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      opacity: isDisabled ? 0.5 : 1,
    };

    switch (variant) {
      case "primary":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
          borderWidth: 0,
        };
      case "secondary":
        return {
          ...baseStyle,
          backgroundColor: theme.colors.surface,
          borderWidth: 0,
        };
      case "outline":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case "ghost":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      case "destructive":
        return {
          ...baseStyle,
          backgroundColor: "#EF4444", // 빨간색
          borderWidth: 0,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
          borderWidth: 0,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        return "secondary"; // 흰색 텍스트
      case "secondary":
        return "primary"; // 기본 텍스트 색상
      case "outline":
        return "primary"; // 기본 텍스트 색상
      case "ghost":
        return "primary"; // 기본 텍스트 색상
      case "destructive":
        return "secondary"; // 흰색 텍스트
      default:
        return "secondary";
    }
  };

  const buttonStyle = getVariantStyles();
  const textColor = getTextColor();

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "primary" || variant === "destructive"
              ? "#FFFFFF"
              : theme.colors.primary
          }
        />
      ) : (
        <ThemedText color={textColor as any}>{children}</ThemedText>
      )}
    </TouchableOpacity>
  );
}
