import Link from 'next/link';
import { IPost } from '@/types';

interface Props {
  posts: IPost[];
}

function Posts({ posts }: Props) {
  return posts === undefined ? (
    <h2 className='text-2xl dark:text-zinc-100'>
      There are currently no posts available
    </h2>
  ) : (
    <>
      {posts.map((post) => (
        <Link key={post._id} href={`/blog/${post.slug}`}>
          <section>
            <h2 className='text-xl md:text-2xl text-violet-700 dark:text-violet-400 font-semibold hover:text-pink-600 dark:hover:text-pink-400 contrast-[.85] transition-all duration-500 cursor-pointer'>
              {post.title}
            </h2>
            <h3 className='text-sm text-zinc-900 dark:text-zinc-300'>
              {new Intl.DateTimeFormat('en-GB', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              }).format(Date.parse(post.date))}{' '}
              - {post.readTime}
            </h3>
            <h3 className='text-lg text-zinc-900 dark:text-zinc-100'>
              {post.description}
            </h3>
          </section>
        </Link>
      ))}
    </>
  );
}

export default Posts;
