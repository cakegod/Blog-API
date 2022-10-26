import { IPost } from '@/types';
import TableOfContent from '@/components/blog/TableOfContents';
import formatDate from '@/components/util/formatData';
import ArticleContent from '@/components/blog/ArticleContent';
import CommentSytem from '@/components/blog/CommentSytem';

type Params = { params: { postid: string } };

export async function generateStaticParams() {
  const url = `${process.env.URL}/blog`;
  const res = await fetch(url);
  const posts: IPost[] = await res.json();
  return posts.map((post) => ({ postid: post.slug }));
}

async function fetchPost(params: Params['params']) {
  const url = `${process.env.URL}/blog/${params.postid}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function Post({ params }: Params) {
  const post = await fetchPost(params);

  return (
    <div className='py-12'>
      <article className='dark: md:prose-lg prose prose-violet max-w-[100%] hover:prose-a:text-pink-500 hover:prose-a:transition-colors prose-pre:p-3 prose-pre:text-lg prose-pre:contrast-[1.05] dark:prose-invert dark:contrast-[.85] dark:prose-a:text-violet-400 dark:hover:prose-a:text-pink-400 dark:prose-pre:contrast-125 md:prose-pre:text-xl'>
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
      <CommentSytem post={post} />
    </div>
  );
}

export default Post;
