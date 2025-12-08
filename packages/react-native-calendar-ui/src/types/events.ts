export interface CalendarEvent {
  id?: string;
  date: Date;
  color?: string;
  label?: string;
  metadata?: Record<string, unknown>;
}

export interface EventMarkerStyle {
  size?: number;
  position?: "top" | "bottom" | "center";
  maxVisible?: number;
}
