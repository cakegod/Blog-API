import { PostProps } from '@/types';
import React from 'react';

interface Props {
  post: PostProps
}

function Post({ post }: Props) {
  return (
    <section key={post._id} className='m-4 grid grid-cols-3'>
      <h3 className=''>{post.title}</h3>
      <p className=''>
        {post.published ? (
          <button className='rounded bg-blue-900 p-2'>published</button>
        ) : (
          <button className='rounded bg-red-900 p-2'>not published</button>
        )}
      </p>
      <h4 className=''>{post.date}</h4>
    </section>
  );
}

export default Post;
