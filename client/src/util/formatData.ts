const TIME_PER_COFFEE = 6;

function computeTimeInCoffees(readTime: number): string {
  const coffeeIcon = '☕';
  const numberOfCoffees = Math.round(readTime / TIME_PER_COFFEE);
  return coffeeIcon.repeat(numberOfCoffees);
}

function formatData(date: string, readTime: string) {
  const parsedDate = Date.parse(date);
  const parsedReadTime = parseInt(readTime, 10);
  const customDateFormat = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  const formattedDate = customDateFormat.format(parsedDate);
  return `${formattedDate} - ${readTime} ${computeTimeInCoffees(
    parsedReadTime
  )}`;
}

export default formatData;
