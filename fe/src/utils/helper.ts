export const getDayFromDate = (dateStr: string) => {
  // console.log("Received date string:", dateStr);
  const [year, month, day] = dateStr.split("-").map(Number);

  // JS Date uses 0-based months (0 = Jan, 11 = Dec)
  const date = new Date(year, month - 1, day);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
};

export const getMonthFromDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[month - 1];
};

export const changeTimeFormat = (timeStr: string) => {
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};
