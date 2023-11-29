import Link from 'next/link';
import { PostProps } from '@/types';
import { composeDate } from '@/util/composeDate';

async function fetchPosts(): Promise<PostProps[]> {
  const res = await fetch(`${process.env.URL}/posts`);
  return await res.json();
}

const Posts = async () => {
  const posts = await fetchPosts();
  return posts ? (
    <>
      {posts.map((post) => (
        <Link key={post._id} href={`/blog/${post.slug}`}>
          <section>
            <h3 className='cursor-pointer text-xl font-semibold text-violet-700 contrast-[.85] transition-colors duration-500 visited:text-red-500 hover:text-pink-600 dark:text-violet-400 dark:hover:text-pink-400 md:text-2xl'>
              {post.title}
            </h3>
            <p className='pb-2 text-[#0d1117] dark:text-zinc-300'>
              {composeDate(post.date, post.readTime)}
            </p>
            <h4 className='text-[#0d1117] dark:text-zinc-100 md:text-lg'>
              {post.description}
            </h4>
          </section>
        </Link>
      ))}
    </>
  ) : (
    <h3 className='text-2xl dark:text-zinc-100'>
      There are currently no posts available
    </h3>
  );
};

export default Posts;
