import { GetStaticProps, InferGetStaticPropsType } from 'next';
import AboutMe from '@/components/AboutMe';
import Posts from '@/components/Posts';
import { IPost } from '@/types';

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(new URL('/blog', process.env.URL));
  const posts: IPost[] = await res.json();
  console.log(posts);
  return {
    props: { posts },
  };
};

export default function HomePage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <AboutMe />
      <main className='flex flex-col gap-10 grow pb-12'>
        <Posts posts={posts} />
      </main>
    </>
  );
}
