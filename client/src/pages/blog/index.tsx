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
      <h2 className='text-4xl font-semibold dark:text-purple-400 text-purple-700 pb-3 border-b dark:border-zinc-700 border-zinc-300'>
        Latest posts
      </h2>
      <main className='flex flex-col grow gap-8 py-10'>
        <Posts posts={posts} />
      </main>
    </>
  );
}
