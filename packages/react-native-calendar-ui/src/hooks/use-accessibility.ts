import { useState } from "react";

export interface UseFocusManagementOptions {
  initialFocusedDate?: Date;
  onFocusChange?: (date: Date) => void;
}

export interface UseFocusManagementReturn {
  focusedDate: Date;
  setFocusedDate: (date: Date) => void;
  moveFocusUp: () => void;
  moveFocusDown: () => void;
  moveFocusLeft: () => void;
  moveFocusRight: () => void;
}

export function useFocusManagement(
  options: UseFocusManagementOptions = {}
): UseFocusManagementReturn {
  const { initialFocusedDate = new Date(), onFocusChange } = options;
  const [focusedDate, setFocusedDateState] = useState(initialFocusedDate);

  const setFocusedDate = (date: Date) => {
    setFocusedDateState(date);
    onFocusChange?.(date);
  };

  const moveFocusUp = () => {
    const newDate = new Date(focusedDate);
    newDate.setDate(newDate.getDate() - 7);
    setFocusedDate(newDate);
  };

  const moveFocusDown = () => {
    const newDate = new Date(focusedDate);
    newDate.setDate(newDate.getDate() + 7);
    setFocusedDate(newDate);
  };

  const moveFocusLeft = () => {
    const newDate = new Date(focusedDate);
    newDate.setDate(newDate.getDate() - 1);
    setFocusedDate(newDate);
  };

  const moveFocusRight = () => {
    const newDate = new Date(focusedDate);
    newDate.setDate(newDate.getDate() + 1);
    setFocusedDate(newDate);
  };

  return {
    focusedDate,
    setFocusedDate,
    moveFocusUp,
    moveFocusDown,
    moveFocusLeft,
    moveFocusRight,
  };
}
