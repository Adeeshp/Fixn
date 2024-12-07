import { formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Calculates the time difference from the given ISO date to now.
 * @param {string} isoDate - The ISO date string to compare.
 * @returns {string} - A string like "20 min ago", "3 hours ago", or "5 days ago".
 */
export const calculateTimeAgo = (isoDate) => {
  const date = parseISO(isoDate); // Parse ISO date string
  return `${formatDistanceToNow(date, { addSuffix: true })}`; // Add "ago" suffix
};
