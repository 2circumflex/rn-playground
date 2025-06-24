import {
  BorderRadius,
  Colors,
  FontSize,
  Spacing,
} from "@/constants/DesignTokens";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return useMemo(
    () => ({
      colors: isDark ? Colors.dark : Colors.light,
      spacing: Spacing,
      borderRadius: BorderRadius,
      fontSize: FontSize,
      isDark,
    }),
    [isDark]
  );
}
