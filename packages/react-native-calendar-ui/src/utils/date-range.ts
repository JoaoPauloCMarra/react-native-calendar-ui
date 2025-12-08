export function getDaysBetween(startDate: Date, endDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const start = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const end = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );
  return Math.round((end.getTime() - start.getTime()) / msPerDay);
}

export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
