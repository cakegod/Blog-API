'use client';

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import { UseThemeProps } from 'next-themes/dist/types';
import { useEffect, useState } from 'react';

// Limit theme types to specific strings values
interface Themes extends Omit<UseThemeProps, 'resolvedTheme' | 'setTheme'> {
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'dark' | 'light') => void;
}

function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme() as Themes;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <button
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        aria-label='theme toggler'
      >
        {resolvedTheme === 'light' ? (
          <SunIcon className='w-8 text-amber-400' />
        ) : (
          <MoonIcon className='w-8 text-blue-400' />
        )}
      </button>
    </div>
  );
}

export default ThemeToggler;
