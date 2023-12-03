'use client';
import FormInput from '@/components/blog/contact/FormInput';
import React from 'react';
import { useForm } from '@/util/hooks';

function Form() {
  const { formData, handleInput } = useForm([
    {
      name: 'email',
      value: '',
      label: 'Your email',
      placeholder: 'your-email-adress@gmail.com',
      textarea: false,
    },
    {
      name: 'subject',
      value: '',
      label: 'Subject',
      placeholder: 'Let me know how I can help you',
      textarea: false,
    },
    {
      name: 'message',
      value: '',
      label: 'Your message',
      placeholder: 'Leave a comment...',
      textarea: true,
    },
  ]);

  return (
    <div>
      <form action='POST' className='space-y-8' name='contact-form'>
        {formData.map((input) => (
          <FormInput {...input} handleInput={handleInput} key={input.name} />
        ))}
        <button
          type='submit'
          className='bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-purple-300 py-3 px-5 text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 dark:bg-purple-800 dark:text-gray-300 sm:w-fit'
        >
          Send message
        </button>
      </form>
    </div>
  );
}

export default Form;
