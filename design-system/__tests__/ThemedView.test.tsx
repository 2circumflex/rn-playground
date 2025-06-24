import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { render, screen } from "@testing-library/react-native";
import React from "react";
import { useColorScheme } from "react-native";

const mockUseColorScheme = jest.mocked(useColorScheme);

describe("ThemedView", () => {
  beforeEach(() => {
    mockUseColorScheme.mockReturnValue("light");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("자식 요소들을 렌더링해야 한다", () => {
    render(
      <ThemedView>
        <ThemedText>테스트 텍스트</ThemedText>
      </ThemedView>
    );
    expect(screen.getByText("테스트 텍스트")).toBeTruthy();
  });

  it("다양한 배경색을 지원해야 한다", () => {
    render(
      <>
        <ThemedView testID="default-view">
          <ThemedText>기본 배경</ThemedText>
        </ThemedView>
        <ThemedView background="surface" testID="surface-view">
          <ThemedText>서피스 배경</ThemedText>
        </ThemedView>
      </>
    );

    expect(screen.getByTestId("default-view")).toBeTruthy();
    expect(screen.getByTestId("surface-view")).toBeTruthy();
  });

  it("다크 모드에서도 작동해야 한다", () => {
    mockUseColorScheme.mockReturnValue("dark");

    const { getByText } = render(
      <ThemedView>
        <ThemedText>다크 모드 뷰</ThemedText>
      </ThemedView>
    );
    expect(getByText("다크 모드 뷰")).toBeTruthy();
  });

  it("커스텀 스타일을 적용할 수 있어야 한다", () => {
    render(
      <ThemedView testID="custom-view" style={{ padding: 20 }}>
        <ThemedText>커스텀 스타일</ThemedText>
      </ThemedView>
    );
    expect(screen.getByTestId("custom-view")).toBeTruthy();
  });
});
