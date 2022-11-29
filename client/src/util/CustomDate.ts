class CustomDate {
  static TIME_PER_COFFEE = 6;
  static COFFEE_ICON = '☕';
  static DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static compose(date: string, readTime: string) {
    return `${this.#format(date)} - ${readTime} ${this.#computeCoffees(
      parseInt(readTime, 10)
    )}`;
  }

  static #format(date: string) {
    return this.DATE_FORMAT.format(Date.parse(date));
  }

  static #computeCoffees(readTime: number) {
    return this.COFFEE_ICON.repeat(Math.round(readTime / this.TIME_PER_COFFEE));
  }
}

export default CustomDate;
