import { formatDistanceToNow } from "date-fns";

export const formatViewCount = (count) => {
  if (typeof count !== "number" || isNaN(count)) {
    return "0"; // Return a default value if count is invalid
  }
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return count.toString();
  }
};

export const formatPublishTime = (publishTime) => {
  if (!publishTime) return "Unknown"; // Handle missing publish time
  return formatDistanceToNow(new Date(publishTime), { addSuffix: true });
};

export const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return duration; // Return original if format is not valid

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  // Format the duration into a string
  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};
