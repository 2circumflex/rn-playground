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
});
