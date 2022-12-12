import React from 'react';

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
          <div>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your email
            </label>
            <input
              type='email'
              id='email'
              className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400'
              placeholder='your-email-adress@gmail.com'
              required
            />
          </div>
          <div>
            <label
              htmlFor='subject'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Subject
            </label>
            <input
              type='text'
              id='subject'
              className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400'
              placeholder='Let me know how I can help you'
              required
            />
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='message'
              className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your message
            </label>
            <textarea
              id='message'
              className='focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-400'
              placeholder='Leave a comment...'
            ></textarea>
          </div>
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
