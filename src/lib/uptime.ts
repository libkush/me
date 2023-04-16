export default function uptime(
  startingDate: string,
  endingDate: string = new Date().toISOString().substr(0, 10)
): { years: number; months: number; days: number } {
  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
  let endDate = new Date(endingDate);

  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  let startYear = startDate.getFullYear();
  let february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
  let daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let years = endDate.getFullYear() - startYear;

  let months = endDate.getMonth() - startDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }

  let days = endDate.getDate() - startDate.getDate();
  if (days < 0) {
    if (months > 0) {
      months--;
    } else {
      years--;
      months = 11;
    }
    days += daysInMonth[startDate.getMonth()];
  }

  return { years, months, days };
}
