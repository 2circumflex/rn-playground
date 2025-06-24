import {
  BorderRadius,
  Colors,
  FontSize,
  Spacing,
} from "@/constants/DesignTokens";

describe("DesignTokens", () => {
  describe("Colors", () => {
    it("라이트 모드 색상이 정의되어 있어야 한다", () => {
      expect(Colors.light).toBeDefined();
      expect(Colors.light.primary).toBe("#007AFF");
      expect(Colors.light.background).toBe("#FFFFFF");
      expect(Colors.light.text).toBe("#000000");
    });

    it("다크 모드 색상이 정의되어 있어야 한다", () => {
      expect(Colors.dark).toBeDefined();
      expect(Colors.dark.primary).toBe("#0A84FF");
      expect(Colors.dark.background).toBe("#000000");
      expect(Colors.dark.text).toBe("#FFFFFF");
    });

    it("의미적 색상들이 정의되어 있어야 한다", () => {
      expect(Colors.light.success).toBe("#22C55E");
      expect(Colors.light.error).toBe("#EF4444");
      expect(Colors.light.warning).toBe("#F59E0B");
      expect(Colors.light.accent).toBe(Colors.light.primary);
    });
  });

  describe("Spacing", () => {
    it("모든 간격 값이 정의되어 있어야 한다", () => {
      expect(Spacing.xs).toBe(4);
      expect(Spacing.sm).toBe(8);
      expect(Spacing.md).toBe(16);
      expect(Spacing.lg).toBe(24);
      expect(Spacing.xl).toBe(32);
    });

    it("간격 값들이 증가하는 순서여야 한다", () => {
      expect(Spacing.xs).toBeLessThan(Spacing.sm);
      expect(Spacing.sm).toBeLessThan(Spacing.md);
      expect(Spacing.md).toBeLessThan(Spacing.lg);
      expect(Spacing.lg).toBeLessThan(Spacing.xl);
    });
  });

  describe("BorderRadius", () => {
    it("모든 경계선 반경 값이 정의되어 있어야 한다", () => {
      expect(BorderRadius.sm).toBe(8);
      expect(BorderRadius.md).toBe(12);
      expect(BorderRadius.lg).toBe(16);
    });
  });

  describe("FontSize", () => {
    it("모든 폰트 크기 값이 정의되어 있어야 한다", () => {
      expect(FontSize.sm).toBe(14);
      expect(FontSize.md).toBe(16);
      expect(FontSize.lg).toBe(18);
      expect(FontSize.xl).toBe(24);
    });
  });
});
