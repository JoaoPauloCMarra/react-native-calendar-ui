import { renderHook, act } from "@testing-library/react";
import { useCalendarView } from "../use-calendar-view";

describe("useCalendarView", () => {
  it("should initialize with default view", () => {
    const { result } = renderHook(() => useCalendarView());
    expect(result.current.view).toBe("month");
  });

  it("should initialize with custom view", () => {
    const { result } = renderHook(() =>
      useCalendarView({ initialView: "year" })
    );
    expect(result.current.view).toBe("year");
  });

  it("should change view", () => {
    const { result } = renderHook(() => useCalendarView());

    act(() => {
      result.current.setView("year");
    });

    expect(result.current.view).toBe("year");
  });

  it("should call onViewChange callback", () => {
    const onViewChange = jest.fn();
    const { result } = renderHook(() => useCalendarView({ onViewChange }));

    act(() => {
      result.current.setView("year");
    });

    expect(onViewChange).toHaveBeenCalledWith("year");
  });

  it("should navigate to month view", () => {
    const { result } = renderHook(() =>
      useCalendarView({ initialView: "year" })
    );

    act(() => {
      result.current.goToMonthView();
    });

    expect(result.current.view).toBe("month");
  });

  it("should navigate to year view", () => {
    const { result } = renderHook(() => useCalendarView());

    act(() => {
      result.current.goToYearView();
    });

    expect(result.current.view).toBe("year");
  });

  it("should navigate to decade view", () => {
    const { result } = renderHook(() => useCalendarView());

    act(() => {
      result.current.goToDecadeView();
    });

    expect(result.current.view).toBe("decade");
  });

  it("should navigate to day view", () => {
    const { result } = renderHook(() => useCalendarView());

    act(() => {
      result.current.goToDayView();
    });

    expect(result.current.view).toBe("day");
  });
});
