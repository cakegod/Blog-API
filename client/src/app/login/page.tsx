'use client';
import React from 'react';
import FormInput from '@blog/contact/FormInput';
import { loginAction } from '@/app/login/actions';
import { useFormState } from 'react-dom';
import { useForm } from '@/util/hooks';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const { formData, handleInput } = useForm([
    {
      name: 'email',
      value: '',
      label: 'Email',
      placeholder: 'your-email-adress@gmail.com',
      textarea: false,
    },
    {
      name: 'password',
      value: '',
      type: 'password',
      label: 'Password',
      placeholder: '*****',
      textarea: false,
    },
  ]);
  const [message, formAction] = useFormState(loginAction, '');

  return (
    <div>
      {message && (
        <div className='bg-red-900 p-4 mx-4 mt-4 rounded flex gap-2'>
          <ExclamationTriangleIcon className='w-6' />
          {message}
        </div>
      )}
      <form action={formAction} className='space-y-8 p-8'>
        {formData.map((input) => (
          <FormInput {...input} handleInput={handleInput} key={input.name} />
        ))}
        <button
          type='submit'
          className='bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-purple-300 py-3 px-5 text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 dark:bg-purple-800 dark:text-gray-300 sm:w-fit'
        >
          Login
        </button>
      </form>
    </div>
  );
}
