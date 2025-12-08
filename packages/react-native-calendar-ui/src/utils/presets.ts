export interface DatePreset {
  label: string;
  getValue: () => { start: Date; end: Date };
}

export const DATE_PRESETS: Record<string, DatePreset> = {
  today: {
    label: "Today",
    getValue: () => {
      const today = new Date();
      return { start: today, end: today };
    },
  },
  yesterday: {
    label: "Yesterday",
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return { start: yesterday, end: yesterday };
    },
  },
  last7days: {
    label: "Last 7 Days",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return { start, end };
    },
  },
  last30days: {
    label: "Last 30 Days",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return { start, end };
    },
  },
  thisWeek: {
    label: "This Week",
    getValue: () => {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { start, end };
    },
  },
  lastWeek: {
    label: "Last Week",
    getValue: () => {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay() - 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { start, end };
    },
  },
  thisMonth: {
    label: "This Month",
    getValue: () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { start, end };
    },
  },
  lastMonth: {
    label: "Last Month",
    getValue: () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const end = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start, end };
    },
  },
  thisYear: {
    label: "This Year",
    getValue: () => {
      const today = new Date();
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      return { start, end };
    },
  },
};

export function getPresetValue(
  presetKey: string
): { start: Date; end: Date } | null {
  const preset = DATE_PRESETS[presetKey];
  return preset ? preset.getValue() : null;
}
