export const  getDayFromDate = (dateStr:string) => {
  const [day, month, year] = dateStr.split("-").map(Number);

  // JS Date uses 0-based months (0 = Jan, 11 = Dec)
  const date = new Date(year, month - 1, day);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}