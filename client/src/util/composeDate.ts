const TIME_PER_COFFEE = 6;

function computeTimeInCoffees(readTime: number): string {
  const coffeeIcon = '☕';
  const numberOfCoffees = Math.round(readTime / TIME_PER_COFFEE);
  return coffeeIcon.repeat(numberOfCoffees);
}

function composeDate(date: string, readTime: string) {
  const customDateFormat = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
  const formattedDate = customDateFormat.format(Date.parse(date));
  const coffeeReadTime = computeTimeInCoffees(parseInt(readTime, 10));
  return `${formattedDate} - ${readTime} ${coffeeReadTime}`;
}

export default composeDate;
