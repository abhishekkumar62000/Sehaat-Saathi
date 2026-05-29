import crypto from "crypto";

/**
 * Generates a secure random meeting slug
 * Format: xxx-xxx-xxx (like Google Meet)
 */
const generateMeetSlug = () => {
  const chars = "abcdefghijkmnpqrstuvwxyz";
  const randomPart = (len) =>
    Array.from({ length: len }, () =>
      chars[crypto.randomInt(0, chars.length)]
    ).join("");
  return `${randomPart(3)}-${randomPart(4)}-${randomPart(3)}`;
};

/**
 * Generates a Zoom-style meeting ID
 */
const generateZoomId = () => {
  return Math.floor(10000000000 + crypto.randomInt(0, 89999999999)).toString();
};

/**
 * Generates a meeting link based on provider preference
 * @param {"google"|"zoom"} provider
 * @returns {string} meeting link
 */
export const generateMeetingLink = (provider) => {
  if (provider === "zoom") {
    const zoomId = generateZoomId();
    const pwd = crypto.randomBytes(5).toString("hex");
    return `https://zoom.us/j/${zoomId}?pwd=${pwd}`;
  }
  // Default → Google Meet
  return `https://meet.google.com/${generateMeetSlug()}`;
};

/**
 * Auto-generates a unique Sehaat Saathi Booking Pass ID
 * Format: SSA-VID-YYYY-XXXXX
 */
export const generateBookingPassId = () => {
  const year = new Date().getFullYear();
  const serial = Math.floor(10000 + crypto.randomInt(0, 89999));
  return `SSA-VID-${year}-${serial}`;
};
