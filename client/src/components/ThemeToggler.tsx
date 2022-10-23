import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

function ThemeToggler() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  console.log(useTheme());
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <button onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}>
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
