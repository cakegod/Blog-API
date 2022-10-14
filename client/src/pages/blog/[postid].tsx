import { IPost } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  return <div className='text-gray-100'>{post && post.content}</div>;
}

export default Post;
