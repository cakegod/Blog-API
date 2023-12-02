import { PostProps } from '@/types';
import React from 'react';
import { statusAction } from '@blog/dashboard/actions';

interface Props {
  post: PostProps;
}

function Post({ post }: Props) {
  return (
    <section key={post._id} className='m-4 grid grid-cols-3'>
      <h3 className=''>{post.title}</h3>
      {post.status === 'publish' ? (
        <Form post={post} status={'draft'} />
      ) : (
        <Form post={post} status={'publish'} />
      )}
      <h4 className=''>{new Date(post.date).toDateString()}</h4>
    </section>
  );
}

function Form({
  post,
  status,
}: {
  post: PostProps;
  status: PostProps['status'];
}) {
  return (
    <form action={statusAction}>
      <input hidden name='status' defaultValue={status} />
      <input hidden name='slug' defaultValue={post.slug} />
      <button
        className={`rounded ${
          post.status === 'draft' ? 'bg-yellow-900' : 'bg-green-900'
        } p-2`}
        value={post._id}
        name='postid'
        type='submit'
      >
        {post.status === 'draft' ? 'drafted' : 'published'}
      </button>
    </form>
  );
}

export default Post;
