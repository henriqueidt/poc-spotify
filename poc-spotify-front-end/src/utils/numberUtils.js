const isLessThanOneHour = (totalMilliseconds) => totalMilliseconds < 3600000;

export const convertPercentageToDecimal = (value) => value / 100;

export const convertToHoursMinutesSeconds = (totalSeconds) => {
  if (!totalSeconds) {
    return "00:00";
  }
  const totalMilliseconds = totalSeconds * 1000;

  const isoStringDate = new Date(totalMilliseconds).toISOString();

  if (isLessThanOneHour(totalMilliseconds)) {
    return isoStringDate.slice(14, 19);
  }

  return isoStringDate.slice(11, 19);
};
