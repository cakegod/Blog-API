import Image from 'next/image';
import { ProjectProps } from '@/types';
import Link from 'next/link';

interface Props {
  project: ProjectProps;
}

function Project({ project }: Props) {
  return (
    <div className='rounded-md bg-violet-300 duration-500 ease-out hover:scale-105 dark:bg-violet-800'>
      <Link href={project.link}>
        <h3 className='py-2 text-center text-xl font-bold uppercase text-violet-900 contrast-[.85] transition-all duration-500 visited:text-red-500 hover:text-pink-600 dark:text-violet-100 dark:hover:text-pink-400 md:text-2xl'>
          {project.name}
        </h3>
        <Image src={project.image} alt={project.name} className='rounded' />
      </Link>
    </div>
  );
}

export default Project;
