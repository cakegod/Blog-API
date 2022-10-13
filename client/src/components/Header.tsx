import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className='pb-6'>
      <h1 className='text-4xl font-semibold pb-3 dark:text-gray-100'>
        Cake's Blog
      </h1>
      <nav className='font-medium flex justify-between dark:text-gray-300'>
        <Link href='/blog'>Blog</Link>
        <Link href='/github'>Github</Link>
        <Link href='/portfolio'>Portfolio</Link>
        <Link href='/contact'>Contact</Link>
      </nav>
    </header>
  );
}

export default Header;
