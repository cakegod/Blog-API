import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import ReactMarkdown from 'react-markdown';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { IPost } from '@/types';
import TableOfContent from '@/components/blog/TableOfContents';
import formatDate from '@/components/util/formatData';

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
  const res = await fetch(new URL(`/blog/${postid}`, process.env.URL));
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
    <>
      <article className='prose prose-lg max-w-[100%] prose-violet dark:prose-invert dark:contrast-[.85] dark:prose-a:text-violet-400 hover:prose-a:text-pink-500 dark:hover:prose-a:text-pink-400 hover:prose-a:transition-colors py-12 border-t border-zinc-800'>
        {
          <>
            <div>
              <h2 className='m-0 text-violet-700 dark:text-violet-400'>
                {post.title}
              </h2>
              <p className='font-medium'>
                {formatDate(post.date, post.readTime)}
              </p>
            </div>
            <TableOfContent />
            <ReactMarkdown>{`${post.content}`}</ReactMarkdown>
          </>
        }
      </article>
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
  );
}

export default Post;
