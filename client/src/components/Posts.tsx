import { IPost } from '@/types';
import React from 'react';

interface Props {
  postsData: IPost[] | undefined;
}

function Posts({ postsData }: Props) {
  return postsData === undefined ? (
    <h2 className='text-4xl'>There are currently no posts available</h2>
  ) : (
    postsData.map((post) => {
      return (
        <section key={post._id} className='pb-6'>
          <h2 className='text-xl text-amber-700 dark:text-amber-400 font-semibold'>
            {post.title}
          </h2>
          <h3 className='text-sm text-gray-900 dark:text-gray-100'>
            {new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }).format(Date.parse(post.date))}
          </h3>
          <h3 className='text-lg text-gray-900 dark:text-gray-100'>
            {post.description}
          </h3>
        </section>
      );
    })
  );
}

export default Posts;
