import AboutMe from '@/components/blog/AboutMe';
import Posts from '@/components/blog/Posts';
import { IPost } from '@/types';

async function fetchPosts() {
  const res = await fetch(new URL('/blog', process.env.URL));
  const data = await res.json();

  return data;
}

export default async function HomePage() {
  const posts: IPost[] = await fetchPosts();
  return (
    <>
      <AboutMe />
      <h2 className='border-b border-zinc-300 pb-3 text-4xl font-semibold text-purple-700 dark:border-zinc-700 dark:text-purple-400'>
        Latest posts
      </h2>
      <main className='flex grow flex-col gap-10 py-10'>
        <Posts posts={posts} />
      </main>
    </>
  );
}
