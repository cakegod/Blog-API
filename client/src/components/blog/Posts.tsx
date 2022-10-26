import Link from 'next/link';
import { IPost } from '@/types';
import formatDate from '../util/formatData';

async function fetchPosts() {
  const res = await fetch(new URL('/blog', process.env.URL));
  const data = await res.json();

  return data;
}

export default async function Posts() {
  const posts: IPost[] = await fetchPosts();

  return posts === undefined ? (
    <h3 className='text-2xl dark:text-zinc-100'>
      There are currently no posts available
    </h3>
  ) : (
    <>
      {posts.map((post) => (
        <Link key={post._id} href={`/blog/${post.slug}`}>
          <section>
            <h3 className='cursor-pointer text-xl md:text-2xl font-semibold text-violet-700 contrast-[.85] transition-all duration-500 visited:text-red-500 hover:text-pink-600 dark:text-violet-400 dark:hover:text-pink-400'>
              {post.title}
            </h3>
            <p className='pb-2 text-[#0d1117] dark:text-zinc-300'>
              {formatDate(post.date, post.readTime)}
            </p>
            <h4 className='md:text-lg text-[#0d1117] dark:text-zinc-100'>
              {post.description}
            </h4>
          </section>
        </Link>
      ))}
    </>
  );
}
