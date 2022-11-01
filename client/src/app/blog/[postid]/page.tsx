import { IPost } from '@/types';
import TableOfContent from '@blog/post/TableOfContents';
import ArticleContent from '@blog/post/ArticleContent';
import CommentSystem from '@blog/post/CommentSystem';
import ArticleHeader from '@blog/post/ArticleHeader';

type Params = { params: { postid: string } };

export async function generateStaticParams() {
  const url = `${process.env.URL}/blog`;
  const res = await fetch(url);
  const posts: IPost[] = await res.json();
  return posts.map((post) => ({ postid: post.slug }));
}

async function fetchPost(postid: string): Promise<IPost> {
  const url = `${process.env.URL}/blog/${postid}`;
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function Post({ params }: Params) {
  const post = await fetchPost(params.postid);

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
