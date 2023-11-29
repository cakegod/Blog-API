'use client';
import { PostProps } from '@/types';
import React from 'react';
import { handlePublishToggle } from '@blog/dashboard/actions';

interface Props {
  post: PostProps;
}

function Post({ post }: Props) {
  console.log(post);

  return (
    <section key={post._id} className='m-4 grid grid-cols-3'>
      <h3 className=''>{post.title}</h3>
      {post.status === 'publish' ? (
        <form action={handlePublishToggle}>
          <button
            className='rounded bg-green-900 p-2'
            value={post._id}
            type='submit'
          >
            published
          </button>
        </form>
      ) : (
        <form action={handlePublishToggle}>
          <input type='hidden' value={post} />
          <button
            className='rounded bg-yellow-900 p-2'
            value={post._id}
            type='submit'
          >
            draft
          </button>
        </form>
      )}
      <h4 className=''>{new Date(post.date).toDateString()}</h4>
    </section>
  );
}

export default Post;
