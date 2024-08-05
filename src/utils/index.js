export const getDateDifferenceFromNow = (fromDate) => {
  const now = new Date();
  const pastDate = new Date(fromDate);
  let difference = now.getTime() - pastDate.getTime();

  const millisecondsInDay = 86400000; // 24 * 60 * 60 * 1000
  const millisecondsInHour = 3600000; // 60 * 60 * 1000
  const millisecondsInMinute = 60000; // 60 * 1000
  const millisecondsInMonth = 30 * millisecondsInDay; // Approximate month length

  let monthsDifference = Math.floor(difference / millisecondsInMonth);
  difference -= monthsDifference * millisecondsInMonth;

  let daysDifference = Math.floor(difference / millisecondsInDay);
  difference -= daysDifference * millisecondsInDay;

  let hoursDifference = Math.floor(difference / millisecondsInHour);
  difference -= hoursDifference * millisecondsInHour;

  let minutesDifference = Math.floor(difference / millisecondsInMinute);
  difference -= minutesDifference * millisecondsInMinute;

  let message = "";

  if (monthsDifference > 0) {
    message += `${monthsDifference} month${monthsDifference > 1 ? "s" : ""} `;
  }

  if (daysDifference > 0) {
    message += `${daysDifference} day${daysDifference > 1 ? "s" : ""} `;
  }

  if (hoursDifference > 0) {
    message += `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} `;
  }

  if (minutesDifference > 0 || message === "") {
    message += `${minutesDifference} minute${minutesDifference > 1 ? "s" : ""}`;
  }

  return message.trim();
};
