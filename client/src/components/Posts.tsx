import { IPost } from '@/types';
import Link from 'next/link';
import React from 'react';

interface Props {
  postsData: IPost[] | undefined;
}

function Posts({ postsData }: Props) {
  return postsData === undefined ? (
    <h2 className='text-2xl dark:text-gray-100'>
      There are currently no posts available
    </h2>
  ) : (
    <>
      {postsData.map((post) => {
        return (
          <Link key={post._id} href={`/blog/${post._id}`}>
            <section>
              <h2 className='text-xl md:text-2xl text-violet-700 dark:text-violet-400 font-semibold hover:text-pink-600 dark:hover:text-pink-400 contrast-[.85] transition-all duration-500 cursor-pointer'>
                {post.title}
              </h2>
              <h3 className='text-sm text-gray-900 dark:text-gray-300'>
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
          </Link>
        );
      })}
    </>
  );
}

export default Posts;
