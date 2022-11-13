import AboutMe from '@blog/AboutMe';
import Posts from '@blog/Posts';

export default async function HomePage() {
  return (
    <>
      <AboutMe />
      <h2 className='border-b border-zinc-300 pb-3 text-3xl font-semibold text-purple-700 dark:border-zinc-700 dark:text-purple-400 md:text-4xl'>
        Latest posts
      </h2>
      <main className='flex grow flex-col gap-10 py-10'>
        <Posts />
      </main>
    </>
  );
}
