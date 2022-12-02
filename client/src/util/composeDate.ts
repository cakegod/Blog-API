// Formats the given date using the specified date format
const formatDate = (date: string) => {
  return DATE_FORMAT.format(Date.parse(date));
};

// Computes the number of coffee icons that represent the given read time
const computeCoffeeIcons = (readTime: number) => {
  return COFFEE_ICON.repeat(Math.round(readTime / TIME_PER_COFFEE));
};

// Converts the given read time string to a number
const convertReadTimeToNumber = (readTime: string) => {
  return parseInt(readTime, 10);
};

// Composes a string with the formatted date and the read time, including the computed coffee icons
export const composeDate = (date: string, readTime: string) => {
  const formattedDate = formatDate(date);
  const readTimeInMinutes = convertReadTimeToNumber(readTime);
  const coffeeIcons = computeCoffeeIcons(readTimeInMinutes);

  return `${formattedDate} - ${readTime} ${coffeeIcons}`;
};

const TIME_PER_COFFEE = 6;
const COFFEE_ICON = '☕';
const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});
