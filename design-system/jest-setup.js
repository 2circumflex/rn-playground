// jest-expo preset이 대부분의 설정을 처리하므로 최소한의 설정만 필요

// React Native Gesture Handler 설정 (필요한 경우)
require("react-native-gesture-handler/jestSetup");

// 테스트용 글로벌 설정
global.__DEV__ = true;
