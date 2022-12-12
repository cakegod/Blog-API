import { PostProps } from '@/types';
import React from 'react';

interface Props {
  post: PostProps;
}

function Post({ post }: Props) {
  return (
    <section key={post._id} className='m-4 grid grid-cols-3'>
      <h3 className=''>{post.title}</h3>
        {post.published ? (
          <form action='' method='post'>
            <button className='rounded bg-blue-900 p-2' value={post._id} type='submit'>published</button>
          </form>
        ) : (
          <form action='' method='post'>
          <button className='rounded bg-red-900 p-2' value={post._id} type='submit'>unpublished</button>
        </form>
        )}
      <h4 className=''>{post.date}</h4>
    </section>
  );
}

export default Post;
