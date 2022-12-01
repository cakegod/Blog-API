import Project from '@blog/projects/Project';
import { ProjectProps } from '@/types';
import cucucakes from '~/cucucakes.png';
import memoryGame from '~/memory-game.png';

function page() {
  const projects: ProjectProps[] = [
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
      <h2 className='py-12 pb-1 text-2xl font-semibold text-purple-700 dark:text-purple-400 md:text-3xl'>
        A showcase of my projects
      </h2>
      <main className='flex flex-col gap-12 py-10'>
        {projects.map((project) => (
          <Project key={project.name} project={project} />
        ))}
      </main>
    </>
  );
}

export default page;
