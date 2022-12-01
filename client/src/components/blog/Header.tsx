import Link from 'next/link';
import ThemeToggler from './ThemeToggler';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();

  function underlineNavLink(path: string) {
    return pathname === `/${path}`
      ? 'dark text-red-600 dark:text-red-400 underline decoration-1'
      : '';
  }

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
      <nav className='flex justify-between text-lg font-medium dark:text-zinc-300 md:text-xl  [&>*]:transition-all hover:[&>*]:text-red-600 dark:[&>*]:transition-all dark:hover:[&>*]:text-red-400'>
        <Link href='/' className={underlineNavLink('blog')}>
          Blog
        </Link>
        <Link href='/projects' className={underlineNavLink('projects')}>
          Projects
        </Link>
        <Link
          href='https://github.com/cakegod'
          className={underlineNavLink('github')}
        >
          Github
        </Link>
        <Link href='/contact' className={underlineNavLink('contact')}>
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Header;
