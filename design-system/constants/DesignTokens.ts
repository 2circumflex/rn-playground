// 간단한 디자인 토큰
export const Colors = {
  // 라이트 모드 기본 색상
  light: {
    primary: "#007AFF", // iOS 블루
    background: "#FFFFFF",
    surface: "#F2F2F7", // iOS 배경
    text: "#000000",
    textSecondary: "#8E8E93",
    border: "#C6C6C8",
    // 의미적 색상들
    success: "#22C55E", // 녹색
    error: "#EF4444", // 빨간색
    warning: "#F59E0B", // 주황색
    accent: "#007AFF", // primary와 동일
  },
  // 다크 모드 색상
  dark: {
    primary: "#0A84FF", // iOS 다크 블루
    background: "#000000",
    surface: "#1C1C1E", // iOS 다크 배경
    text: "#FFFFFF",
    textSecondary: "#8E8E93",
    border: "#38383A",
    // 의미적 색상들
    success: "#22C55E", // 녹색
    error: "#EF4444", // 빨간색
    warning: "#F59E0B", // 주황색
    accent: "#0A84FF", // primary와 동일
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const FontSize = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
};
