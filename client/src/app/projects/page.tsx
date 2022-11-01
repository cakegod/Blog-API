import Project from '@blog/projects/Project';
import { IProject } from '@/types';
import cucucakes from '~/cucucakes.png';
import memoryGame from '~/memory-game.png';

function page() {
  const projects: IProject[] = [
    {
      image: cucucakes,
      name: 'Shopping App',
      link: 'http://shopping-cart-cakegod.vercel.app/',
    },
    {
      image: memoryGame,
      name: 'Memory Game',
      link: 'http://memory-card-game-umber.vercel.app/',
    },
  ];

  return (
    <>
      <h2 className='border-b border-zinc-300 py-12 pb-3 text-3xl font-semibold text-purple-700 dark:border-zinc-700 dark:text-purple-400 md:text-4xl'>
        Showcase of my projects
      </h2>
      <main className='flex flex-col gap-10 py-10'>
        {projects.map((project) => (
          <Project key={project.name} project={project} />
        ))}
      </main>
    </>
  );
}

export default page;
