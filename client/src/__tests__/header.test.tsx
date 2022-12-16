import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/blog/Header';

it('renders all links', async () => {
  render(<Header />);

  const links = [
    { name: `Cake's Blog`, path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Projects', path: '/projects' },
    { name: 'Github', path: 'https://github.com/cakegod' },
    { name: 'Contact', path: '/contact' },
  ];

  links.forEach((link) => {
    const currentLink = screen.getByRole('link', { name: link.name });
    expect(currentLink).toBeVisible();
    expect(currentLink).toHaveTextContent(link.name);
    expect(currentLink).toHaveAttribute('href', link.path);
  });
});

it('renders theme toggler', () => {
  render(<Header />);
  const button = screen.getByRole('button', { name: /theme toggler/i });
  expect(button).toBeVisible();
});
