const convertTime = (time) => {
  if (!time || typeof time !== "string") return "—";
  const timeParts = time.split(":");
  if (timeParts.length < 2) return time;
  
  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);

  if (isNaN(hours) || isNaN(minutes)) return time;

  let meridiem = "am";

  if (hours >= 12) {
    meridiem = "pm";

    if (hours > 12) {
      hours -= 12;
    }
  }
  return (
    hours.toString().padStart(2) +
    ":" +
    minutes.toString().padStart(2, "0") +
    " " +
    meridiem
  );
};

export default convertTime;
