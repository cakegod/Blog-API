import Link from 'next/link';
import ThemeToggler from './ThemeToggler';

function Header() {
  return (
    <header className='border-b border-zinc-300 pb-12 dark:border-zinc-700'>
      <div className='flex items-center justify-between pb-10'>
        <Link
          href='/'
          className='cursor-pointer text-4xl font-bold text-pink-800 dark:text-pink-400 md:text-5xl'
        >
          Cake&apos;s Blog
        </Link>
        {/* <button className='bg-zinc-600 rounded-full p-1'>
          <MagnifyingGlassIcon className='w-6 ' />
        </button> */}
        <ThemeToggler />
      </div>
      <nav className='flex justify-between text-lg font-medium dark:text-zinc-300 md:text-xl  [&>*]:transition-all hover:[&>*]:text-red-600 dark:[&>*]:transition-all dark:hover:[&>*]:text-red-400'>
        <Link href='/'>Blog</Link>
        <Link href='/projects'>Projects</Link>
        <Link href='https://github.com/cakegod'>Github</Link>
        <Link href='/contact'>Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
