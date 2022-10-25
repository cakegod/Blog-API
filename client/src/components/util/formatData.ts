function formatDate(date: string, readTime: string): string {
  return `${new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(Date.parse(date))} - ${readTime} ${computeCoffeeTime(
    parseInt(readTime)
  )}`;
}

function computeCoffeeTime(readTime: number) {
  return '☕'.repeat(Math.round(readTime / 6));
}

export default formatDate;
