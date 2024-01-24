export const calculateNextOccurance = (dayOfWeek, hour, minute, second) => {
  const now = new Date();
  const nextOccurrence = new Date(now);

  // Set the day of the week, hour, minute, and second
  nextOccurrence.setUTCHours(hour, minute, second, 0);
  const daysUntilNextOccurrence = (dayOfWeek - now.getUTCDay() + 7) % 7; // Calculate days until next occurrence
  nextOccurrence.setDate(nextOccurrence.getDate() + daysUntilNextOccurrence);

  // If the target time is in the past, calculate for the next occurrence
  if (nextOccurrence <= now) {
    nextOccurrence.setDate(nextOccurrence.getDate() + 7);
  }

  return nextOccurrence;
};