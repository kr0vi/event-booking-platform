export const  getDayFromDate = (dateStr:string) => {
  console.log("Received date string:", dateStr);
  const [year, month, day] = dateStr.split("-").map(Number);

  // JS Date uses 0-based months (0 = Jan, 11 = Dec)
  const date = new Date(year, month - 1, day);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}