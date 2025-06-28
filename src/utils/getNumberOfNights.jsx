export function getNumberOfNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return Math.max(0, Math.floor(diffInDays));
}
