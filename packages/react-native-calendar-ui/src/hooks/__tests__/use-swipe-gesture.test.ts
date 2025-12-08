import { renderHook } from "@testing-library/react";
import { useSwipeGesture } from "../use-swipe-gesture";

describe("useSwipeGesture Hook", () => {
  describe("Initialization", () => {
    it("should return touch handlers", () => {
      const { result } = renderHook(() => useSwipeGesture());

      expect(result.current.onTouchStart).toBeDefined();
      expect(result.current.onTouchEnd).toBeDefined();
      expect(typeof result.current.onTouchStart).toBe("function");
      expect(typeof result.current.onTouchEnd).toBe("function");
    });
  });

  describe("Swipe Detection", () => {
    it("should detect left swipe", () => {
      const onSwipeLeft = jest.fn();
      const { result } = renderHook(() => useSwipeGesture({ onSwipeLeft }));

      const touchStartEvent = {
        nativeEvent: { pageX: 200, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeLeft).toHaveBeenCalled();
    });

    it("should detect right swipe", () => {
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() => useSwipeGesture({ onSwipeRight }));

      const touchStartEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 200, pageY: 100 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeRight).toHaveBeenCalled();
    });

    it("should not trigger swipe if distance is too small", () => {
      const onSwipeLeft = jest.fn();
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() =>
        useSwipeGesture({
          onSwipeLeft,
          onSwipeRight,
          minSwipeDistance: 100,
        })
      );

      const touchStartEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 130, pageY: 100 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeLeft).not.toHaveBeenCalled();
      expect(onSwipeRight).not.toHaveBeenCalled();
    });

    it("should not trigger swipe if vertical movement is too large", () => {
      const onSwipeLeft = jest.fn();
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() =>
        useSwipeGesture({
          onSwipeLeft,
          onSwipeRight,
          maxVerticalMovement: 50,
        })
      );

      const touchStartEvent = {
        nativeEvent: { pageX: 200, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 100, pageY: 200 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeLeft).not.toHaveBeenCalled();
      expect(onSwipeRight).not.toHaveBeenCalled();
    });

    it("should use default minSwipeDistance of 50", () => {
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() => useSwipeGesture({ onSwipeRight }));

      const touchStartEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 151, pageY: 100 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeRight).toHaveBeenCalled();
    });

    it("should use default maxVerticalMovement of 100", () => {
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() => useSwipeGesture({ onSwipeRight }));

      const touchStartEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 200, pageY: 150 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeRight).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle touchEnd without touchStart", () => {
      const onSwipeLeft = jest.fn();
      const { result } = renderHook(() => useSwipeGesture({ onSwipeLeft }));

      const touchEndEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it("should handle multiple swipes in sequence", () => {
      const onSwipeLeft = jest.fn();
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() =>
        useSwipeGesture({ onSwipeLeft, onSwipeRight })
      );

      const touchStart1 = {
        nativeEvent: { pageX: 200, pageY: 100 },
      } as any;

      const touchEnd1 = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      result.current.onTouchStart(touchStart1);
      result.current.onTouchEnd(touchEnd1);

      const touchStart2 = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      const touchEnd2 = {
        nativeEvent: { pageX: 200, pageY: 100 },
      } as any;

      result.current.onTouchStart(touchStart2);
      result.current.onTouchEnd(touchEnd2);

      expect(onSwipeLeft).toHaveBeenCalledTimes(1);
      expect(onSwipeRight).toHaveBeenCalledTimes(1);
    });

    it("should work without callbacks", () => {
      const { result } = renderHook(() => useSwipeGesture());

      const touchStartEvent = {
        nativeEvent: { pageX: 200, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      expect(() => {
        result.current.onTouchStart(touchStartEvent);
        result.current.onTouchEnd(touchEndEvent);
      }).not.toThrow();
    });
  });

  describe("Custom Configuration", () => {
    it("should respect custom minSwipeDistance", () => {
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() =>
        useSwipeGesture({
          onSwipeRight,
          minSwipeDistance: 150,
        })
      );

      const touchStartEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 200, pageY: 100 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeRight).not.toHaveBeenCalled();
    });

    it("should respect custom maxVerticalMovement", () => {
      const onSwipeRight = jest.fn();
      const { result } = renderHook(() =>
        useSwipeGesture({
          onSwipeRight,
          maxVerticalMovement: 20,
        })
      );

      const touchStartEvent = {
        nativeEvent: { pageX: 100, pageY: 100 },
      } as any;

      const touchEndEvent = {
        nativeEvent: { pageX: 200, pageY: 125 },
      } as any;

      result.current.onTouchStart(touchStartEvent);
      result.current.onTouchEnd(touchEndEvent);

      expect(onSwipeRight).not.toHaveBeenCalled();
    });
  });
});
