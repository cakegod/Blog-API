import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import ReactMarkdown from 'react-markdown';
import Giscus from '@giscus/react';
import { IPost } from '@/types';
import { useTheme } from 'next-themes';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(new URL('/blog', process.env.URL));
  const posts: IPost[] = await res.json();
  const paths = posts.map((post) => ({ params: { postid: post.slug } }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { postid } = context.params!;
  const res = await fetch(`http://localhost:3000/blog/${postid}`);
  try {
    const post: IPost = await res.json();
    return { props: { post } };
  } catch {
    return { notFound: true };
  }
};

function Post({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { theme } = useTheme();
  return (
    <article className='prose prose-lg max-w-[100%] prose-violet dark:prose-invert dark:contrast-[.85] dark:prose-a:text-violet-400 hover:prose-a:text-pink-500 dark:hover:prose-a:text-pink-400 hover:prose-a:transition-colors py-12 '>
      {
        <>
          <h2 className='m-0 text-violet-700 dark:text-violet-400'>
            {post.title}
          </h2>
          <p className='font-medium'>
            {new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }).format(Date.parse(post.date))}{' '}
            - {post.readTime}
          </p>
          <ReactMarkdown>{`${post.content}`}</ReactMarkdown>
          <Giscus
            repo='cakegod/Blog-API'
            repoId='R_kgDOINOBJQ'
            category='General'
            categoryId='DIC_kwDOINOBJc4CSHm3'
            mapping='specific'
            term={post.title}
            strict='0'
            reactions-enabled='1'
            emitMetadata='0'
            inputPosition='top'
            theme={theme === 'dark' ? 'dark' : 'light'}
            lang='en'
            loading='lazy'
          />
        </>
      }
    </article>
  );
}

export default Post;
