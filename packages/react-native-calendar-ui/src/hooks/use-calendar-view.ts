import { useState, useCallback } from "react";

export type CalendarView = "day" | "month" | "year" | "decade";

export interface UseCalendarViewOptions {
  initialView?: CalendarView;
  onViewChange?: (view: CalendarView) => void;
}

export interface UseCalendarViewReturn {
  view: CalendarView;
  setView: (view: CalendarView) => void;
  goToMonthView: () => void;
  goToYearView: () => void;
  goToDecadeView: () => void;
  goToDayView: () => void;
}

export function useCalendarView(
  options: UseCalendarViewOptions = {}
): UseCalendarViewReturn {
  const { initialView = "month", onViewChange } = options;
  const [view, setViewState] = useState<CalendarView>(initialView);

  const setView = useCallback(
    (newView: CalendarView) => {
      setViewState(newView);
      onViewChange?.(newView);
    },
    [onViewChange]
  );

  const goToMonthView = useCallback(() => setView("month"), [setView]);
  const goToYearView = useCallback(() => setView("year"), [setView]);
  const goToDecadeView = useCallback(() => setView("decade"), [setView]);
  const goToDayView = useCallback(() => setView("day"), [setView]);

  return {
    view,
    setView,
    goToMonthView,
    goToYearView,
    goToDecadeView,
    goToDayView,
  };
}
