import { useTheme } from "@/hooks/useDesignSystem";
import { renderHook } from "@testing-library/react-native";
import { useColorScheme } from "react-native";

const mockUseColorScheme = jest.mocked(useColorScheme);

describe("useDesignSystem", () => {
  describe("useTheme", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("라이트 모드에서 올바른 테마를 반환해야 한다", () => {
      mockUseColorScheme.mockReturnValue("light");

      const { result } = renderHook(() => useTheme());

      expect(result.current.colors.primary).toBe("#007AFF");
      expect(result.current.colors.background).toBe("#FFFFFF");
      expect(result.current.colors.text).toBe("#000000");
    });

    it("다크 모드에서 올바른 테마를 반환해야 한다", () => {
      mockUseColorScheme.mockReturnValue("dark");

      const { result } = renderHook(() => useTheme());

      expect(result.current.colors.primary).toBe("#0A84FF");
      expect(result.current.colors.background).toBe("#000000");
      expect(result.current.colors.text).toBe("#FFFFFF");
    });

    it("null 값이 반환되면 라이트 모드를 기본값으로 사용해야 한다", () => {
      mockUseColorScheme.mockReturnValue(null);

      const { result } = renderHook(() => useTheme());

      expect(result.current.colors.primary).toBe("#007AFF");
      expect(result.current.colors.background).toBe("#FFFFFF");
    });

    it("spacing, borderRadius, fontSize 값이 포함되어야 한다", () => {
      mockUseColorScheme.mockReturnValue("light");

      const { result } = renderHook(() => useTheme());

      expect(result.current.spacing).toBeDefined();
      expect(result.current.spacing.md).toBe(16);

      expect(result.current.borderRadius).toBeDefined();
      expect(result.current.borderRadius.sm).toBe(8);

      expect(result.current.fontSize).toBeDefined();
      expect(result.current.fontSize.md).toBe(16);
    });
  });
});
