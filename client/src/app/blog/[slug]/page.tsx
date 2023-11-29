import { PostProps } from '@/types';
import TableOfContent from '@blog/post/TableOfContents';
import ArticleContent from '@blog/post/ArticleContent';
import CommentSystem from '@blog/post/CommentSystem';
import ArticleHeader from '@blog/post/ArticleHeader';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const res = await fetch(`${process.env.URL}/posts`);
  const posts: PostProps[] = await res.json();
  return posts.map((post) => ({ slug: post.slug }));
}

async function fetchPost(slug: string): Promise<PostProps> {
  const url = `${process.env.URL}/posts/${slug}`;
  const res = await fetch(url);
  return await res.json();
}

async function Post({ params }: Params) {
  const post = await fetchPost(params.slug);

  return (
    <>
      <ArticleHeader post={post} />
      <TableOfContent />
      <ArticleContent post={post} />
      <CommentSystem post={post} />
    </>
  );
}

export default Post;
