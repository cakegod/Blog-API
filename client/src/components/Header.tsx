import Link from 'next/link';
import React from 'react';
import ThemeToggler from './ThemeToggler';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function Header() {
  return (
    <header className='pb-12'>
      <div className='flex justify-between items-center pb-10'>
        <Link href='/'>
          <h1 className='cursor-pointer text-4xl md:text-5xl font-bold dark:text-gray-100'>
            Cake's Blog
          </h1>
        </Link>
        {/* <button className='bg-gray-600 rounded-full p-1'>
          <MagnifyingGlassIcon className='w-6 ' />
        </button> */}
        <ThemeToggler />
      </div>
      <nav className='font-medium text-lg md:text-xl flex justify-between dark:text-gray-300 hover:[&>*]:text-violet-600 dark:hover:[&>*]:text-violet-400 dark:[&>*]:transition-all [&>*]:transition-all'>
        <Link href='/'>Blog</Link>
        <Link href='https://github.com/cakegod'>Github</Link>
        <Link href='/portfolio'>Portfolio</Link>
        <Link href='/contact'>Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
