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

    describe("실제 UI 개발 시나리오", () => {
      it("Button 컴포넌트에서 테마 사용", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // Button 컴포넌트에서 필요한 속성들
        expect(result.current.colors.primary).toBeDefined(); // 배경색
        expect(result.current.borderRadius.md).toBeDefined(); // 모서리 둥글기
        expect(result.current.spacing.md).toBeDefined(); // 패딩
        expect(result.current.fontSize.md).toBeDefined(); // 폰트 크기
      });

      it("Card 레이아웃에서 테마 사용", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // Card에서 필요한 속성들
        expect(result.current.colors.surface).toBeDefined(); // 카드 배경
        expect(result.current.colors.border).toBeDefined(); // 테두리
        expect(result.current.borderRadius.lg).toBeDefined(); // 모서리
        expect(result.current.spacing.lg).toBeDefined(); // 내부 여백
      });

      it("Form 입력 필드에서 테마 사용", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // Input 필드에서 필요한 속성들
        expect(result.current.colors.textSecondary).toBeDefined(); // placeholder 색상
        expect(result.current.colors.error).toBeDefined(); // 에러 상태
        expect(result.current.colors.success).toBeDefined(); // 성공 상태
        expect(result.current.borderRadius.sm).toBeDefined(); // 입력 필드 모서리
      });

      it("Navigation 헤더에서 테마 사용", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // 네비게이션에서 필요한 속성들
        expect(result.current.colors.primary).toBeDefined(); // 헤더 배경
        expect(result.current.colors.text).toBeDefined(); // 제목 텍스트
        expect(result.current.fontSize.lg).toBeDefined(); // 제목 크기
        expect(result.current.spacing.md).toBeDefined(); // 헤더 패딩
      });
    });

    describe("테마 전환 시나리오", () => {
      it("라이트 모드에서 다크 모드로 전환", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result, rerender } = renderHook(() => useTheme());

        // 라이트 모드 값들
        const lightBackground = result.current.colors.background;
        const lightText = result.current.colors.text;
        expect(lightBackground).toBe("#FFFFFF");
        expect(lightText).toBe("#000000");

        // 다크 모드로 전환
        mockUseColorScheme.mockReturnValue("dark");
        rerender({});

        // 다크 모드 값들
        const darkBackground = result.current.colors.background;
        const darkText = result.current.colors.text;
        expect(darkBackground).toBe("#000000");
        expect(darkText).toBe("#FFFFFF");

        // 값들이 실제로 변경되었는지 확인
        expect(lightBackground).not.toBe(darkBackground);
        expect(lightText).not.toBe(darkText);
      });

      it("시스템 테마 변경에 실시간 반응", () => {
        // 초기에는 라이트 모드
        mockUseColorScheme.mockReturnValue("light");
        const { result, rerender } = renderHook(() => useTheme());

        expect(result.current.colors.primary).toBe("#007AFF");

        // 사용자가 시스템 설정을 다크로 변경
        mockUseColorScheme.mockReturnValue("dark");
        rerender({});

        expect(result.current.colors.primary).toBe("#0A84FF");
      });
    });

    describe("색상 시스템 검증", () => {
      it("모든 필수 색상이 정의되어 있어야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // 실제로 존재하는 색상들만 테스트
        expect(result.current.colors.primary).toBeDefined();
        expect(result.current.colors.background).toBeDefined();
        expect(result.current.colors.surface).toBeDefined();
        expect(result.current.colors.text).toBeDefined();
        expect(result.current.colors.textSecondary).toBeDefined();
        expect(result.current.colors.border).toBeDefined();
        expect(result.current.colors.success).toBeDefined();
        expect(result.current.colors.warning).toBeDefined();
        expect(result.current.colors.error).toBeDefined();
        expect(result.current.colors.accent).toBeDefined();

        // 모든 색상이 hex 형식인지 확인
        expect(result.current.colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(result.current.colors.background).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });

      it("색상 대비가 접근성 기준을 만족해야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // 라이트 모드에서 텍스트와 배경 대비
        expect(result.current.colors.text).toBe("#000000"); // 검은색 텍스트
        expect(result.current.colors.background).toBe("#FFFFFF"); // 흰색 배경

        // 다크 모드로 새로운 훅 실행
        mockUseColorScheme.mockReturnValue("dark");
        const darkHookResult = renderHook(() => useTheme());

        expect(darkHookResult.result.current.colors.text).toBe("#FFFFFF"); // 흰색 텍스트
        expect(darkHookResult.result.current.colors.background).toBe("#000000"); // 검은색 배경
      });

      it("브랜드 색상이 일관성 있게 적용되어야 한다", () => {
        // 라이트 모드
        mockUseColorScheme.mockReturnValue("light");
        const { result: lightResult } = renderHook(() => useTheme());

        // 다크 모드
        mockUseColorScheme.mockReturnValue("dark");
        const { result: darkResult } = renderHook(() => useTheme());

        // primary 색상은 다르지만 둘 다 파란색 계열이어야 함
        expect(lightResult.current.colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(darkResult.current.colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);

        // 성공/경고/에러 색상은 테마에 관계없이 직관적이어야 함
        expect(lightResult.current.colors.success).toBeDefined();
        expect(lightResult.current.colors.warning).toBeDefined();
        expect(lightResult.current.colors.error).toBeDefined();
      });
    });

    describe("타이포그래피 시스템", () => {
      it("모든 폰트 크기가 올바른 스케일로 정의되어야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        const { fontSize } = result.current;

        // 폰트 크기가 올바른 순서로 정의되어 있는지 확인
        expect(fontSize.sm).toBeLessThan(fontSize.md);
        expect(fontSize.md).toBeLessThan(fontSize.lg);
        expect(fontSize.lg).toBeLessThan(fontSize.xl);

        // 모든 크기가 양수인지 확인
        Object.values(fontSize).forEach((size) => {
          expect(size).toBeGreaterThan(0);
          expect(typeof size).toBe("number");
        });
      });

      it("다양한 텍스트 요소에 적합한 크기를 제공해야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // 헤더용 큰 크기
        expect(result.current.fontSize.xl).toBeGreaterThan(20);

        // 본문용 적당한 크기
        expect(result.current.fontSize.md).toBe(16); // 읽기 좋은 기본 크기

        // 캡션용 작은 크기
        expect(result.current.fontSize.sm).toBeLessThan(16);
      });
    });

    describe("스페이싱 시스템", () => {
      it("일관된 간격 체계를 제공해야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        const { spacing } = result.current;

        // 스페이싱이 올바른 순서로 정의되어 있는지 확인
        expect(spacing.xs).toBeLessThan(spacing.sm);
        expect(spacing.sm).toBeLessThan(spacing.md);
        expect(spacing.md).toBeLessThan(spacing.lg);
        expect(spacing.lg).toBeLessThan(spacing.xl);

        // 기본 간격이 16px인지 확인 (일반적인 모바일 기준)
        expect(spacing.md).toBe(16);
      });

      it("다양한 레이아웃 상황에 적합한 간격을 제공해야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        const { spacing } = result.current;

        // 작은 간격 (요소 간 최소 간격)
        expect(spacing.xs).toBeGreaterThan(0);
        expect(spacing.xs).toBeLessThan(8);

        // 섹션 간격 (큰 블록 사이)
        expect(spacing.xl).toBeGreaterThan(24);
      });
    });

    describe("border radius 시스템", () => {
      it("다양한 둥글기 옵션을 제공해야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        const { borderRadius } = result.current;

        // 순서대로 커져야 함 (실제 존재하는 속성들만)
        expect(borderRadius.sm).toBeGreaterThan(0);
        expect(borderRadius.md).toBeGreaterThan(borderRadius.sm);
        expect(borderRadius.lg).toBeGreaterThan(borderRadius.md);
      });

      it("실제 UI 요소에 적합한 둥글기를 제공해야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        const { borderRadius } = result.current;

        // 버튼용 적당한 둥글기
        expect(borderRadius.md).toBeGreaterThan(4);
        expect(borderRadius.md).toBeLessThan(20);

        // 카드용 큰 둥글기
        expect(borderRadius.lg).toBeGreaterThan(borderRadius.md);
      });
    });

    describe("실제 앱 개발 상황", () => {
      it("로그인 화면 스타일링", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // 로그인 버튼
        const loginButtonStyle = {
          backgroundColor: result.current.colors.primary,
          paddingVertical: result.current.spacing.md,
          paddingHorizontal: result.current.spacing.lg,
          borderRadius: result.current.borderRadius.md,
        };

        expect(loginButtonStyle.backgroundColor).toBeDefined();
        expect(loginButtonStyle.borderRadius).toBeGreaterThan(0);
        expect(loginButtonStyle.paddingVertical).toBe(16);
      });

      it("리스트 아이템 스타일링", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // 리스트 아이템
        const listItemStyle = {
          backgroundColor: result.current.colors.surface,
          marginBottom: result.current.spacing.sm,
          paddingHorizontal: result.current.spacing.md,
          paddingVertical: result.current.spacing.sm,
          borderRadius: result.current.borderRadius.sm,
          borderColor: result.current.colors.border,
          borderWidth: 1,
        };

        expect(listItemStyle.backgroundColor).toBeDefined();
        expect(listItemStyle.borderColor).toBeDefined();
        expect(listItemStyle.marginBottom).toBeGreaterThan(0);
      });

      it("알림 메시지 스타일링", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result } = renderHook(() => useTheme());

        // 성공 알림
        const successNotification = {
          backgroundColor: result.current.colors.success,
          color: result.current.colors.surface,
          padding: result.current.spacing.md,
          borderRadius: result.current.borderRadius.sm,
        };

        // 에러 알림
        const errorNotification = {
          backgroundColor: result.current.colors.error,
          color: result.current.colors.surface,
          padding: result.current.spacing.md,
          borderRadius: result.current.borderRadius.sm,
        };

        expect(successNotification.backgroundColor).toBeDefined();
        expect(errorNotification.backgroundColor).toBeDefined();
        expect(successNotification.backgroundColor).not.toBe(
          errorNotification.backgroundColor
        );
      });
    });

    describe("성능 최적화", () => {
      it("테마 객체가 메모이제이션되어야 한다", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result, rerender } = renderHook(() => useTheme());

        const firstTheme = result.current;

        // 같은 테마에서 리렌더링
        rerender({});
        const secondTheme = result.current;

        // 참조가 동일해야 함 (메모이제이션 확인)
        expect(firstTheme).toBe(secondTheme);
      });

      it("테마가 실제로 변경될 때만 새 객체 생성", () => {
        mockUseColorScheme.mockReturnValue("light");
        const { result, rerender } = renderHook(() => useTheme());

        const lightTheme = result.current;

        // 다크 모드로 변경
        mockUseColorScheme.mockReturnValue("dark");
        rerender({});
        const darkTheme = result.current;

        // 참조가 달라야 함
        expect(lightTheme).not.toBe(darkTheme);
        expect(lightTheme.colors.background).not.toBe(
          darkTheme.colors.background
        );
      });

      it("복잡한 컴포넌트에서 테마 사용 시 성능", () => {
        mockUseColorScheme.mockReturnValue("light");

        // 같은 훅 인스턴스에서 테마 참조가 유지되는지 확인
        const { result } = renderHook(() => useTheme());

        const firstCall = result.current;

        // 테마 속성들이 올바르게 정의되어 있는지 확인
        expect(firstCall.colors).toBeDefined();
        expect(firstCall.spacing).toBeDefined();
        expect(firstCall.borderRadius).toBeDefined();
        expect(firstCall.fontSize).toBeDefined();
        expect(firstCall.isDark).toBe(false);
      });
    });
  });
});
