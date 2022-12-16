import AboutMe from '@/components/blog/AboutMe';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('render about me component', () => {
  render(<AboutMe />);

  expect(screen.getByText(/hi 👋, i'm cake from france 🇫🇷/i)).toBeVisible();
  expect(
    screen.getByText(
      /i'm an aspiring web developer with a passion for react\. welcome to my personal blog 📚, where i write about all things react, javascript and typescript\./i
    )
  ).toBeVisible();
});
