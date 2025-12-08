import { useState, useCallback, useMemo } from "react";

export interface UseCalendarDateTimeOptions {
  initialDate?: Date;
  initialTime?: { hours: number; minutes: number; seconds?: number };
  timeFormat?: "12h" | "24h";
  minuteInterval?: number;
  showSeconds?: boolean;
  onDateTimeChange?: (dateTime: Date) => void;
}

export interface UseCalendarDateTimeReturn {
  selectedDate: Date | null;
  selectedTime: { hours: number; minutes: number; seconds: number };
  selectedDateTime: Date | null;
  selectDate: (date: Date) => void;
  selectTime: (hours: number, minutes: number, seconds?: number) => void;
  setDateTime: (dateTime: Date) => void;
  clearDateTime: () => void;
  timeFormat: "12h" | "24h";
  minuteInterval: number;
  showSeconds: boolean;
}

export function useCalendarDateTime(
  options: UseCalendarDateTimeOptions = {}
): UseCalendarDateTimeReturn {
  const {
    initialDate,
    initialTime = { hours: 0, minutes: 0, seconds: 0 },
    timeFormat = "24h",
    minuteInterval = 1,
    showSeconds = false,
    onDateTimeChange,
  } = options;

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null
  );
  const [selectedTime, setSelectedTime] = useState({
    hours: initialTime.hours,
    minutes: initialTime.minutes,
    seconds: initialTime.seconds || 0,
  });

  const selectedDateTime = useMemo(() => {
    if (!selectedDate) return null;
    const dt = new Date(selectedDate);
    dt.setHours(selectedTime.hours, selectedTime.minutes, selectedTime.seconds);
    return dt;
  }, [selectedDate, selectedTime]);

  const selectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      if (date) {
        const dt = new Date(date);
        dt.setHours(
          selectedTime.hours,
          selectedTime.minutes,
          selectedTime.seconds
        );
        onDateTimeChange?.(dt);
      }
    },
    [selectedTime, onDateTimeChange]
  );

  const selectTime = useCallback(
    (hours: number, minutes: number, seconds: number = 0) => {
      setSelectedTime({ hours, minutes, seconds });
      if (selectedDate) {
        const dt = new Date(selectedDate);
        dt.setHours(hours, minutes, seconds);
        onDateTimeChange?.(dt);
      }
    },
    [selectedDate, onDateTimeChange]
  );

  const setDateTime = useCallback(
    (dateTime: Date) => {
      setSelectedDate(dateTime);
      setSelectedTime({
        hours: dateTime.getHours(),
        minutes: dateTime.getMinutes(),
        seconds: dateTime.getSeconds(),
      });
      onDateTimeChange?.(dateTime);
    },
    [onDateTimeChange]
  );

  const clearDateTime = useCallback(() => {
    setSelectedDate(null);
    setSelectedTime({ hours: 0, minutes: 0, seconds: 0 });
  }, []);

  return {
    selectedDate,
    selectedTime,
    selectedDateTime,
    selectDate,
    selectTime,
    setDateTime,
    clearDateTime,
    timeFormat,
    minuteInterval,
    showSeconds,
  };
}
