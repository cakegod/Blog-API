function formatDate(date: string, readTime: string): string {
  return `${new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(Date.parse(date))} - ${readTime}`;
}

export default formatDate;
