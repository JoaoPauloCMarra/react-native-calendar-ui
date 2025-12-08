import { renderHook, act } from "@testing-library/react";
import { useCalendarDateTime } from "../use-calendar-datetime";

describe("useCalendarDateTime", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCalendarDateTime());
    expect(result.current.selectedDate).toBeNull();
    expect(result.current.selectedTime).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    expect(result.current.selectedDateTime).toBeNull();
  });

  it("should initialize with custom date and time", () => {
    const initialDate = new Date(2024, 0, 15);
    const initialTime = { hours: 14, minutes: 30, seconds: 45 };

    const { result } = renderHook(() =>
      useCalendarDateTime({ initialDate, initialTime })
    );

    expect(result.current.selectedDate).toEqual(initialDate);
    expect(result.current.selectedTime).toEqual({
      hours: 14,
      minutes: 30,
      seconds: 45,
    });
  });

  it("should select date", () => {
    const { result } = renderHook(() => useCalendarDateTime());
    const date = new Date(2024, 0, 15);

    act(() => {
      result.current.selectDate(date);
    });

    expect(result.current.selectedDate).toEqual(date);
  });

  it("should select time", () => {
    const { result } = renderHook(() => useCalendarDateTime());

    act(() => {
      result.current.selectTime(14, 30, 45);
    });

    expect(result.current.selectedTime).toEqual({
      hours: 14,
      minutes: 30,
      seconds: 45,
    });
  });

  it("should create combined datetime", () => {
    const { result } = renderHook(() => useCalendarDateTime());
    const date = new Date(2024, 0, 15);

    act(() => {
      result.current.selectDate(date);
      result.current.selectTime(14, 30, 0);
    });

    const dateTime = result.current.selectedDateTime;
    expect(dateTime?.getFullYear()).toBe(2024);
    expect(dateTime?.getMonth()).toBe(0);
    expect(dateTime?.getDate()).toBe(15);
    expect(dateTime?.getHours()).toBe(14);
    expect(dateTime?.getMinutes()).toBe(30);
  });

  it("should set complete datetime", () => {
    const { result } = renderHook(() => useCalendarDateTime());
    const dateTime = new Date(2024, 0, 15, 14, 30, 45);

    act(() => {
      result.current.setDateTime(dateTime);
    });

    expect(result.current.selectedDate).toEqual(dateTime);
    expect(result.current.selectedTime).toEqual({
      hours: 14,
      minutes: 30,
      seconds: 45,
    });
  });

  it("should clear datetime", () => {
    const { result } = renderHook(() =>
      useCalendarDateTime({ initialDate: new Date() })
    );

    act(() => {
      result.current.clearDateTime();
    });

    expect(result.current.selectedDate).toBeNull();
    expect(result.current.selectedTime).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("should call onDateTimeChange callback", () => {
    const onDateTimeChange = jest.fn();
    const { result } = renderHook(() =>
      useCalendarDateTime({ onDateTimeChange })
    );
    const date = new Date(2024, 0, 15);

    act(() => {
      result.current.selectDate(date);
    });

    expect(onDateTimeChange).toHaveBeenCalled();
  });

  it("should not call onDateTimeChange when selecting time without date", () => {
    const onDateTimeChange = jest.fn();
    const { result } = renderHook(() =>
      useCalendarDateTime({ onDateTimeChange })
    );

    act(() => {
      result.current.selectTime(14, 30, 0);
    });

    expect(onDateTimeChange).not.toHaveBeenCalled();
  });
});
