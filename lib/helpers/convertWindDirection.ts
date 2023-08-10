import { directions } from "../types/directions";

export const convertWindDirection = (degrees: number) => {
  const windDeg = degrees;
  if (isNaN(windDeg)) {
    return "Invalid input";
  }

  // Convert degrees to index for directions array
  const index = Math.round((windDeg % 360) / 22.5);
  const direction = directions[index];
  return direction || "N/A";
};
