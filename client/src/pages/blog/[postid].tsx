import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import ReactMarkdown from 'react-markdown';
import { IPost } from '@/types';

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
  return (
    <article className='prose prose-lg max-w-[100%] prose-violet dark:prose-invert dark:contrast-[.85] dark:prose-a:text-violet-400 hover:prose-a:text-pink-500 dark:hover:prose-a:text-pink-400 hover:prose-a:transition-colors py-12'>
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
          <ReactMarkdown>{`${post.content}
`}</ReactMarkdown>
        </>
      }
    </article>
  );
}

export default Post;
