import FormInput from '@/components/blog/dashboard/FormInput';
import React from 'react';

const form = [
  {
    labelFor: 'email',
    labelText: 'Your email',
    placeholder: 'your-email-adress@gmail.com',
    textarea: false,
  },
  {
    labelFor: 'subject',
    labelText: 'Subject',
    placeholder: 'Let me know how I can help you',
    textarea: false,
  },
  {
    labelFor: 'message',
    labelText: 'Your message',
    placeholder: 'Leave a comment...',
    textarea: true,
  },
];

function Contact() {
  return (
    <section className=''>
      <div className='mx-auto max-w-screen-md py-8 px-4 lg:py-16'>
        <h2 className='mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white'>
          Contact me
        </h2>
        <p className='mb-8 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16'>
          Want to hire me? Got feedback or potential features for this blog?
        </p>
        <form action='#' className='space-y-8'>
          {form.map((input) => (
            <FormInput data={input} key={input.labelFor} />
          ))}
          <button
            type='submit'
            className='bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-purple-300 py-3 px-5 text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 dark:bg-purple-800 dark:text-gray-300 sm:w-fit'
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
