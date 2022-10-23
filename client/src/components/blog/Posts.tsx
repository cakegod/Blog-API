import Link from 'next/link';
import { IPost } from '@/types';
import formatDate from '../util/formatData';

interface Props {
  posts: IPost[];
}

function Posts({ posts }: Props) {
  return posts === undefined ? (
    <h3 className='text-2xl dark:text-zinc-100'>
      There are currently no posts available
    </h3>
  ) : (
    <>
      {posts.map((post) => (
        <Link key={post._id} href={`/blog/${post.slug}`}>
          <section>
            <h3 className='text-2xl text-violet-700 dark:text-violet-400 font-semibold hover:text-pink-600 dark:hover:text-pink-400 contrast-[.85] transition-all duration-500 cursor-pointer visited:text-red-500'>
              {post.title}
            </h3>
            <h5 className='text-lg text-[#0d1117] dark:text-zinc-300 pb-1'>
              {formatDate(post.date, post.readTime)}
            </h5>
            <h5 className='text-xl text-[#0d1117] dark:text-zinc-100'>
              {post.description}
            </h5>
          </section>
        </Link>
      ))}
    </>
  );
}

export default Posts;
