import React, { useCallback, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface CustomPullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => void;
  refreshing: boolean;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const REFRESH_HEIGHT = 100;
const TRIGGER_HEIGHT = 80;

export default function CustomPullToRefresh({
  children,
  onRefresh,
  refreshing,
}: CustomPullToRefreshProps) {
  const translateY = useRef(new Animated.Value(0)).current;
  const refreshOpacity = useRef(new Animated.Value(0)).current;
  const iconRotation = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  const isRefreshing = useRef(false);
  const shouldTriggerRefresh = useRef(false);

  // 아이콘 회전 애니메이션
  const startIconRotation = useCallback(() => {
    iconRotation.setValue(0);
    Animated.loop(
      Animated.timing(iconRotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const stopIconRotation = useCallback(() => {
    Animated.timing(iconRotation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  // 새로고침 완료 후 리셋
  React.useEffect(() => {
    if (!refreshing && isRefreshing.current) {
      isRefreshing.current = false;
      stopIconRotation();

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(refreshOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [refreshing]);

  // 새로고침 시작
  React.useEffect(() => {
    if (refreshing && !isRefreshing.current) {
      isRefreshing.current = true;
      startIconRotation();

      Animated.parallel([
        Animated.timing(refreshOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.back(1.2),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [refreshing]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return (
        gestureState.dy > 0 &&
        Math.abs(gestureState.dx) < Math.abs(gestureState.dy)
      );
    },

    onPanResponderMove: (_, gestureState) => {
      if (isRefreshing.current) return;

      const { dy } = gestureState;
      const pullDistance = Math.max(0, dy);
      const dampedDistance = pullDistance * 0.6; // 댐핑 효과

      if (dampedDistance > 0) {
        translateY.setValue(dampedDistance);

        // 당기는 거리에 따른 투명도 조절
        const opacity = Math.min(dampedDistance / TRIGGER_HEIGHT, 1);
        refreshOpacity.setValue(opacity);

        // 당기는 거리에 따른 스케일 조절
        const scale = Math.min(dampedDistance / TRIGGER_HEIGHT, 1);
        scaleValue.setValue(scale);

        // 트리거 지점 도달 체크
        shouldTriggerRefresh.current = dampedDistance >= TRIGGER_HEIGHT;
      }
    },

    onPanResponderRelease: () => {
      if (isRefreshing.current) return;

      if (shouldTriggerRefresh.current) {
        // 새로고침 트리거
        Animated.timing(translateY, {
          toValue: REFRESH_HEIGHT,
          duration: 200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start();

        onRefresh();
      } else {
        // 원래 위치로 복귀
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(refreshOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }

      shouldTriggerRefresh.current = false;
    },
  });

  const rotateInterpolate = iconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* 커스텀 새로고침 인디케이터 */}
      <Animated.View
        style={[
          styles.refreshContainer,
          {
            opacity: refreshOpacity,
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, REFRESH_HEIGHT],
                  outputRange: [-REFRESH_HEIGHT, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.refreshContent,
            {
              transform: [{ scale: scaleValue }, { rotate: rotateInterpolate }],
            },
          ]}
        >
          <View style={styles.refreshIcon}>
            <View style={styles.refreshDot} />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: scaleValue }}>
          <Text style={styles.refreshText}>
            {refreshing ? "새로고침 중..." : "당겨서 새로고침"}
          </Text>
        </Animated.View>
      </Animated.View>

      {/* 콘텐츠 */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refreshContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: REFRESH_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#f8f9fa",
  },
  refreshContent: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  refreshIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  refreshDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
  },
  refreshText: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
    color: "#000000",
  },
  content: {
    flex: 1,
  },
});
