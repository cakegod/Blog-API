const timePerCoffee = 6;

function computeTimeInCoffees(readTime: number) {
  return '☕'.repeat(Math.round(readTime / timePerCoffee));
}

function formatDate(date: string, readTime: string): string {
  return `${new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(Date.parse(date))} - ${readTime} ${computeTimeInCoffees(
    parseInt(readTime, 10)
  )}`;
}

export default formatDate;
