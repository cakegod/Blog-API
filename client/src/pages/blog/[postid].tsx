import { IPost } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

// export const getStaticProps =  async (context) => {
//   // Fetch data from external API
//   const { id } = context.query;
//   const res = await fetch(`http://localhost:3000/blog/${id}`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// };

function Post() {
  const [post, setPost] = useState<IPost>();
  const router = useRouter();

  const { postid } = router.query;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/blog/${postid}`);
        const data = await res.json();
        console.log(data);
        setPost(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <article className='prose prose-lg max-w-[100%] prose-violet dark:prose-invert dark:contrast-[.85] dark:prose-a:text-violet-400 hover:prose-a:text-pink-500 dark:hover:prose-a:text-pink-400 hover:prose-a:transition-colors'>
      {post && (
        <>
          <h2 className='m-0 text-violet-700 dark:text-violet-400'>{post.title}</h2>
          <p className='font-medium'>
            {new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }).format(Date.parse(post.date))}{' '}
            - {Math.ceil(post.content.trim().split(/\s+/).length / 250)} min reading
            time
          </p>
          <ReactMarkdown>{`${post.content}
`}</ReactMarkdown>
        </>
      )}
    </article>
  );
}

export default Post;
