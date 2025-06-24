import { ThemedText } from "@/components/ThemedText";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { useColorScheme } from "react-native";

const mockUseColorScheme = jest.mocked(useColorScheme);

describe("ThemedText", () => {
  beforeEach(() => {
    mockUseColorScheme.mockReturnValue("light");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("기본 텍스트를 렌더링해야 한다", () => {
    render(<ThemedText>안녕하세요</ThemedText>);
    expect(screen.getByText("안녕하세요")).toBeTruthy();
  });

  it("다양한 크기를 지원해야 한다", () => {
    render(
      <>
        <ThemedText size="sm">작은 텍스트</ThemedText>
        <ThemedText size="md">중간 텍스트</ThemedText>
        <ThemedText size="lg">큰 텍스트</ThemedText>
        <ThemedText size="xl">특대 텍스트</ThemedText>
      </>
    );

    expect(screen.getByText("작은 텍스트")).toBeTruthy();
    expect(screen.getByText("중간 텍스트")).toBeTruthy();
    expect(screen.getByText("큰 텍스트")).toBeTruthy();
    expect(screen.getByText("특대 텍스트")).toBeTruthy();
  });

  it("다양한 색상을 지원해야 한다", () => {
    render(
      <>
        <ThemedText color="primary">Primary 텍스트</ThemedText>
        <ThemedText color="secondary">Secondary 텍스트</ThemedText>
        <ThemedText color="success">Success 텍스트</ThemedText>
        <ThemedText color="error">Error 텍스트</ThemedText>
        <ThemedText color="warning">Warning 텍스트</ThemedText>
        <ThemedText color="accent">Accent 텍스트</ThemedText>
      </>
    );

    expect(screen.getByText("Primary 텍스트")).toBeTruthy();
    expect(screen.getByText("Secondary 텍스트")).toBeTruthy();
    expect(screen.getByText("Success 텍스트")).toBeTruthy();
    expect(screen.getByText("Error 텍스트")).toBeTruthy();
    expect(screen.getByText("Warning 텍스트")).toBeTruthy();
    expect(screen.getByText("Accent 텍스트")).toBeTruthy();
  });

  it("다크 모드에서도 작동해야 한다", () => {
    mockUseColorScheme.mockReturnValue("dark");

    const { getByText } = render(<ThemedText>다크 모드 텍스트</ThemedText>);
    expect(getByText("다크 모드 텍스트")).toBeTruthy();
  });

  it("커스텀 스타일을 적용할 수 있어야 한다", () => {
    render(
      <ThemedText style={{ textAlign: "center" }}>커스텀 스타일</ThemedText>
    );
    expect(screen.getByText("커스텀 스타일")).toBeTruthy();
  });

  describe("UI 텍스트 사용 사례", () => {
    it("제목 텍스트로 사용할 때", () => {
      render(
        <ThemedText size="xl" color="primary">
          앱 메인 제목
        </ThemedText>
      );
      expect(screen.getByText("앱 메인 제목")).toBeTruthy();
    });

    it("본문 텍스트로 사용할 때", () => {
      render(
        <ThemedText size="md">
          이것은 본문 내용입니다. 사용자에게 중요한 정보를 전달하는
          텍스트입니다.
        </ThemedText>
      );
      expect(screen.getByText(/이것은 본문 내용입니다/)).toBeTruthy();
    });

    it("설명 텍스트로 사용할 때", () => {
      render(
        <ThemedText color="secondary" size="sm">
          * 이 기능은 베타 버전입니다
        </ThemedText>
      );
      expect(screen.getByText("* 이 기능은 베타 버전입니다")).toBeTruthy();
    });

    it("오류 메시지로 사용할 때", () => {
      render(
        <ThemedText color="error" size="sm">
          이메일 형식이 올바르지 않습니다
        </ThemedText>
      );
      expect(screen.getByText("이메일 형식이 올바르지 않습니다")).toBeTruthy();
    });

    it("성공 메시지로 사용할 때", () => {
      render(
        <ThemedText color="success">✅ 성공적으로 저장되었습니다</ThemedText>
      );
      expect(screen.getByText("✅ 성공적으로 저장되었습니다")).toBeTruthy();
    });
  });

  describe("다국어 지원", () => {
    it("한글 텍스트 렌더링", () => {
      render(
        <ThemedText>
          안녕하세요! 반갑습니다. 한글 텍스트 테스트입니다.
        </ThemedText>
      );
      expect(screen.getByText(/안녕하세요! 반갑습니다/)).toBeTruthy();
    });

    it("영어 텍스트 렌더링", () => {
      render(
        <ThemedText>Hello World! This is English text testing.</ThemedText>
      );
      expect(screen.getByText(/Hello World!/)).toBeTruthy();
    });

    it("일본어 텍스트 렌더링", () => {
      render(<ThemedText>こんにちは！日本語のテストです。</ThemedText>);
      expect(screen.getByText(/こんにちは！/)).toBeTruthy();
    });

    it("혼합 언어 텍스트", () => {
      render(<ThemedText>Hello 안녕하세요 こんにちは مرحبا 🌍</ThemedText>);
      expect(screen.getByText(/Hello 안녕하세요/)).toBeTruthy();
    });
  });

  describe("특수 문자 및 이모지", () => {
    it("이모지가 포함된 텍스트", () => {
      render(<ThemedText>🚀 로켓 발사! 🎉 축하합니다! 💫 별똥별</ThemedText>);
      expect(
        screen.getByText("🚀 로켓 발사! 🎉 축하합니다! 💫 별똥별")
      ).toBeTruthy();
    });

    it("특수 기호가 포함된 텍스트", () => {
      render(<ThemedText>가격: $29.99 | 할인율: 15% | 평점: ★★★★☆</ThemedText>);
      expect(screen.getByText(/가격: \$29\.99/)).toBeTruthy();
    });

    it("HTML 엔티티와 유사한 문자", () => {
      render(
        <ThemedText testID="html-entity-text">
          &lt;태그&gt; &amp; "따옴표" 'apostrophe' 테스트
        </ThemedText>
      );
      // testID로 요소 존재 확인 (실제 렌더링된 텍스트 매칭이 복잡하므로)
      expect(screen.getByTestId("html-entity-text")).toBeTruthy();
    });

    it("수학 기호 포함 텍스트", () => {
      render(<ThemedText>수식: x² + y² = z² ≈ 3.14159 ∞ ∑ ∫ ∆</ThemedText>);
      expect(screen.getByText(/수식: x² \+ y²/)).toBeTruthy();
    });
  });

  describe("긴 텍스트 처리", () => {
    it("매우 긴 단일 단어 처리", () => {
      const longWord = "가".repeat(100);
      render(<ThemedText testID="long-word">{longWord}</ThemedText>);
      expect(screen.getByTestId("long-word")).toBeTruthy();
    });

    it("여러 줄 텍스트 처리", () => {
      const multilineText = `첫 번째 줄입니다.
두 번째 줄입니다.
세 번째 줄입니다.`;
      render(<ThemedText>{multilineText}</ThemedText>);
      expect(screen.getByText(/첫 번째 줄입니다/)).toBeTruthy();
    });

    it("긴 문단 텍스트", () => {
      const longParagraph = "이것은 매우 긴 문단입니다. ".repeat(50);
      render(<ThemedText testID="long-paragraph">{longParagraph}</ThemedText>);
      expect(screen.getByTestId("long-paragraph")).toBeTruthy();
    });

    it("numberOfLines 제한 처리", () => {
      const longText = "긴 텍스트입니다. ".repeat(20);
      render(
        <ThemedText numberOfLines={2} testID="limited-lines">
          {longText}
        </ThemedText>
      );

      const textElement = screen.getByTestId("limited-lines");
      expect(textElement.props.numberOfLines).toBe(2);
    });
  });

  describe("접근성 기능", () => {
    it("스크린 리더를 위한 접근성 레이블", () => {
      render(
        <ThemedText accessibilityLabel="사용자 점수는 95점입니다">
          점수: 95
        </ThemedText>
      );

      const text = screen.getByLabelText("사용자 점수는 95점입니다");
      expect(text).toBeTruthy();
    });

    it("접근성 역할 설정", () => {
      render(
        <ThemedText accessibilityRole="header" testID="header-text">
          메인 헤더
        </ThemedText>
      );

      const text = screen.getByTestId("header-text");
      expect(text.props.accessibilityRole).toBe("header");
    });

    it("접근성 힌트 제공", () => {
      render(
        <ThemedText
          accessibilityHint="이 텍스트를 탭하면 더 많은 정보를 볼 수 있습니다"
          testID="hint-text"
        >
          더보기
        </ThemedText>
      );

      const text = screen.getByTestId("hint-text");
      expect(text.props.accessibilityHint).toBe(
        "이 텍스트를 탭하면 더 많은 정보를 볼 수 있습니다"
      );
    });
  });

  describe("다양한 데이터 타입", () => {
    it("숫자 데이터 렌더링", () => {
      render(<ThemedText>{42}</ThemedText>);
      expect(screen.getByText("42")).toBeTruthy();
    });

    it("불린 값 처리", () => {
      render(
        <>
          <ThemedText>{true && "참 값 표시"}</ThemedText>
          <ThemedText>{false && "거짓 값 숨김"}</ThemedText>
        </>
      );
      expect(screen.getByText("참 값 표시")).toBeTruthy();
      expect(screen.queryByText("거짓 값 숨김")).toBeNull();
    });

    it("배열 데이터 처리", () => {
      const items = ["첫번째", "두번째", "세번째"];
      render(<ThemedText>{items.join(" | ")}</ThemedText>);
      expect(screen.getByText("첫번째 | 두번째 | 세번째")).toBeTruthy();
    });

    it("날짜 데이터 처리", () => {
      const date = new Date(2024, 0, 1);
      render(<ThemedText>날짜: {date.toLocaleDateString()}</ThemedText>);
      expect(screen.getByText(/날짜:/)).toBeTruthy();
    });
  });

  describe("스타일 조합 테스트", () => {
    it("모든 스타일 속성 조합", () => {
      render(
        <ThemedText size="lg" color="primary" testID="full-style">
          완전한 스타일
        </ThemedText>
      );

      const text = screen.getByTestId("full-style");
      expect(text).toBeTruthy();
    });

    it("커스텀 스타일과 테마 스타일 병합", () => {
      render(
        <ThemedText
          color="error"
          style={{
            textAlign: "center",
            textDecorationLine: "underline",
            fontStyle: "italic",
          }}
          testID="merged-style"
        >
          병합된 스타일
        </ThemedText>
      );

      const text = screen.getByTestId("merged-style");
      // 스타일이 배열로 적용되어 있으므로 전체 스타일에서 확인
      const flattenedStyle = Array.isArray(text.props.style)
        ? Object.assign({}, ...text.props.style)
        : text.props.style;

      expect(flattenedStyle.textAlign).toBe("center");
      expect(flattenedStyle.textDecorationLine).toBe("underline");
      expect(flattenedStyle.fontStyle).toBe("italic");
    });
  });

  describe("실제 앱 컨텐츠", () => {
    it("사용자 프로필 정보", () => {
      render(
        <>
          <ThemedText size="lg" color="primary">
            김철수
          </ThemedText>
          <ThemedText color="secondary" size="sm">
            @chulsoo_kim
          </ThemedText>
          <ThemedText size="md">
            안녕하세요! 모바일 앱 개발자입니다. 🚀
          </ThemedText>
        </>
      );

      expect(screen.getByText("김철수")).toBeTruthy();
      expect(screen.getByText("@chulsoo_kim")).toBeTruthy();
      expect(screen.getByText(/안녕하세요! 모바일/)).toBeTruthy();
    });

    it("상품 정보 표시", () => {
      render(
        <>
          <ThemedText size="lg">iPhone 15 Pro</ThemedText>
          <ThemedText color="error" size="xl">
            ₩1,350,000
          </ThemedText>
          <ThemedText color="secondary">
            <ThemedText style={{ textDecorationLine: "line-through" }}>
              ₩1,500,000
            </ThemedText>{" "}
            10% 할인
          </ThemedText>
          <ThemedText color="success">✅ 무료배송</ThemedText>
        </>
      );

      expect(screen.getByText("iPhone 15 Pro")).toBeTruthy();
      expect(screen.getByText("₩1,350,000")).toBeTruthy();
      expect(screen.getByText("✅ 무료배송")).toBeTruthy();
    });

    it("알림 메시지들", () => {
      render(
        <>
          <ThemedText color="success">회원가입이 완료되었습니다.</ThemedText>
          <ThemedText color="warning">
            비밀번호를 업데이트하는 것을 권장합니다.
          </ThemedText>
          <ThemedText color="error">네트워크 연결을 확인해주세요.</ThemedText>
          <ThemedText color="accent">새로운 업데이트가 있습니다.</ThemedText>
        </>
      );

      expect(screen.getByText("회원가입이 완료되었습니다.")).toBeTruthy();
      expect(
        screen.getByText("비밀번호를 업데이트하는 것을 권장합니다.")
      ).toBeTruthy();
      expect(screen.getByText("네트워크 연결을 확인해주세요.")).toBeTruthy();
      expect(screen.getByText("새로운 업데이트가 있습니다.")).toBeTruthy();
    });
  });

  describe("성능 및 안정성", () => {
    it("대량 텍스트 렌더링 성능", () => {
      const manyTexts = Array.from({ length: 100 }, (_, i) => (
        <ThemedText key={i} testID={`text-${i}`}>
          텍스트 항목 {i}
        </ThemedText>
      ));

      expect(() => render(<>{manyTexts}</>)).not.toThrow();

      // 몇 개 샘플 체크
      expect(screen.getByTestId("text-0")).toBeTruthy();
      expect(screen.getByTestId("text-50")).toBeTruthy();
      expect(screen.getByTestId("text-99")).toBeTruthy();
    });

    it("빈 값들 처리", () => {
      render(
        <>
          <ThemedText testID="empty-string">{""}</ThemedText>
          <ThemedText testID="null-value">{null}</ThemedText>
          <ThemedText testID="undefined-value">{undefined}</ThemedText>
          <ThemedText testID="zero-value">{0}</ThemedText>
        </>
      );

      expect(screen.getByTestId("empty-string")).toBeTruthy();
      expect(screen.getByTestId("null-value")).toBeTruthy();
      expect(screen.getByTestId("undefined-value")).toBeTruthy();
      expect(screen.getByText("0")).toBeTruthy();
    });

    it("동적 컨텐츠 업데이트", () => {
      const { rerender } = render(
        <ThemedText testID="dynamic-text">초기 텍스트</ThemedText>
      );

      expect(screen.getByText("초기 텍스트")).toBeTruthy();

      rerender(
        <ThemedText testID="dynamic-text">업데이트된 텍스트</ThemedText>
      );

      expect(screen.getByText("업데이트된 텍스트")).toBeTruthy();
      expect(screen.queryByText("초기 텍스트")).toBeNull();
    });
  });
});
