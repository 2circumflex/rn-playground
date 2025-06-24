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
});
