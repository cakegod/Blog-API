import Image from 'next/image';
import { IProject } from '@/types';
import Link from 'next/link';

interface Props {
  project: IProject;
}

function Project({ project }: Props) {
  return (
    <div>
      <Link href={project.link}>
        <h3 className='text-xl font-semibold text-violet-700 contrast-[.85] transition-all duration-500 visited:text-red-500 hover:text-pink-600 dark:text-violet-400 dark:hover:text-pink-400 md:text-2xl'>
          {project.name}
        </h3>
        <Image src={project.image} alt={project.name} />
      </Link>
    </div>
  );
}

export default Project;
