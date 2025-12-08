import type { CalendarEvent } from "../types/events";

export interface ExportOptions {
  title?: string;
  description?: string;
  location?: string;
}

export function exportToICS(
  events: CalendarEvent[],
  options: ExportOptions = {}
): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//react-native-calendar-ui//EN",
    "CALSCALE:GREGORIAN",
  ];

  events.forEach((event) => {
    const dtstart = formatICSDate(event.date);
    lines.push("BEGIN:VEVENT");
    lines.push(`DTSTART:${dtstart}`);
    lines.push(`DTEND:${dtstart}`);
    lines.push(`SUMMARY:${event.label || "Event"}`);
    if (event.metadata?.description) {
      lines.push(`DESCRIPTION:${event.metadata.description}`);
    }
    if (event.metadata?.location) {
      lines.push(`LOCATION:${event.metadata.location}`);
    }
    lines.push(`UID:${event.id || generateUID()}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function exportToJSON(events: CalendarEvent[]): string {
  return JSON.stringify(events, null, 2);
}

export function importFromJSON(json: string): CalendarEvent[] {
  const parsed = JSON.parse(json);
  return Array.isArray(parsed)
    ? parsed.map((e) => ({
        ...e,
        date: new Date(e.date),
      }))
    : [];
}

function formatICSDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function generateUID(): string {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}@react-native-calendar-ui`;
}
