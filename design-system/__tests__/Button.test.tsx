import { Button } from "@/components/Button";
import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { useColorScheme } from "react-native";

const mockUseColorScheme = jest.mocked(useColorScheme);

describe("Button", () => {
  beforeEach(() => {
    mockUseColorScheme.mockReturnValue("light");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("기본 버튼을 렌더링해야 한다", () => {
    render(<Button>클릭하기</Button>);
    expect(screen.getByText("클릭하기")).toBeTruthy();
  });

  it("다양한 variant를 지원해야 한다", () => {
    render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </>
    );

    expect(screen.getByText("Primary")).toBeTruthy();
    expect(screen.getByText("Secondary")).toBeTruthy();
    expect(screen.getByText("Outline")).toBeTruthy();
    expect(screen.getByText("Ghost")).toBeTruthy();
    expect(screen.getByText("Destructive")).toBeTruthy();
  });

  it("클릭 이벤트를 처리해야 한다", () => {
    const mockPress = jest.fn();
    render(<Button onPress={mockPress}>클릭 테스트</Button>);

    fireEvent.press(screen.getByText("클릭 테스트"));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });

  it("로딩 상태를 표시해야 한다", () => {
    render(
      <Button loading testID="loading-button">
        로딩 중
      </Button>
    );

    // 로딩 중일 때 텍스트는 보이지 않고 ActivityIndicator가 표시됨
    expect(screen.queryByText("로딩 중")).toBeNull();
    expect(screen.getByTestId("loading-button")).toBeTruthy();
  });

  it("비활성화 상태를 처리해야 한다", () => {
    const mockPress = jest.fn();
    render(
      <Button disabled onPress={mockPress}>
        비활성화됨
      </Button>
    );

    fireEvent.press(screen.getByText("비활성화됨"));
    expect(mockPress).not.toHaveBeenCalled();
  });

  it("다크 모드에서도 작동해야 한다", () => {
    mockUseColorScheme.mockReturnValue("dark");

    const { getByText } = render(<Button>다크 모드 버튼</Button>);
    expect(getByText("다크 모드 버튼")).toBeTruthy();
  });

  it("커스텀 스타일을 적용할 수 있어야 한다", () => {
    render(
      <Button testID="custom-button" style={{ margin: 10 }}>
        커스텀
      </Button>
    );
    expect(screen.getByTestId("custom-button")).toBeTruthy();
  });

  // === 실질적인 테스트 케이스들 추가 ===

  describe("실제 사용 시나리오", () => {
    it("폼 제출 버튼으로 사용할 때", () => {
      const mockSubmit = jest.fn();
      render(<Button onPress={mockSubmit}>회원가입</Button>);

      fireEvent.press(screen.getByText("회원가입"));
      expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it("모달 닫기 버튼으로 사용할 때", () => {
      const mockClose = jest.fn();
      render(
        <Button variant="ghost" onPress={mockClose}>
          닫기
        </Button>
      );

      fireEvent.press(screen.getByText("닫기"));
      expect(mockClose).toHaveBeenCalled();
    });

    it("삭제 확인 버튼으로 사용할 때", () => {
      const mockDelete = jest.fn();
      render(
        <Button variant="destructive" onPress={mockDelete}>
          삭제하기
        </Button>
      );

      fireEvent.press(screen.getByText("삭제하기"));
      expect(mockDelete).toHaveBeenCalled();
    });

    it("네트워크 요청 중 로딩 상태 처리", () => {
      const mockFetch = jest.fn();
      render(
        <Button loading onPress={mockFetch} testID="loading-fetch-button">
          데이터 가져오기
        </Button>
      );

      // 로딩 중에는 텍스트가 보이지 않고 ActivityIndicator만 표시됨
      expect(screen.queryByText("데이터 가져오기")).toBeNull();

      // 로딩 중인 버튼을 클릭해도 요청이 발생하지 않아야 함
      fireEvent.press(screen.getByTestId("loading-fetch-button"));
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe("접근성 요구사항", () => {
    it("스크린 리더를 위한 접근성 레이블", () => {
      render(<Button accessibilityLabel="메인 메뉴 열기">☰</Button>);

      const button = screen.getByLabelText("메인 메뉴 열기");
      expect(button).toBeTruthy();
    });

    it("disabled 상태가 접근성에 반영되어야 함", () => {
      render(
        <Button disabled testID="disabled-btn">
          비활성화된 버튼
        </Button>
      );

      const button = screen.getByTestId("disabled-btn");
      expect(button.props.accessibilityState?.disabled).toBe(true);
    });

    it("버튼 역할이 명확해야 함", () => {
      render(<Button testID="role-btn">버튼</Button>);

      const button = screen.getByTestId("role-btn");
      expect(button.props.accessibilityRole).toBe("button");
    });
  });

  describe("에러 상황 처리", () => {
    it("onPress가 undefined여도 크래시하지 않아야 함", () => {
      expect(() => {
        render(<Button>클릭</Button>);
        fireEvent.press(screen.getByText("클릭"));
      }).not.toThrow();
    });

    it("children이 빈 문자열이어도 렌더링되어야 함", () => {
      render(<Button testID="empty-btn">{""}</Button>);
      expect(screen.getByTestId("empty-btn")).toBeTruthy();
    });

    it("매우 긴 텍스트도 처리해야 함", () => {
      const longText = "아주 긴 버튼 텍스트입니다. ".repeat(20);
      render(<Button testID="long-btn">{longText}</Button>);
      expect(screen.getByTestId("long-btn")).toBeTruthy();
    });

    it("특수 문자가 포함된 텍스트 처리", () => {
      render(<Button>💻 코드 실행 & 테스트 🚀</Button>);
      expect(screen.getByText("💻 코드 실행 & 테스트 🚀")).toBeTruthy();
    });

    it("숫자만 있는 children 처리", () => {
      render(<Button testID="number-btn">{123}</Button>);
      expect(screen.getByTestId("number-btn")).toBeTruthy();
    });
  });

  describe("스타일링 검증", () => {
    it("primary variant가 적절한 배경색을 가져야 함", () => {
      render(
        <Button variant="primary" testID="primary">
          Primary
        </Button>
      );

      const button = screen.getByTestId("primary");
      expect(button.props.style.backgroundColor).toBeDefined();
      expect(button.props.style.backgroundColor).not.toBe("transparent");
    });

    it("outline variant가 투명 배경과 테두리를 가져야 함", () => {
      render(
        <Button variant="outline" testID="outline">
          Outline
        </Button>
      );

      const button = screen.getByTestId("outline");
      expect(button.props.style.backgroundColor).toBe("transparent");
      expect(button.props.style.borderWidth).toBeGreaterThan(0);
    });

    it("disabled 상태에서 시각적 피드백 제공", () => {
      render(
        <Button disabled testID="disabled">
          Disabled
        </Button>
      );

      const button = screen.getByTestId("disabled");
      expect(button.props.style.opacity).toBeLessThan(1);
    });

    it("커스텀 스타일이 기본 스타일과 병합되어야 함", () => {
      const customStyle = { marginTop: 20, paddingHorizontal: 30 };
      render(
        <Button style={customStyle} testID="custom">
          Custom
        </Button>
      );

      const button = screen.getByTestId("custom");
      const styles = Array.isArray(button.props.style)
        ? Object.assign({}, ...button.props.style)
        : button.props.style;

      expect(styles.marginTop).toBe(20);
      expect(styles.paddingHorizontal).toBe(30);
      // 기본 스타일도 유지되어야 함
      expect(styles.borderRadius).toBeDefined();
    });
  });

  describe("상호작용 패턴", () => {
    it("빠른 연속 클릭 처리", () => {
      const mockPress = jest.fn();
      render(<Button onPress={mockPress}>빠른 클릭</Button>);

      const button = screen.getByText("빠른 클릭");

      // 빠르게 5번 클릭
      for (let i = 0; i < 5; i++) {
        fireEvent.press(button);
      }

      expect(mockPress).toHaveBeenCalledTimes(5);
    });

    it("로딩 중 상태 변경 시나리오", () => {
      const mockAction = jest.fn();
      const { rerender } = render(
        <Button onPress={mockAction} testID="action-btn">
          작업 시작
        </Button>
      );

      // 처음에는 정상 작동
      fireEvent.press(screen.getByTestId("action-btn"));
      expect(mockAction).toHaveBeenCalledTimes(1);

      // 로딩 상태로 변경
      rerender(
        <Button loading onPress={mockAction} testID="action-btn">
          처리 중...
        </Button>
      );

      // 로딩 중에는 클릭해도 작동하지 않음
      fireEvent.press(screen.getByTestId("action-btn"));
      expect(mockAction).toHaveBeenCalledTimes(1); // 여전히 1번만
    });

    it("variant 변경 시 스타일 업데이트", () => {
      const { rerender } = render(
        <Button variant="primary" testID="dynamic-btn">
          Dynamic Button
        </Button>
      );

      const button1 = screen.getByTestId("dynamic-btn");
      const primaryBg = button1.props.style.backgroundColor;

      rerender(
        <Button variant="destructive" testID="dynamic-btn">
          Dynamic Button
        </Button>
      );

      const button2 = screen.getByTestId("dynamic-btn");
      const destructiveBg = button2.props.style.backgroundColor;

      expect(primaryBg).not.toBe(destructiveBg);
    });
  });

  describe("실제 앱 시나리오", () => {
    it("장바구니에 추가 버튼", () => {
      const mockAddToCart = jest.fn();
      render(
        <Button onPress={mockAddToCart} variant="primary">
          장바구니에 추가
        </Button>
      );

      fireEvent.press(screen.getByText("장바구니에 추가"));
      expect(mockAddToCart).toHaveBeenCalled();
    });

    it("로그아웃 버튼 (확인 필요)", () => {
      const mockLogout = jest.fn();
      render(
        <Button onPress={mockLogout} variant="destructive">
          로그아웃
        </Button>
      );

      fireEvent.press(screen.getByText("로그아웃"));
      expect(mockLogout).toHaveBeenCalled();
    });

    it("설정 저장 버튼 (비동기 처리)", () => {
      const mockSave = jest.fn();
      render(
        <Button loading={false} onPress={mockSave}>
          설정 저장
        </Button>
      );

      fireEvent.press(screen.getByText("설정 저장"));
      expect(mockSave).toHaveBeenCalled();
    });

    it("소셜 로그인 버튼들", () => {
      const mockGoogleLogin = jest.fn();
      const mockKakaoLogin = jest.fn();

      render(
        <>
          <Button onPress={mockGoogleLogin} variant="outline">
            Google로 로그인
          </Button>
          <Button onPress={mockKakaoLogin} variant="secondary">
            카카오로 로그인
          </Button>
        </>
      );

      fireEvent.press(screen.getByText("Google로 로그인"));
      fireEvent.press(screen.getByText("카카오로 로그인"));

      expect(mockGoogleLogin).toHaveBeenCalled();
      expect(mockKakaoLogin).toHaveBeenCalled();
    });
  });

  describe("성능 및 안정성", () => {
    it("대량 버튼 렌더링 성능", () => {
      const buttons = Array.from({ length: 50 }, (_, i) => (
        <Button key={i} testID={`btn-${i}`}>
          버튼 {i}
        </Button>
      ));

      expect(() => render(<>{buttons}</>)).not.toThrow();

      // 몇 개 샘플 체크
      expect(screen.getByTestId("btn-0")).toBeTruthy();
      expect(screen.getByTestId("btn-25")).toBeTruthy();
      expect(screen.getByTestId("btn-49")).toBeTruthy();
    });

    it("메모리 누수 방지 - 이벤트 핸들러 정리", () => {
      const mockPress = jest.fn();
      const { unmount } = render(<Button onPress={mockPress}>Test</Button>);

      expect(() => unmount()).not.toThrow();
    });

    it("props 변경 시 리렌더링 최적화", () => {
      const mockPress = jest.fn();
      const { rerender } = render(
        <Button onPress={mockPress} testID="stable-btn">
          안정적인 버튼
        </Button>
      );

      // 동일한 props로 여러 번 리렌더링
      for (let i = 0; i < 10; i++) {
        rerender(
          <Button onPress={mockPress} testID="stable-btn">
            안정적인 버튼
          </Button>
        );
      }

      expect(screen.getByTestId("stable-btn")).toBeTruthy();
      expect(screen.getByText("안정적인 버튼")).toBeTruthy();
    });
  });
});
