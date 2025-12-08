import { renderHook, act } from "@testing-library/react";
import { useCalendarAnimation } from "../use-calendar-animation";
import { Animated, Easing } from "react-native";

jest.mock("react-native", () => {
  return {
    Animated: {
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        interpolate: jest.fn(() => ({})),
      })),
      timing: jest.fn(() => ({
        start: jest.fn((callback) => callback && callback()),
      })),
      sequence: jest.fn((animations) => ({
        start: jest.fn((callback) => {
          animations.forEach((anim: any) => anim.start());
          callback && callback();
        }),
      })),
      parallel: jest.fn((animations) => ({
        start: jest.fn((callback) => {
          animations.forEach((anim: any) => anim.start());
          callback && callback();
        }),
      })),
    },
    Easing: {
      ease: jest.fn(),
      in: jest.fn((fn) => fn),
      out: jest.fn((fn) => fn),
      cubic: jest.fn(),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
    },
    ViewStyle: {},
  };
});

describe("useCalendarAnimation", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should initialize with default options", () => {
    const { result } = renderHook(() => useCalendarAnimation());
    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.triggerAnimation).toBeDefined();
  });

  it("should trigger callback immediately for unsupported animation types", () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      // @ts-ignore - Testing invalid type
      useCalendarAnimation({ animationType: "invalid" })
    );

    act(() => {
      // @ts-ignore
      result.current.triggerAnimation("left", callback);
    });

    expect(callback).toHaveBeenCalled();
  });

  it("should handle fade animation", () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();
    const callback = jest.fn();

    const { result } = renderHook(() =>
      useCalendarAnimation({
        animationType: "fade",
        onAnimationStart,
        onAnimationEnd,
      })
    );

    act(() => {
      result.current.triggerAnimation("left", callback);
    });

    expect(onAnimationStart).toHaveBeenCalled();
    expect(Animated.sequence).toHaveBeenCalled();

    // Fast forward timers for the setTimeout in fade animation
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(onAnimationEnd).toHaveBeenCalled();
  });

  it("should handle slide animation", () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();
    const callback = jest.fn();

    const { result } = renderHook(() =>
      useCalendarAnimation({
        animationType: "slide",
        onAnimationStart,
        onAnimationEnd,
      })
    );

    act(() => {
      result.current.triggerAnimation("left", callback);
    });

    expect(onAnimationStart).toHaveBeenCalled();
    expect(Animated.timing).toHaveBeenCalled();

    // Slide uses callbacks in .start() of animations, handled by mock
    expect(callback).toHaveBeenCalled();
    expect(onAnimationEnd).toHaveBeenCalled();
  });

  it("should handle scale animation", () => {
    const onAnimationStart = jest.fn();
    const onAnimationEnd = jest.fn();
    const callback = jest.fn();

    const { result } = renderHook(() =>
      useCalendarAnimation({
        animationType: "scale",
        onAnimationStart,
        onAnimationEnd,
      })
    );

    act(() => {
      result.current.triggerAnimation("left", callback);
    });

    expect(onAnimationStart).toHaveBeenCalled();
    expect(Animated.parallel).toHaveBeenCalled();

    // Scale uses callbacks in .start()
    expect(callback).toHaveBeenCalled();
    expect(onAnimationEnd).toHaveBeenCalled();
  });

  it("should return correct animated styles for each type", () => {
    const { result, rerender } = renderHook(
      // @ts-ignore - Testing invalid type
      (props) => useCalendarAnimation(props),
      { initialProps: { animationType: "fade" } }
    );

    // Fade has opacity
    expect(result.current.animatedStyle).toHaveProperty("opacity");

    // Slide has transform translateX
    rerender({ animationType: "slide" });
    expect(result.current.animatedStyle).toHaveProperty("transform");

    // Scale has opacity and transform scale
    rerender({ animationType: "scale" });
    expect(result.current.animatedStyle).toHaveProperty("opacity");
    expect(result.current.animatedStyle).toHaveProperty("transform");
  });
});
