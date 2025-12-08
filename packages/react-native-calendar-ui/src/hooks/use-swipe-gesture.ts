import { useCallback, useRef } from "react";
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

export function useSwipeGesture(
  options: UseSwipeGestureOptions = {}
): UseSwipeGestureReturn {
  const {
    onSwipeLeft,
    onSwipeRight,
    minSwipeDistance = 50,
    maxVerticalMovement = 100,
  } = options;

  const touchStartRef = useRef<TouchPosition | null>(null);

  const onTouchStart = useCallback((event: GestureResponderEvent) => {
    touchStartRef.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  }, []);

  const onTouchEnd = useCallback(
    (event: GestureResponderEvent) => {
      if (!touchStartRef.current) return;

      const touchEnd = {
        x: event.nativeEvent.pageX,
        y: event.nativeEvent.pageY,
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = Math.abs(touchEnd.y - touchStartRef.current.y);

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

      touchStartRef.current = null;
    },
    [onSwipeLeft, onSwipeRight, minSwipeDistance, maxVerticalMovement]
  );

  return {
    onTouchStart,
    onTouchEnd,
  };
}
