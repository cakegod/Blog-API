import { composeDate } from '@/util/composeDate';

interface Date {
  date: string;
  readTime: string;
  expected: string;
}

describe('composeDate', () => {
  function tests(arr: Date[]) {
    arr.forEach((input) => {
      expect(composeDate(input.date, input.readTime)).to.eq(input.expected);
    });
  }

  it('returns a coffee', () => {
    tests([
      { date: '2020-10-10', readTime: '4', expected: '10 October 2020 - 4 ☕' },
      { date: '2020-10-7', readTime: '6', expected: '07 October 2020 - 6 ☕' },
    ]);
  });

  it('returns 2 coffees', () => {
    tests([
      {
        date: '2020-10-7',
        readTime: '11',
        expected: '07 October 2020 - 11 ☕☕',
      },
      {
        date: '2020-10-7',
        readTime: '15',
        expected: '07 October 2020 - 15 ☕☕☕',
      },
    ]);
  });
});
