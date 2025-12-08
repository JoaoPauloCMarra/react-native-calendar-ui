import {
  getEventsForDate,
  hasEvents,
  groupEventsByDate,
  sortEvents,
} from "../events";
import type { CalendarEvent } from "../../types/events";

describe("Event Utilities", () => {
  const mockEvents: CalendarEvent[] = [
    { date: new Date(2024, 0, 15), label: "Event 1", color: "#FF0000" },
    { date: new Date(2024, 0, 15), label: "Event 2", color: "#00FF00" },
    { date: new Date(2024, 0, 20), label: "Event 3", color: "#0000FF" },
    { date: new Date(2024, 1, 10), label: "Event 4", color: "#FFFF00" },
  ];

  describe("getEventsForDate", () => {
    it("should return events for a specific date", () => {
      const result = getEventsForDate(mockEvents, new Date(2024, 0, 15));
      expect(result).toHaveLength(2);
      expect(result[0].label).toBe("Event 1");
      expect(result[1].label).toBe("Event 2");
    });

    it("should return empty array when no events exist for date", () => {
      const result = getEventsForDate(mockEvents, new Date(2024, 0, 1));
      expect(result).toHaveLength(0);
    });
  });

  describe("hasEvents", () => {
    it("should return true when events exist for date", () => {
      expect(hasEvents(mockEvents, new Date(2024, 0, 15))).toBe(true);
    });

    it("should return false when no events exist for date", () => {
      expect(hasEvents(mockEvents, new Date(2024, 0, 1))).toBe(false);
    });
  });

  describe("groupEventsByDate", () => {
    it("should group events by date", () => {
      const grouped = groupEventsByDate(mockEvents);
      expect(grouped.size).toBe(3);
      expect(grouped.get("2024-0-15")).toHaveLength(2);
      expect(grouped.get("2024-0-20")).toHaveLength(1);
      expect(grouped.get("2024-1-10")).toHaveLength(1);
    });
  });

  describe("sortEvents", () => {
    it("should sort events by date", () => {
      const unsorted: CalendarEvent[] = [
        { date: new Date(2024, 1, 10), label: "Later" },
        { date: new Date(2024, 0, 15), label: "Earlier" },
      ];
      const sorted = sortEvents(unsorted);
      expect(sorted[0].label).toBe("Earlier");
      expect(sorted[1].label).toBe("Later");
    });
  });
});
