import Post from '@/components/blog/dashboard/Post';
import { PostProps } from '@/types';
import React from 'react';
import { IsAuth } from '@/util/isAuth';

async function fetchPosts(): Promise<PostProps[]> {
  const res = await fetch(`${process.env.URL}/posts`);
  return await res.json();
}

async function Dashboard() {
  const posts = await fetchPosts();

  return posts ? (
    <div className='gap-2'>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  ) : (
    <h3 className='text-2xl dark:text-zinc-100'>
      There are currently no posts available
    </h3>
  );
}

export default IsAuth(Dashboard);
