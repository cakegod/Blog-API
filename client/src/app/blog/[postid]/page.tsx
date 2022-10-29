import { IPost } from '@/types';
import TableOfContent from '@blog/post/TableOfContents';
import ArticleContent from '@blog/post/ArticleContent';
import CommentSytem from '@blog/post/CommentSytem';
import ArticleHeader from '@blog/post/ArticleHeader';

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
    <>
      <ArticleHeader post={post} />
      <TableOfContent />
      <ArticleContent post={post} />
      <CommentSytem post={post} />
    </>
  );
}

export default Post;
