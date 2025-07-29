// utils/getTimeOfDay.js
export function getTimeOfDay(createdAt) {
  if (!createdAt) return "unknown";

  // Parse date in local timezone (optional: force to India timezone if needed)
  const date = new Date(createdAt);
  const hour = date.getHours(); // Local time hour (0–23)

  if (hour >= 5 && hour < 12) {
    return "morning";    // 5 AM to 12 PM
  } else if (hour >= 12 && hour < 17) {
    return "afternoon";  // 12 PM to 5 PM
  } else if (hour >= 17 && hour < 20) {
    return "evening";    // 5 PM to 8 PM
  } else {
    return "night";      // 8 PM to 5 AM
  }
}
