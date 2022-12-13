import React from 'react';

interface Props {
  data: {
    labelFor: string;
    labelText: string;
    placeholder: string;
    textarea: boolean;
  };
}

function FormInput({
  data: { labelFor, labelText, placeholder, textarea },
}: Props) {
  return (
    <div className='sm:col-span-2'>
      <label
        htmlFor={labelFor}
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
      >
        {labelText}
      </label>
      {textarea ? (
        <textarea
          className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400'
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400'
          placeholder={placeholder}
        ></input>
      )}
    </div>
  );
}

export default FormInput;
