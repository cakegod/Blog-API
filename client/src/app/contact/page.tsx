import Form from '@/components/blog/contact/Form';

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
        <Form />
      </div>
    </section>
  );
}

export default Contact;
