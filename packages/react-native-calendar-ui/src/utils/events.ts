import type { CalendarEvent } from "../types/events";

export function getEventsForDate(
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] {
  return events.filter((event) => {
    return (
      event.date.getFullYear() === date.getFullYear() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getDate() === date.getDate()
    );
  });
}

export function hasEvents(events: CalendarEvent[], date: Date): boolean {
  return getEventsForDate(events, date).length > 0;
}

export function groupEventsByDate(
  events: CalendarEvent[]
): Map<string, CalendarEvent[]> {
  const grouped = new Map<string, CalendarEvent[]>();

  events.forEach((event) => {
    const key = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`;
    const existing = grouped.get(key) || [];
    grouped.set(key, [...existing, event]);
  });

  return grouped;
}

export function sortEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
}
