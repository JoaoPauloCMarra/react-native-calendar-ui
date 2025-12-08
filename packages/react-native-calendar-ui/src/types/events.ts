export interface CalendarEvent {
  id?: string;
  date: Date;
  color?: string;
  label?: string;
  metadata?: any;
}

export interface EventMarkerStyle {
  size?: number;
  position?: "top" | "bottom" | "center";
  maxVisible?: number;
}
