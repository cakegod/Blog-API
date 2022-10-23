import Link from 'next/link';
import ThemeToggler from './ThemeToggler';

function Header() {
  return (
    <header className='pb-12'>
      <div className='flex justify-between items-center pb-10'>
        <Link href='/'>
          <h1 className='cursor-pointer text-4xl md:text-5xl font-bold dark:text-pink-400 text-pink-800'>
            Cake's Blog
          </h1>
        </Link>
        {/* <button className='bg-zinc-600 rounded-full p-1'>
          <MagnifyingGlassIcon className='w-6 ' />
        </button> */}
        <ThemeToggler />
      </div>
      <nav className='font-medium text-lg md:text-xl flex justify-between dark:text-zinc-300  hover:[&>*]:text-red-600 dark:hover:[&>*]:text-red-400 dark:[&>*]:transition-all [&>*]:transition-all'>
        <Link href='/'>Blog</Link>
        <Link href='https://github.com/cakegod'>Github</Link>
        <Link href='/portfolio'>Portfolio</Link>
        <Link href='/contact'>Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
