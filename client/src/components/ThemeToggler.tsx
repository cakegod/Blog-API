import React from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
function ThemeToggler() {
  const isDarkMode = true;
  return (
    <div>
      {isDarkMode ? (
        <button>
          <MoonIcon className='w-8 text-indigo-400' />
        </button>
      ) : (
        <button>
          <SunIcon className='w-8 text-amber-400' />
        </button>
      )}
    </div>
  );
}

export default ThemeToggler;
