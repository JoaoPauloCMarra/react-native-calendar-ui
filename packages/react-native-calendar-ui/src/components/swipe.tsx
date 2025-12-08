import React, { ReactNode } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export interface SwipeProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  children: ReactNode;
  minSwipeDistance?: number;
}

export function Swipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  children,
  minSwipeDistance = 50,
}: SwipeProps) {
  const pan = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;
    const absX = Math.abs(translationX);
    const absY = Math.abs(translationY);

    if (absX > absY && absX >= minSwipeDistance) {
      if (translationX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    } else if (absY >= minSwipeDistance) {
      if (translationY > 0) {
        onSwipeDown?.();
      } else {
        onSwipeUp?.();
      }
    }
  });

  return <GestureDetector gesture={pan}>{children}</GestureDetector>;
}
