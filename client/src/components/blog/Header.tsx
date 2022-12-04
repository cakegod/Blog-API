import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import { usePathname } from 'next/navigation';

const navigationLinks = [
  {
    path: '/blog',
    label: 'Blog',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
  {
    path: 'https://github.com/cakegod',
    label: 'Github',
  },
  {
    path: '/contact',
    label: 'Contact',
  },
];

function Header() {
  const pathname = usePathname();

  const underlineNavLink = (path: string) =>
    pathname === `/${path}`
      ? 'dark text-red-600 dark:text-red-400 underline decoration-1'
      : '';

  return (
    <header className='border-b border-zinc-300 pb-12 dark:border-zinc-700'>
      <div className='flex items-center justify-between pb-10'>
        <Link
          href='/'
          className='cursor-pointer text-4xl font-bold text-pink-800 dark:text-pink-400 md:text-5xl'
        >
          Cake&apos;s Blog
        </Link>
        <ThemeToggler />
      </div>
      <nav className='flex justify-between text-lg font-medium dark:text-zinc-300 md:text-xl  [&>*]:transition-colors hover:[&>*]:text-red-600 dark:[&>*]:transition-colors dark:hover:[&>*]:text-red-400'>
        {navigationLinks.map(({ path, label }) => (
          <Link key={path} href={path} className={underlineNavLink(path)}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;
