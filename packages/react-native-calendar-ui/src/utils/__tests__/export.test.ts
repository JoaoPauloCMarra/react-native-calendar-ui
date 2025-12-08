import { exportToICS, exportToJSON, importFromJSON } from "../export";
import type { CalendarEvent } from "../../types/events";

describe("Export Utilities", () => {
  const mockEvents: CalendarEvent[] = [
    { id: "1", date: new Date(2024, 0, 15), label: "Event 1" },
    { id: "2", date: new Date(2024, 0, 20), label: "Event 2" },
  ];

  describe("exportToICS", () => {
    it("should export events to ICS format", () => {
      const ics = exportToICS(mockEvents);
      expect(ics).toContain("BEGIN:VCALENDAR");
      expect(ics).toContain("END:VCALENDAR");
      expect(ics).toContain("BEGIN:VEVENT");
      expect(ics).toContain("END:VEVENT");
      expect(ics).toContain("Event 1");
      expect(ics).toContain("Event 2");
    });

    it("should include event metadata", () => {
      const eventsWithMetadata: CalendarEvent[] = [
        {
          id: "1",
          date: new Date(2024, 0, 15),
          label: "Meeting",
          metadata: {
            description: "Team meeting",
            location: "Office",
          },
        },
      ];
      const ics = exportToICS(eventsWithMetadata);
      expect(ics).toContain("Team meeting");
      expect(ics).toContain("Office");
    });

    it("should generate UID for events without ID", () => {
      const eventsWithoutId: CalendarEvent[] = [
        {
          date: new Date(2024, 0, 15),
          label: "Event without ID",
        },
      ];
      const ics = exportToICS(eventsWithoutId);
      expect(ics).toContain("UID:");
      expect(ics).toContain("@react-native-calendar-ui");
    });
  });

  describe("exportToJSON", () => {
    it("should export events to JSON format", () => {
      const json = exportToJSON(mockEvents);
      const parsed = JSON.parse(json);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(2);
    });
  });

  describe("importFromJSON", () => {
    it("should import events from JSON", () => {
      const json = exportToJSON(mockEvents);
      const imported = importFromJSON(json);
      expect(imported).toHaveLength(2);
      expect(imported[0].label).toBe("Event 1");
    });

    it("should throw on invalid JSON", () => {
      expect(() => importFromJSON("invalid json")).toThrow();
    });

    it("should convert date strings to Date objects", () => {
      const json = exportToJSON(mockEvents);
      const imported = importFromJSON(json);
      expect(imported[0].date).toBeInstanceOf(Date);
    });
  });
});
