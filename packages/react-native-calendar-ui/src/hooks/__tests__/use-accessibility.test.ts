import { renderHook, act } from "@testing-library/react";
import { useFocusManagement } from "../use-accessibility";

describe("useFocusManagement", () => {
  it("should initialize with default focused date", () => {
    const { result } = renderHook(() => useFocusManagement());
    expect(result.current.focusedDate).toBeInstanceOf(Date);
  });

  it("should initialize with custom focused date", () => {
    const initialDate = new Date(2024, 0, 15);
    const { result } = renderHook(() =>
      useFocusManagement({ initialFocusedDate: initialDate })
    );
    expect(result.current.focusedDate).toEqual(initialDate);
  });

  it("should move focus up (7 days back)", () => {
    const initialDate = new Date(2024, 0, 15);
    const { result } = renderHook(() =>
      useFocusManagement({ initialFocusedDate: initialDate })
    );

    act(() => {
      result.current.moveFocusUp();
    });

    expect(result.current.focusedDate.getDate()).toBe(8);
  });

  it("should move focus down (7 days forward)", () => {
    const initialDate = new Date(2024, 0, 15);
    const { result } = renderHook(() =>
      useFocusManagement({ initialFocusedDate: initialDate })
    );

    act(() => {
      result.current.moveFocusDown();
    });

    expect(result.current.focusedDate.getDate()).toBe(22);
  });

  it("should move focus left (1 day back)", () => {
    const initialDate = new Date(2024, 0, 15);
    const { result } = renderHook(() =>
      useFocusManagement({ initialFocusedDate: initialDate })
    );

    act(() => {
      result.current.moveFocusLeft();
    });

    expect(result.current.focusedDate.getDate()).toBe(14);
  });

  it("should move focus right (1 day forward)", () => {
    const initialDate = new Date(2024, 0, 15);
    const { result } = renderHook(() =>
      useFocusManagement({ initialFocusedDate: initialDate })
    );

    act(() => {
      result.current.moveFocusRight();
    });

    expect(result.current.focusedDate.getDate()).toBe(16);
  });

  it("should call onFocusChange callback", () => {
    const onFocusChange = jest.fn();
    const initialDate = new Date(2024, 0, 15);
    const { result } = renderHook(() =>
      useFocusManagement({ initialFocusedDate: initialDate, onFocusChange })
    );

    act(() => {
      result.current.moveFocusRight();
    });

    expect(onFocusChange).toHaveBeenCalled();
  });

  it("should set focused date directly", () => {
    const { result } = renderHook(() => useFocusManagement());
    const newDate = new Date(2024, 5, 20);

    act(() => {
      result.current.setFocusedDate(newDate);
    });

    expect(result.current.focusedDate).toEqual(newDate);
  });
});
