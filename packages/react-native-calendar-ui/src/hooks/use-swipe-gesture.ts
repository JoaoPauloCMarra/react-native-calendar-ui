import { useCallback } from "react";
import { GestureResponderEvent } from "react-native";

export interface UseSwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minSwipeDistance?: number;
  maxVerticalMovement?: number;
}

export interface UseSwipeGestureReturn {
  onTouchStart: (event: GestureResponderEvent) => void;
  onTouchEnd: (event: GestureResponderEvent) => void;
}

interface TouchPosition {
  x: number;
  y: number;
}

let touchStart: TouchPosition | null = null;

export function useSwipeGesture(
  options: UseSwipeGestureOptions = {}
): UseSwipeGestureReturn {
  const {
    onSwipeLeft,
    onSwipeRight,
    minSwipeDistance = 50,
    maxVerticalMovement = 100,
  } = options;

  const onTouchStart = useCallback((event: GestureResponderEvent) => {
    touchStart = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  }, []);

  const onTouchEnd = useCallback(
    (event: GestureResponderEvent) => {
      if (!touchStart) return;

      const touchEnd = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };

      const deltaX = touchEnd.x - touchStart.x;
      const deltaY = Math.abs(touchEnd.y - touchStart.y);

      if (
        Math.abs(deltaX) >= minSwipeDistance &&
        deltaY <= maxVerticalMovement
      ) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }

      touchStart = null;
    },
    [onSwipeLeft, onSwipeRight, minSwipeDistance, maxVerticalMovement]
  );

  return {
    onTouchStart,
    onTouchEnd,
  };
}
