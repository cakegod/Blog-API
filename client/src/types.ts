import { StaticImageData } from 'next/image';

/* eslint-disable import/prefer-default-export */
interface IPost {
  title: string;
  description: string;
  date: string;
  _id: string;
  readTime: string;
  content: string;
  slug: string;
  published: boolean;
}

interface IProject {
  image: StaticImageData;
  name: string;
  link: string;
}

export type { IPost, IProject };
