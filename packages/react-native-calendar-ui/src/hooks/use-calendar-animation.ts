import { useState, useCallback, useRef } from "react";
import { Animated, Easing, Dimensions, ViewStyle } from "react-native";

export type AnimationType = "fade" | "slide" | "scale";
export type AnimationDirection = "left" | "right";

export interface UseCalendarAnimationOptions {
  animationType?: AnimationType;
  duration?: number;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}

export interface UseCalendarAnimationReturn {
  animatedStyle: Animated.WithAnimatedValue<ViewStyle>;
  triggerAnimation: (
    direction: AnimationDirection,
    callback: () => void
  ) => void;
}

export function useCalendarAnimation(
  options: UseCalendarAnimationOptions = {}
): UseCalendarAnimationReturn {
  const {
    animationType = "fade",
    duration = 300,
    onAnimationStart,
    onAnimationEnd,
  } = options;

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const triggerAnimation = useCallback(
    (direction: AnimationDirection, callback: () => void) => {
      onAnimationStart?.();

      const isLeft = direction === "left";

      switch (animationType) {
        case "fade":
          Animated.sequence([
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: duration / 2,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: duration / 2,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]).start(() => onAnimationEnd?.());
          setTimeout(callback, duration / 2);
          break;

        case "slide":
          const width = Dimensions.get("window").width;
          Animated.timing(slideAnim, {
            toValue: isLeft ? -width : width,
            duration: duration / 2,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }).start(() => {
            callback();
            slideAnim.setValue(isLeft ? width : -width);
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: duration / 2,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }).start(() => onAnimationEnd?.());
          });
          break;

        case "scale":
          scaleAnim.setValue(1);
          fadeAnim.setValue(1);
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 0.8,
              duration: duration / 2,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0,
              duration: duration / 2,
              easing: Easing.ease,
              useNativeDriver: true,
            }),
          ]).start(() => {
            callback();
            Animated.parallel([
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: duration / 2,
                easing: Easing.ease,
                useNativeDriver: true,
              }),
              Animated.timing(fadeAnim, {
                toValue: 1,
                duration: duration / 2,
                easing: Easing.ease,
                useNativeDriver: true,
              }),
            ]).start(() => onAnimationEnd?.());
          });
          break;

        default:
          callback();
          onAnimationEnd?.();
      }
    },
    [
      animationType,
      duration,
      fadeAnim,
      slideAnim,
      scaleAnim,
      onAnimationStart,
      onAnimationEnd,
    ]
  );

  const getAnimatedStyle = () => {
    switch (animationType) {
      case "fade":
        return { opacity: fadeAnim };
      case "slide":
        return {
          transform: [{ translateX: slideAnim }],
        };
      case "scale":
        return {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        };
      default:
        return {};
    }
  };

  return {
    animatedStyle: getAnimatedStyle(),
    triggerAnimation,
  };
}
