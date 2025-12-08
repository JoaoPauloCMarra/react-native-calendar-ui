import { renderHook, act } from "@testing-library/react";
import { useInfiniteCalendar } from "../use-infinite-calendar";

describe("useInfiniteCalendar", () => {
  it("should initialize with default months", () => {
    const { result } = renderHook(() => useInfiniteCalendar());
    expect(result.current.months).toHaveLength(12);
  });

  it("should initialize with custom month count", () => {
    const { result } = renderHook(() =>
      useInfiniteCalendar({ initialMonthsToLoad: 6 })
    );
    expect(result.current.months).toHaveLength(6);
  });

  it("should load more months in future", () => {
    const { result } = renderHook(() =>
      useInfiniteCalendar({ initialMonthsToLoad: 12 })
    );

    act(() => {
      result.current.loadMoreMonths("future", 6);
    });

    expect(result.current.months).toHaveLength(18);
  });

  it("should load more months in past", () => {
    const { result } = renderHook(() =>
      useInfiniteCalendar({ initialMonthsToLoad: 12 })
    );

    act(() => {
      result.current.loadMoreMonths("past", 6);
    });

    expect(result.current.months).toHaveLength(18);
  });

  it("should go to specific month", () => {
    const onMonthVisible = jest.fn();
    const { result } = renderHook(() =>
      useInfiniteCalendar({ onMonthVisible })
    );

    act(() => {
      result.current.goToMonth(2025, 5);
    });

    expect(onMonthVisible).toHaveBeenCalledWith(2025, 5);
    expect(result.current.months[0].year).toBe(2025);
    expect(result.current.months[0].month).toBe(5);
  });

  it("should reset to initial state", () => {
    const { result } = renderHook(() =>
      useInfiniteCalendar({
        initialYear: 2024,
        initialMonth: 0,
        initialMonthsToLoad: 12,
      })
    );

    act(() => {
      result.current.loadMoreMonths("future", 6);
    });

    expect(result.current.months).toHaveLength(18);

    act(() => {
      result.current.reset();
    });

    expect(result.current.months).toHaveLength(12);
    expect(result.current.months[0].year).toBe(2024);
    expect(result.current.months[0].month).toBe(0);
  });

  it("should generate correct month data", () => {
    const { result } = renderHook(() =>
      useInfiniteCalendar({ initialYear: 2024, initialMonth: 0 })
    );

    const firstMonth = result.current.months[0];
    expect(firstMonth.year).toBe(2024);
    expect(firstMonth.month).toBe(0);
    expect(firstMonth.days).toHaveLength(42);
  });
});
