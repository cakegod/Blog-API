import { GetStaticProps } from 'next';
import AboutMe from '@/components/blog/AboutMe';
import Posts from '@/components/blog/Posts';
import { IPost } from '@/types';

interface Props {
  posts: IPost[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(new URL('/blog', process.env.URL));
  const posts: IPost[] = await res.json();
  console.log(posts);
  return {
    props: { posts },
  };
};

export default function HomePage({ posts }: Props) {
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
