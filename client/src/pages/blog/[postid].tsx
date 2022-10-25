import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { IPost } from '@/types';
import TableOfContent from '@/components/blog/TableOfContents';
import formatDate from '@/components/util/formatData';
import ArticleContent from '@/components/blog/ArticleContent';

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
  const { resolvedTheme } = useTheme();
  return (
    <div className='py-12'>
      <article className='prose prose-lg prose-violet max-w-[100%] hover:prose-a:text-pink-500 hover:prose-a:transition-colors prose-pre:p-0 prose-pre:contrast-125 dark:prose-invert dark:contrast-[.85] dark:prose-a:text-violet-400 dark:hover:prose-a:text-pink-400 md:prose-pre:text-xl'>
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
            <ArticleContent post={post} />
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
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang='en'
        loading='lazy'
      />
    </div>
  );
}

export default Post;
